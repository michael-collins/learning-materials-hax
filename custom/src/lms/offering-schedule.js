/**
 * A course offering's calendar: teaching weeks, class meetings, due dates
 * and module unlocks, from its delivery mode. Plain functions with no
 * browser or HAX dependencies, so the course builder and the Canvas export
 * script share them.
 *
 * An offering (see nu-hax/scripts/offering-from-plan.mjs):
 *   { start: "2027-01-11", weeks: 15, timeZone: "America/New_York",
 *     delivery: "in-person" | "hybrid" | "online-sync" | "online-async",
 *     meetings: [{ day: "Tue", start: "13:25", end: "16:25",
 *                  mode: "in-person" | "online", location, link }],
 *     breaks: [{ label: "Spring break", start: "2027-03-08", end: "2027-03-14" }],
 *     defaults: { dueDay: "Fri", dueTime: "23:59" } }
 *
 * Times are wall-clock times in the offering's time zone ("2027-01-14T23:59");
 * toUtc() turns one into an instant for an LMS.
 *
 * Teaching weeks skip break weeks: a break covering three or more weekdays
 * of a calendar week takes the whole week out, so teaching week 9 falls
 * after spring break. A shorter break (a holiday) only cancels the class
 * meetings on its dates, and a due date landing on it moves to the next
 * class (or, without classes, the next day).
 *
 * Due dates by delivery, unless an item sets its own day, time or date:
 * - in person, online (synchronous), hybrid: the start of the due week's
 *   first class (before there are meetings: defaults.dueDay at dueTime)
 * - online (asynchronous): Sunday 11:59 pm at the end of the due week
 * Modules of an asynchronous offering unlock on the Monday of their week.
 */

export const DELIVERY_MODES = {
  "in-person": { label: "In person", meets: true },
  hybrid: { label: "Hybrid", meets: true },
  "online-sync": { label: "Online (synchronous)", meets: true },
  "online-async": { label: "Online (asynchronous)", meets: false },
};

/** The offering mode for a course page's Delivery value ("" when it doesn't say). */
export function deliveryFromCourse(value) {
  const v = String(value || "").toLowerCase();
  if (v.includes("asynchronous")) return "online-async";
  if (v.includes("synchronous")) return "online-sync";
  if (v.includes("hybrid")) return "hybrid";
  if (v.includes("person")) return "in-person";
  return "";
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MS_DAY = 86400000;

// dates as UTC midnights, so day arithmetic ignores daylight saving
const parseDate = (s) => Date.UTC(+s.slice(0, 4), +s.slice(5, 7) - 1, +s.slice(8, 10));
const fmtDate = (t) => new Date(t).toISOString().slice(0, 10);
const dayIndex = (t) => (new Date(t).getUTCDay() + 6) % 7; // Mon = 0
const addDays = (t, n) => t + n * MS_DAY;

function breakRanges(offering) {
  return (offering.breaks || []).filter((b) => b.start).map((b) => ({ ...b, from: parseDate(b.start), to: parseDate(b.end || b.start) }));
}

/** [{ week, start: "YYYY-MM-DD" (Monday), end }] for every teaching week. */
export function teachingWeeks(offering) {
  const breaks = breakRanges(offering);
  // the Monday of the week the term starts in
  let monday = addDays(parseDate(offering.start), -dayIndex(parseDate(offering.start)));
  const weeks = [];
  for (let guard = 0; weeks.length < (offering.weeks || 15) && guard < 60; guard++, monday = addDays(monday, 7)) {
    const weekdaysOff = [0, 1, 2, 3, 4].filter((d) => breaks.some((b) => addDays(monday, d) >= b.from && addDays(monday, d) <= b.to)).length;
    if (weekdaysOff >= 3) continue;
    weeks.push({ week: weeks.length + 1, start: fmtDate(monday), end: fmtDate(addDays(monday, 6)) });
  }
  return weeks;
}

const isHoliday = (offering, dateStr) => breakRanges(offering).some((b) => parseDate(dateStr) >= b.from && parseDate(dateStr) <= b.to);

/** Every class meeting: [{ week, date, start, end, mode, location, link }]. */
export function classMeetings(offering) {
  if (!DELIVERY_MODES[offering.delivery]?.meets) return [];
  const out = [];
  for (const w of teachingWeeks(offering)) {
    for (const m of offering.meetings || []) {
      const d = DAYS.indexOf(m.day);
      if (d < 0) continue;
      const date = fmtDate(addDays(parseDate(w.start), d));
      if (isHoliday(offering, date)) continue;
      const mode = offering.delivery === "hybrid" ? m.mode || "in-person" : offering.delivery === "online-sync" ? "online" : "in-person";
      out.push({ week: w.week, date, start: m.start, end: m.end, mode, location: mode === "in-person" ? m.location || "" : "", link: mode === "online" ? m.link || "" : "" });
    }
  }
  return out.sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start));
}

/**
 * When an item is due, as a wall-clock time ("YYYY-MM-DDTHH:MM"), or "".
 * due: { at } | { week, day?, time? }
 */
export function dueAt(offering, due) {
  if (!due) return "";
  if (due.at) return due.at;
  const week = teachingWeeks(offering).find((w) => w.week === due.week);
  if (!week) return "";
  const async = offering.delivery === "online-async";
  const meetings = classMeetings(offering);
  if (!due.day && !async) {
    const first = meetings.find((m) => m.week === due.week);
    if (first) return `${first.date}T${due.time || first.start}`;
  }
  const day = due.day || (async ? "Sun" : offering.defaults?.dueDay || "Fri");
  const time = due.time || (async ? "23:59" : offering.defaults?.dueTime || "23:59");
  let date = addDays(parseDate(week.start), Math.max(0, DAYS.indexOf(day)));
  // a holiday moves it to the next class, or the next day
  for (let guard = 0; isHoliday(offering, fmtDate(date)) && guard < 21; guard++) {
    const next = meetings.find((m) => parseDate(m.date) > date);
    date = next && !async ? parseDate(next.date) : addDays(date, 1);
  }
  return `${fmtDate(date)}T${time}`;
}

/** When a module opens ("YYYY-MM-DDT00:00"), or "" when it is open from the start. */
export function unlockAt(offering, week) {
  if (offering.delivery !== "online-async") return "";
  const w = teachingWeeks(offering).find((x) => x.week === week);
  return w ? `${w.start}T00:00` : "";
}

/** The last day of teaching ("YYYY-MM-DD"). */
export function termEnd(offering) {
  return teachingWeeks(offering).at(-1)?.end || "";
}

/** A wall-clock time in a time zone as a UTC ISO instant ("2027-01-15T04:59:00Z"). */
export function toUtc(local, timeZone = "UTC") {
  if (!local) return "";
  const [d, t = "00:00"] = local.split("T");
  const wall = Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10), +t.slice(0, 2), +t.slice(3, 5));
  // the zone's offset at that moment (applied twice, for times near a change)
  const offset = (at) => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })
        .formatToParts(new Date(at))
        .map((x) => [x.type, x.value]),
    );
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - at;
  };
  let utc = wall - offset(wall);
  utc = wall - offset(utc);
  return new Date(utc).toISOString().replace(/\.000Z$/, "Z");
}
