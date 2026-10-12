The Airline Chair has two identical sides, with the seat cushions between them. Instead of modeling the second side, you'll mirror the side, the brace and the brackets across the chair's center line with _Mirror_ modifiers. For a mirror to land in the right place, each object's origin has to be on the center line, and its rotation and scale have to be applied. You'll need the side, brace and brackets from Parts 2 and 3. The video uses Blender 2.83.

Mirror the side
---------------

1.  **Move the side out from the center.** <page-anchor target="#video-r5iSQNviDJg" value="0">0:00</page-anchor> The reference shows two cushions, one for the back and one for the seat, between the sides. Move the side roughly to where it should be, to one side of the Y axis <page-anchor target="#video-r5iSQNviDJg" value="15">0:15</page-anchor>. Imagine the Y axis as the chair's center: mirrored, the other side will be exactly the same distance away on the other side of it.
    
2.  **Snap the origin onto the center line.** <page-anchor target="#video-r5iSQNviDJg" value="30">0:30</page-anchor> The mirror happens around the object's origin, so the origin has to be on that axis. Open _Options_ in the header and tick _Origins_ under _Affect Only_, as in Part 3. Turn on snapping, set it to _Increment_ and tick _Absolute Grid Snap_ <page-anchor target="#video-r5iSQNviDJg" value="50">0:50</page-anchor>. Now move the origin along X: it snaps to the grid, onto the center line. Then untick _Origins_ <page-anchor target="#video-r5iSQNviDJg" value="58">0:58</page-anchor>.
    
    ![The snapping menu open in the header with Snap to set to Increment and the Absolute Grid Snap checkbox ticked. Below it, the side piece stands in the 3D view with its origin and move gizmo beside it.](files/mirroring-the-side-t0050.7.jpg)
    
    Snapping set to Increment, with Absolute Grid Snap.
    
3.  **Add a Mirror modifier.** <page-anchor target="#video-r5iSQNviDJg" value="60">1:00</page-anchor> In the _Modifier Properties_, choose _Add Modifier → Mirror_.
    
    ![The Add Modifier menu open in the Properties editor, in four columns: Modify, Generate, Deform and Simulate. Mirror is highlighted in the Generate column. The side piece is selected in the viewport.](files/mirroring-the-side-t0068.0.jpg)
    
    Add Modifier → Mirror, in the Generate column.
    
4.  **Fix the axis by applying the rotation.** <page-anchor target="#video-r5iSQNviDJg" value="68">1:08</page-anchor> At first it mirrors in the wrong direction: on _X_, the copy folds back onto the side. _Y_ doesn't work either, and it's _Z_ that puts the copy beside it <page-anchor target="#video-r5iSQNviDJg" value="82">1:22</page-anchor>. That's because the side started as a plane rotated 90 degrees in Part 2, so its own axes don't match the world's.
    
    ![The side piece with its Mirror modifier set to the Y axis: the copy is folded onto the side itself, making a closed loop, instead of standing beside it. The Mirror modifier's Axis has only Y ticked.](files/mirroring-the-side-t0075.4.jpg)
    
    Mirrored on the wrong axis: the copy folds back onto the side.
    
    Press Ctrl+A and choose _Rotation_ <page-anchor target="#video-r5iSQNviDJg" value="88">1:28</page-anchor>. Before, the sidebar shows the rotation as 90 degrees; after, it's 0. Applying it doesn't turn the object back: it treats its current rotation as its original one. Now mirroring on _X_, which is what you want, puts the copy in the right place <page-anchor target="#video-r5iSQNviDJg" value="108">1:48</page-anchor>.
    
    ![The Apply menu (Ctrl+A) open in the 3D view, with Rotation highlighted among Location, Rotation, Scale, All Transforms and Rotation & Scale. The Mirror modifier is in the stack on the right.](files/mirroring-the-side-t0092.8.jpg)
    
    Ctrl+A → Rotation.
    
    ![Two mirrored side pieces facing each other across the center of the scene, with the brace on one of them. The sidebar shows the side's rotation as 0, 0, 0, and the Mirror modifier's Axis has X ticked.](files/mirroring-the-side-t0112.8.jpg)
    
    After applying the rotation, the mirror on X makes the other side.
    

Mirror the brace
----------------

1.  **Apply the rotation and scale.** <page-anchor target="#video-r5iSQNviDJg" value="118">1:58</page-anchor> Do the same for the other pieces: press Ctrl+A and choose _Rotation & Scale_, which also sets the scale back to 1. On a bracket it won't work: it's a multi-user object, an instance made with Alt+D <page-anchor target="#video-r5iSQNviDJg" value="132">2:12</page-anchor>. To reset its scale, delete the copy, apply it on the original, then make the copy again with Alt+D, move it along X and put it in place <page-anchor target="#video-r5iSQNviDJg" value="142">2:22</page-anchor>. It doesn't have to be perfect.
    
    ![The bracket selected on the end of the brace, with scale X 0.015, Y 0.129, Z 0.129 in the sidebar. The status bar shows a red warning: Cannot apply to a multi user: Object Cube.002, Mesh Cube.002, aborting.](files/mirroring-the-side-t0142.4.jpg)
    
    An instance can't have its scale applied.
    
2.  **Snap the brace's origin to the center.** <page-anchor target="#video-r5iSQNviDJg" value="168">2:48</page-anchor> The brace's origin needs to be on the center line too. Turn on snapping and move the brace so its origin snaps to the center. The brace itself is now in the wrong place, so press Tab, turn on X-ray so you get all its vertices, and move its geometry back into place, here in the _Front Orthographic_ view <page-anchor target="#video-r5iSQNviDJg" value="181">3:01</page-anchor>. Moving geometry in Edit Mode doesn't move the origin: it stays where it is <page-anchor target="#video-r5iSQNviDJg" value="203">3:23</page-anchor>. It's a different route from the side's, but it does the same thing.
    
    ![Front Orthographic view in Edit Mode on the brace, named Cube: all its geometry is selected, in orange, and being moved over the side piece, which runs down the view. The header reads D: -0.02313 m global.](files/mirroring-the-side-t0210.8.jpg)
    
    Moving the brace's geometry back, with its origin left on the center line.
    
3.  **Add the Mirror modifier.** <page-anchor target="#video-r5iSQNviDJg" value="229">3:49</page-anchor> Add a _Mirror_ modifier to the brace: _X_ is already ticked, and the copy appears in the right place.
    
    ![Both side pieces in the 3D view, each with a brace running along it: the brace's Mirror modifier, with X ticked, has made the second one.](files/mirroring-the-side-t0245.0.jpg)
    
    The brace mirrored onto the other side.
    

Mirror the brackets
-------------------

1.  **Don't use instances for the brackets.** <page-anchor target="#video-r5iSQNviDJg" value="250">4:10</page-anchor> The brackets are different: each needs its own origin on the center line, so they can't be instances sharing one mesh. Work on one bracket first: move it into position, scaling it a little if it needs it <page-anchor target="#video-r5iSQNviDJg" value="271">4:31</page-anchor>.
    
2.  **Center its origin and mirror it.** <page-anchor target="#video-r5iSQNviDJg" value="301">5:01</page-anchor> Move the bracket's origin onto the center line with snapping, as before. There are other ways: for example, you could snap the origin to the 3D cursor, which is already in the middle of the scene <page-anchor target="#video-r5iSQNviDJg" value="310">5:10</page-anchor>. Any way that gets the origin there is fine. Then add a _Mirror_ modifier <page-anchor target="#video-r5iSQNviDJg" value="328">5:28</page-anchor>.
    
3.  **Duplicate it for the other bracket.** <page-anchor target="#video-r5iSQNviDJg" value="338">5:38</page-anchor> Press Shift+D to duplicate it (a full copy, not an instance). If you press Esc while moving it, the copy isn't undone: it stays where it was, on top of the original. Be careful not to make extra copies like this without noticing <page-anchor target="#video-r5iSQNviDJg" value="352">5:52</page-anchor>. Move the copy to the other side of the brace, then fix its origin with snapping <page-anchor target="#video-r5iSQNviDJg" value="384">6:24</page-anchor>. It's a copy of an object that already had the modifier, so it's mirrored already.
    

Wrap-up
-------

![The chair's frame in the 3D view: two side pieces facing each other, each with its brace and brackets. A Cmd+S key press shows at the bottom, and the status bar confirms the file was saved.](files/mirroring-the-side-t0400.0.jpg)

Both sides of the chair, mirrored. Save your file.

You've used Mirror modifiers to make the other side of the chair. Each mirror works around its object's origin and axes, so put the origin on the center line (with snapping, Affect Only Origins or the 3D cursor) and apply rotation and scale first; instances share one mesh and can't be applied or given separate origins. Save your file <page-anchor target="#video-r5iSQNviDJg" value="391">6:31</page-anchor>. Next you'll start on the cushions, from a cube.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-r5iSQNviDJg" value="0">0:00</page-anchor> In the reference image here, we have two C cushions, one for the back, one for the bottom, and they're generally a square or a sort of rectangular shape, but they've got some shape and curvature to them. So let's move this object roughly where we want it to be. And we'll imagine that the y-axis is the center. So if we mirror it, there would be one roughly this distance, or exactly this distance on the other side. In order to do that, we need our origin to be on that axis. So we will go up to Origins Transform.</p><p><page-anchor target="#video-r5iSQNviDJg" value="42">0:42</page-anchor> And we need to turn on snapping. So let's turn on snapping. and go down to increment and absolute grid snap and on the X here we can absolutely snap that to the grid okay let's jump out of here and disable origins for now we'll come back to that for the other pieces and let's add a mirror modifier okay so it's mirroring in the wrong dimension so let's click on Y and disable X. Okay, and I think because we started from a plane that we originally had rotated, it's kind of working this way. So if we want to make this actually correspond properly, what we can do is press Ctrl, Ctrl A and do rotation. Okay, and what that means is if I undo those quickly. You can see it's rotated 90. But let's just reset our rotation. So it doesn't unrotate the object. It just acts as if this is the original rotation. And so what that means is when we mirror in the x-axis now, which is what we want to mirror in, it's showing up appropriately.</p><p><page-anchor target="#video-r5iSQNviDJg" value="118">1:58</page-anchor> And so let's go ahead and do that for these as well. So if I just, let's just freeze our rotation. and our scale set that back to one okay we can actually do rotation and scale together and you can see it doesn't want to do that because it's what's called a multi-user object it's an instance to object so if you wanted to reset the scale we would actually have to delete this reset our scale do Alt D, hold X, and then just kind of put that in place.</p><p><page-anchor target="#video-r5iSQNviDJg" value="161">2:41</page-anchor> It doesn't have to be perfect. It will look good when we go to render. Okay. So this object, we have to do the same thing. We have to make sure our origin is snapped to the middle here. So let's turn on snapping. So this is correct. There we go. But, you know, obviously our object's not in the right place. So if we tab in, we can just move it. Oops. Turn on x-ray mode there to grab all of our vertices.</p><p><page-anchor target="#video-r5iSQNviDJg" value="203">3:23</page-anchor> Undo that. Let's just go in the front view. And so you'll notice when you are editing this object, when you move your geometry around, it doesn't affect the origin. The origin stays where you originally created the object. So that's why I can move the origin here, but then edit and move the geometry over there. So it's a little bit different from how I did this one, but it accomplishes the same thing. and so now we can essentially add that same modifier so let's go to mirror and you can see x is already selected and now it's automatically putting that in the right place okay and we're going to do something a little bit different we're going to add the origin for this and this will be different so this actually this can't be an instance because it's going to be slightly different it's going to have a different origin so let's just move this in a position here okay</p><p><page-anchor target="#video-r5iSQNviDJg" value="293">4:53</page-anchor> Actually, I'm noticing I might want to scale this just a little bit. Yeah, okay. Okay, let's go up and move that origin. turn snapping on. And there are other ways to do this as well. For instance, I could snap the origin to the 3d cursor, which is already in the middle of the scene. But there's no wrong way to do this as long as you're getting the origin there. So that way, when you go to mirror, it mirrors appropriately. So let's go ahead and add your modifier. And there it is. Okay.</p><p><page-anchor target="#video-r5iSQNviDJg" value="338">5:38</page-anchor> So now we are going to do a shift D we have snapping turned on so let's escape out of that turn off snapping and i did escape out of it it doesn't undo the duplication so just be careful you don't duplicate it leave it there and then duplicate another one um yeah always check to make sure that you're not creating too many of the same object. Okay, the origin is going to be pretty close, but not quite where we need it to be. So let's go in and modify those origins.</p><p><page-anchor target="#video-r5iSQNviDJg" value="384">6:24</page-anchor> Turn snapping on. Okay, there we go. And you can see because I had duplicated an object with the modifier this was already applied so I didn't have to add that mirror modifier okay let's hit save there and so we've got good start to a chair let's go ahead and add a cube and start working on let's get out of origin mode here start working on those cushions</p></div></a11y-collapse>