With the sides, braces and cushions in place, the Airline Chair needs a few smaller parts to hold it together: a thin rod where the seat meets the back, an arched rail across the front of the seat, a second rod at the front, and small wooden hooks underneath that hold that rod. In this part you'll model each as its own object, use a _Mirror_ modifier to keep the rail and hooks symmetrical, and see why the order of modifiers matters. You'll need the chair from Parts 2 to 5 and the reference image. The video uses Blender 2.83.

The rod at the back of the seat
-------------------------------

1.  **Add a six-sided cylinder.** <page-anchor target="#video-OMIJZKwDJkY" value="0">0:00</page-anchor> Press Shift+A and choose _Mesh → Cylinder_. In the _Add Cylinder_ panel at the bottom left, set _Vertices_ to 6 <page-anchor target="#video-OMIJZKwDJkY" value="12">0:12</page-anchor>. Rotate it 90 degrees on Y (R, Y, 90) so it lies across the chair.
    
2.  **Place it where the cushions meet.** <page-anchor target="#video-OMIJZKwDJkY" value="24">0:24</page-anchor> In the side view, with X-ray on, press G to move it down to the joint between the seat and the back, and S to scale it down. It's a thin piece, but that must be how they hook together <page-anchor target="#video-OMIJZKwDJkY" value="43">0:43</page-anchor>. Then scale it along X so it spans the chair <page-anchor target="#video-OMIJZKwDJkY" value="55">0:55</page-anchor>.
    
    ![Right Orthographic view over the reference photo: a small six-sided cylinder, seen end-on, sits at the joint where the leather seat and back cushions meet, above the wooden runner. The Resize panel shows a scale of 0.196 on all axes.](files/adding-the-details-t0045.0.jpg)
    
    The rod, end-on, where the seat and back meet.
    
3.  **Hold its ends with an inset.** <page-anchor target="#video-OMIJZKwDJkY" value="65">1:05</page-anchor> Add a couple of edge loops near the ends (Ctrl+R, scroll up for two) and scale them apart along X <page-anchor target="#video-OMIJZKwDJkY" value="71">1:11</page-anchor>. Press 3 for face select, select both end faces and press I: Inset scales both of them in together <page-anchor target="#video-OMIJZKwDJkY" value="82">1:22</page-anchor>.
    
    ![Edit Mode, close on the six-sided rod with X-ray on: both end faces are selected, and the header shows the Inset tool's options (Thickness, Depth, Outset, Boundary, Individual) while it's being dragged.](files/adding-the-details-t0091.8.jpg)
    
    Insetting both end faces at once.
    
4.  **Split the end n-gons, if you like.** <page-anchor target="#video-OMIJZKwDJkY" value="95">1:35</page-anchor> The face in the middle of each end is an n-gon (more than four sides), but because it's flat it doesn't really matter. If it bothers you, press K for the _Knife_ tool, cut across it, and press Enter: now it's two quads <page-anchor target="#video-OMIJZKwDJkY" value="112">1:52</page-anchor>.
    
    ![Close on the end of the rod, a hexagon with a smaller inset hexagon in it. The K key is shown at the bottom, and the status bar lists the Knife tool's controls.](files/adding-the-details-t0110.4.jpg)
    
    The Knife tool (K) splitting the inset end into two quads.
    
5.  **Smooth it.** <page-anchor target="#video-OMIJZKwDJkY" value="130">2:10</page-anchor> Add a _Subdivision Surface_ modifier and set it to 3: the rod keeps its shape well.
    

The arched front rail
---------------------

1.  **Add a cube and model it upright.** <page-anchor target="#video-OMIJZKwDJkY" value="140">2:20</page-anchor> Press Shift+A and add a cube for the arched piece that spans from one side of the chair to the other, under the front of the seat. It's tilted forward a little, but model it straight up and down first and rotate it later <page-anchor target="#video-OMIJZKwDJkY" value="154">2:34</page-anchor>. If you see odd shading, turn off the wireframe and check the pieces are lined up <page-anchor target="#video-OMIJZKwDJkY" value="167">2:47</page-anchor>.
    
    ![Right Orthographic view over the reference photo: a new cube, Cube.005, scaled down to a narrow upright block at the front of the seat, just behind the side's front leg. The Resize panel shows Y 0.363.](files/adding-the-details-t0160.8.jpg)
    
    The front rail as an upright block, before it's shaped.
    
2.  **Keep it a separate object.** <page-anchor target="#video-OMIJZKwDJkY" value="178">2:58</page-anchor> Don't extrude it out of the side: model things the way they're built in real life, and this is a separate piece.
    
3.  **Shape the arch.** <page-anchor target="#video-OMIJZKwDJkY" value="185">3:05</page-anchor> Add some loops across it. In the photo, it's flat at the bottom at each end. In vertex mode, move the vertices into an arch <page-anchor target="#video-OMIJZKwDJkY" value="205">3:25</page-anchor>. Back in Object Mode, add a _Subdivision Surface_ modifier to see what it needs: here, a loop on each side <page-anchor target="#video-OMIJZKwDJkY" value="229">3:49</page-anchor>.
    
    ![Front Orthographic view of the front rail, outlined in orange between the chair's sides: its bottom edge rises from flat ends to a peak in the middle, an arch. The Add Modifier menu is open.](files/adding-the-details-t0225.0.jpg)
    
    The rail's bottom edge moved into an arch.
    
4.  **Make it symmetrical with a Mirror modifier.** <page-anchor target="#video-OMIJZKwDJkY" value="235">3:55</page-anchor> To make both halves exactly the same, delete the faces of one half and add a _Mirror_ modifier: every edit on one side now happens on the other too. Use this whenever something should be perfectly symmetrical <page-anchor target="#video-OMIJZKwDJkY" value="250">4:10</page-anchor>.
    
    ![The front rail in Edit Mode with only its right half as real geometry; the Mirror modifier draws the left half. In the modifier stack, Subdivision Surface is first and Mirror is below it, and a seam shows down the middle of the smoothed rail.](files/adding-the-details-t0271.0.jpg)
    
    Half the rail, mirrored. With Mirror below Subdivision Surface, there's a seam in the middle.
    
5.  **Move the Mirror above the Subdivision Surface.** <page-anchor target="#video-OMIJZKwDJkY" value="260">4:20</page-anchor> There's a seam down the middle where it should be smooth. Modifiers run from the top of the stack down, so move the _Mirror_ modifier above the _Subdivision Surface_: it merges the vertices in the middle first, and then the whole rail is smoothed as one <page-anchor target="#video-OMIJZKwDJkY" value="274">4:34</page-anchor>.
    
    ![The front rail in Edit Mode, seen from the front, with Mirror now first in the modifier stack and Subdivision Surface below it. Merge is ticked in the Mirror modifier, and the rail is smooth across the middle.](files/adding-the-details-t0328.8.jpg)
    
    Mirror first, then Subdivision Surface: no seam.
    
6.  **Refine and thin it.** <page-anchor target="#video-OMIJZKwDJkY" value="280">4:40</page-anchor> In the side view, add an edge loop at the top, and another where it needs one. It's a much thinner piece than modeled so far, so make it thinner <page-anchor target="#video-OMIJZKwDJkY" value="305">5:05</page-anchor>.
    
7.  **Rotate it and apply the mirror.** <page-anchor target="#video-OMIJZKwDJkY" value="320">5:20</page-anchor> Rotate it forward into place. Then you can apply the _Mirror_ modifier: the rail becomes one piece of geometry, all symmetrical <page-anchor target="#video-OMIJZKwDJkY" value="335">5:35</page-anchor>.
    
    ![The chair in X-ray from the front corner with the arched front rail under the seat. Its rotation is X 18.1 degrees in the sidebar, and the Mirror modifier is above the Subdivision Surface, ready to apply.](files/adding-the-details-t0340.0.jpg)
    
    The rail tilted forward 18.1°.
    

The hooks underneath
--------------------

1.  **Add a second rod.** <page-anchor target="#video-OMIJZKwDJkY" value="350">5:50</page-anchor> The chair has little hooks underneath. You don't have to make them, but the video builds them quickly. Select the rod from earlier, press Shift+D to duplicate it, move it along Y to the front of the chair, then up <page-anchor target="#video-OMIJZKwDJkY" value="359">5:59</page-anchor>. To make it thicker without changing its length, scale it with Shift+X: that scales on every axis except X <page-anchor target="#video-OMIJZKwDJkY" value="385">6:25</page-anchor>.
    
    ![The duplicated rod, Cylinder.001, outlined in white as it's scaled, runs across the front of the chair under the front of the seat. The header reads Scale X 1.2795, Y 1.2795, Z 1.2795.](files/adding-the-details-t0390.8.jpg)
    
    A second rod across the front of the chair.
    
2.  **Start a hook from one face.** <page-anchor target="#video-OMIJZKwDJkY" value="410">6:50</page-anchor> Add a cube and, in the side view, make it a small square just above the end of the new rod. Press 3 for face select: a dot marks the middle of each face, so you can see that you have only one face selected, and be confident an extrude will work properly <page-anchor target="#video-OMIJZKwDJkY" value="449">7:29</page-anchor>.
    
3.  **Extrude around the rod.** <page-anchor target="#video-OMIJZKwDJkY" value="455">7:35</page-anchor> Press E to extrude the face, then rotate it and scale it down only along Y. Extrude again, switch to vertex select to improve the shape <page-anchor target="#video-OMIJZKwDJkY" value="476">7:56</page-anchor>, then back to faces for a final extrude: a wooden hook that wraps under the rod <page-anchor target="#video-OMIJZKwDJkY" value="509">8:29</page-anchor>.
    
    ![Right Orthographic view in Edit Mode, close on the hook, Cube.006: a chain of four-sided faces extruded down and around the circular end of the rod. The Extrude Region and Move panel shows Orientation Normal.](files/adding-the-details-t0500.4.jpg)
    
    Extruding one face at a time to bend the hook around the rod.
    
4.  **Add supporting edges and smooth it.** <page-anchor target="#video-OMIJZKwDJkY" value="509">8:29</page-anchor> Add two supporting loops, and one at the top to hold its shape. Add a _Subdivision Surface_ modifier <page-anchor target="#video-OMIJZKwDJkY" value="531">8:51</page-anchor>. It should be a bit sharper, so in vertex mode, move edges closer together. Then choose _Shade Smooth_ for the hook and the other new pieces <page-anchor target="#video-OMIJZKwDJkY" value="576">9:36</page-anchor>.
    
    ![The hook in Edit Mode in the 3D view: its cage of edges is outside the smoothed shape, with two edges at the bottom selected and being moved closer together. The Subdivision Surface modifier is at Viewport 3.](files/adding-the-details-t0560.8.jpg)
    
    Moving edges closer for a sharper hook.
    
5.  **Mirror it to the other side.** <page-anchor target="#video-OMIJZKwDJkY" value="580">9:40</page-anchor> The hook's origin is at the center of the chair, so press Tab, turn on X-ray and move its geometry over to one side. Add a _Mirror_ modifier: now there are two <page-anchor target="#video-OMIJZKwDJkY" value="602">10:02</page-anchor>. Move them in if they're too far apart. Adjust all of them together against the reference: here they moved forward, and the hook got bigger <page-anchor target="#video-OMIJZKwDJkY" value="628">10:28</page-anchor>. Then save your work.
    
    ![The finished chair in X-ray from the front corner: both sides, the back cushion and seat, the arched front rail, and the hooks below the seat. The hook object, Cube.006, has a Subdivision Surface and a Mirror modifier on X.](files/adding-the-details-t0670.4.jpg)
    
    The finished chair.
    

Wrap-up
-------

The Airline Chair is modeled. In this part you inset faces, split an n-gon with the Knife tool, made a symmetrical part with a Mirror modifier above a Subdivision Surface in the stack, and built a hook by extruding a single face. The video doesn't claim it's exactly how the real chair is built, but with the reference image you have, it's a close match <page-anchor target="#video-OMIJZKwDJkY" value="617">10:17</page-anchor>.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-OMIJZKwDJkY" value="0">0:00</page-anchor> I'm just going to add one or two more details here and this will be done so we are going to just add a cylinder here so let's do shift a mesh cylinder and down here on the left there's properties we can just make that I don't know six and let's rotate that on the y-axis 90 degrees and press s to scale and we can move that oops that was the scale button let's go into this view here oops I'm on the scale tool okay let's press g move that down press s and go to x-ray mode here so that's a pretty thin piece but that must be how they hook together okay and we want to scale that in the x. So let's just scale that up.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="62">1:02</page-anchor> And we can just add a couple edge loops here. Ctrl-R, scroll up to get two of them, SX to scale. Okay. And we'll go to face mode here. Press 3 to select faces. Now I can press I on the keyboard and it will scale both of them together. That should be good enough. This is an n-gon in the middle, but because it's planar it doesn't really matter. If you're worried about it, you know, you could just use the knife tool to split these and now they're both quads.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="106">1:46</page-anchor> So why don't we do that? press return okay so now when we add a sub div to this object it keeps its shape really well let's go up to three and there you go okay um we also have to do this front piece here so in order to do that we're just going to press shift a and drop in a cube Okay, so that's going to be this sort of arched piece that spans across from one to the other.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="160">2:40</page-anchor> It is rotated a little bit forward, but I'm going to model it straight up and down first, and then we will worry about rotating it later. Okay, so we're getting some shadowing here. If I turn off wireframe. Okay, good. I just needed to make sure that these were perfectly lined up. So that looks good. The reason we're not extruding from one object to another is because you typically want to model things how they're constructed in real life. And so this would be a separate object. so let's just go ahead and add some loops here okay so I think that's going to be a good amount if we look there's actually a flat piece here on the bottom and then probably one on the other side so let's go to vertex mode we're just going to move these into an arched shape let's go to object mode, tab out to that, press subdiv. And just to, you know, kind of get an idea of what we need to do, it looks like we're going to need a loop here and a loop here.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="236">3:56</page-anchor> So let's just add these in. So if you want to make these perfectly mirrored, and that's actually pretty easy we can come in and delete these so let's just delete these faces and we can actually add a mirror modifier you can see that it's going to give us the same edits on both sides so whenever you're working with something you want to be perfectly symmetrical that's a good way to work we can also we can see that it's giving us a seam here in the middle which you know it should be smoothing that out for us so if you want to maintain that seam move mirror modifier to be above the subdivision in the stack okay and because it's merging those vertices for us it will automatically smooth those out let's jump back into this view and edge loop here and we're going to need one at the top and probably one like that So this looks like a much thinner object than what I've actually modeled here.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="311">5:11</page-anchor> So let's do something like that. I actually think this might go up. there that's looking pretty good and so now we can rotate this into place yeah that looks good and one of the things that we can do is actually just apply the mirror modifier and now it is all one piece of geometry all symmetrical so if you look at the chair it actually has these little hooks underneath you don't have to create but I'm just going to quickly build that out.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="364">6:04</page-anchor> So let's do Shift D and let's do Y axis. We'll move that up. So I think this is supposed to be one piece of wood, but I'm just going to... Let's do... You don't want it to scale in a particular dimension. the x dimension i can do shift x and it will scale everywhere except for x so that's a little trick i'll just get this okay all right and there's these hooks here so those will be easy we're just going to add a cube Okay.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="449">7:29</page-anchor> And if we go to the three key, you can actually see a little face handle. That's a dot that's kind of in the middle of that line. So I know that I only have one face. And so if I extrude this, I can be pretty confident that it's actually extruding properly. So let's extrude that. We're going to rotate that. Scale that down just in the Y. We can extrude that one more time and we'll just jump into vertices to actually make the shape a little bit better. Okay, back to face, extrude this once again, and this will be our final extrude.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="509">8:29</page-anchor> Okay, so we've created this sort of wooden hook. And let's add our supporting edges. Oops, I need to add two of them. And we're going to add one at the top here, just to hold that shape. And we'll do, let's see what this looks like when we add our subdiv surface. Okay, so it should be a little bit sharper. So we can go to vertex mode, let's just move these edges closer together.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="576">9:36</page-anchor> All right, shade smooth. And we're going to shade this one smooth as well. And this one. All right, one last thing, we're going to move this over. Actually, that was perfectly in the center. So if we just tab in and then move the geometry, whoops, let's add our x-ray, move that over. Now if we add a mirror modifier, we have two of them. Maybe that's a little too far. Let's just move that in a bit.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="619">10:19</page-anchor> So it looks pretty good. So I don't know, you know, how accurate this is to the actual construction, but with the reference image we have, that's pretty good. It should be able to create a similar shape. So it looks like, you know, maybe this is supposed to be down a little bit. Let's move them all together. Or maybe not down, maybe just forward. So we'll just move these forward. Let's bring this up. It's a bigger hook, I think.</p><p><page-anchor target="#video-OMIJZKwDJkY" value="669">11:09</page-anchor> That looks a little closer. Okay, save your work. And that's it for modeling the airline chair by Kem Weber. Thank you.</p></div></a11y-collapse>