With the skeleton built, the mesh needs to follow it. In this short part you'll parent (bind) the character mesh to the armature with automatic weights, so each bone moves the part of the mesh around it. Then you'll switch to Pose Mode, rotate some bones to test the bind, and reset the pose. You'll need the character mesh and the named, symmetrized armature from the last part. The video uses Blender 2.90.

Bind the mesh
-------------

1.  **Select the mesh, then the armature.** <page-anchor target="#video-UiBN8K89W64" value="1">0:01</page-anchor> In _Object Mode_, select the mesh first, then Shift\-click the armature so it's selected second. The order matters. Selecting both can be fiddly; wireframe shading may make it easier <page-anchor target="#video-UiBN8K89W64" value="14">0:14</page-anchor>, or click them in the Outliner <page-anchor target="#video-UiBN8K89W64" value="20">0:20</page-anchor>.
    
2.  **Parent with automatic weights.** <page-anchor target="#video-UiBN8K89W64" value="31">0:31</page-anchor> Press Ctrl P and, under _Armature Deform_, choose _With Automatic Weights_. This parenting is called a bind.
    
    ![The character in wireframe with its armature inside, the mesh and the armature both selected. The Set Parent To menu is open, with Armature Deform highlighted and its options With Empty Groups, With Envelope Weights and With Automatic Weights below it.](files/parenting-the-mesh-to-the-armature-t0048.0.jpg)
    
    Ctrl P → Armature Deform → With Automatic Weights.
    
3.  **Check the bind.** <page-anchor target="#video-UiBN8K89W64" value="56">0:56</page-anchor> Select the mesh (pCube1 in the video): in the Outliner it's now under the armature, and in its _Modifier Properties_ there's an _Armature_ modifier pointing at the armature <page-anchor target="#video-UiBN8K89W64" value="67">1:07</page-anchor>.
    
    ![The mesh selected in wireframe. The Outliner shows pCube1 nested under Armature, and the Modifier Properties list a Subdivision Surface modifier followed by an Armature modifier with Object set to Armature and Bind to Vertex Groups turned on.](files/parenting-the-mesh-to-the-armature-t0068.8.jpg)
    
    The mesh is parented to the armature and has an Armature modifier.
    

Test it in Pose Mode
--------------------

1.  **Switch the armature to Pose Mode.** <page-anchor target="#video-UiBN8K89W64" value="72">1:12</page-anchor> Select the armature and choose _Pose Mode_ from the mode menu at the top left of the viewport (instead of Edit Mode). Pose Mode is where you pose the skeleton.
    
2.  **Rotate a bone.** <page-anchor target="#video-UiBN8K89W64" value="82">1:22</page-anchor> Select a bone and press R to rotate it. Automatic weights have linked the vertices to the bones: each bone moves the vertices around it, and the bones that are its children, with their vertices, follow along <page-anchor target="#video-UiBN8K89W64" value="93">1:33</page-anchor>. You can't move bones apart the way you can in Edit Mode <page-anchor target="#video-UiBN8K89W64" value="112">1:52</page-anchor>. Undo with Ctrl Z (Cmd Z on a Mac).
    
    ![Pose Mode in wireframe. The lowerback bone, highlighted in blue, has been rotated, and the upper body, arms and head lean over with it while the legs stay put. The sidebar shows its rotation as a quaternion: W 0.980, X 0.033, Y 0.070, Z 0.181.](files/parenting-the-mesh-to-the-armature-t0090.8.jpg)
    
    Rotating the lowerback bone bends the mesh, and everything above it follows.
    
3.  **Zero a bone's rotation by hand.** <page-anchor target="#video-UiBN8K89W64" value="117">1:57</page-anchor> To put a bone back, with it selected, open the sidebar's _Transform_ and set the rotation's X, Y and Z to 0 and W back to 1 <page-anchor target="#video-UiBN8K89W64" value="130">2:10</page-anchor>. That resets it.
    
    ![Pose Mode with the upper body bent sideways. In the sidebar, the rotation fields X, Y and Z of the selected lowerback bone are being edited together, with W 0.851, ready to type 0.](files/parenting-the-mesh-to-the-armature-t0136.4.jpg)
    
    Editing the bone's rotation: X, Y and Z to 0, and W to 1.
    
4.  **Test a leg.** <page-anchor target="#video-UiBN8K89W64" value="150">2:30</page-anchor> In solid shading, rotate a leg bone on X to bend the leg, and check that no vertices elsewhere in the mesh move with it <page-anchor target="#video-UiBN8K89W64" value="172">2:52</page-anchor>. Automatic weights do a pretty good job out of the box, but every once in a while something will be out of place.
    
    ![The solid-shaded character in Pose Mode with one knee raised: the thigh is bent forward and the shin hangs down, and the mesh bends smoothly at the hip and knee while the rest of the body stays still.](files/parenting-the-mesh-to-the-armature-t0170.8.jpg)
    
    A leg bent at the hip and knee: a quick check of the bind.
    

Switch modes and clear the pose
-------------------------------

1.  **Use the shortcuts to switch modes.** <page-anchor target="#video-UiBN8K89W64" value="192">3:12</page-anchor> With the armature selected, Ctrl Tab switches between Object Mode and Pose Mode, and Tab between Object Mode and Edit Mode. A pose stays on the mesh in Object Mode.
    
2.  **Clear rotations.** <page-anchor target="#video-UiBN8K89W64" value="212">3:32</page-anchor> In Pose Mode, press A to select all the bones, then Alt R (Option R on a Mac) to reset their rotations.
    
3.  **Clear locations.** <page-anchor target="#video-UiBN8K89W64" value="229">3:49</page-anchor> In Pose Mode you can grab a disconnected bone with G and move it, which smears the mesh. To clear any moves like that, press Alt G <page-anchor target="#video-UiBN8K89W64" value="241">4:01</page-anchor>.
    
    ![Pose Mode with the shoulder.R bone, highlighted in blue, being moved up and away from the body with G, stretching the arm and shoulder of the mesh with it. The header shows the distance moved.](files/parenting-the-mesh-to-the-armature-t0242.0.jpg)
    
    Moving a disconnected bone with G smears the mesh. Alt G clears it.
    

Wrap-up
-------

The mesh is bound to the armature with automatic weights, and you can pose it in Pose Mode and clear the pose with Alt R and Alt G. Next you'll add IK constraints to make posing the arms and legs easier.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-UiBN8K89W64" value="1">0:01</page-anchor> Okay, so the first thing we want to do is grab our armature, but we want to be in object mode. So let's get out of edit mode, go to object mode, and we want to select our mesh, and then we want to shift select our armature. It can actually be pretty difficult to select them both sometimes, so you can go into wireframe mode, you may have better luck doing that, or you can go ahead and grab your mesh object and then shift select or command select select the armature second. So now what we can do is essentially parent the mesh to the armature in what's called a bind. So we're going to do Ctrl-P and that brings up our set parent dialog box and we can go down to Armature Deform and grab the Automatic Weights preset. Okay, and then we just left click to confirm that.</p><p><page-anchor target="#video-UiBN8K89W64" value="56">0:56</page-anchor> And now what we have, under the modifiers, if we select our pCube1 here, you can see that it's actually now parented under Armature. If we go to Modifiers, you can see there's an Armature modifier associated with it. So if we select our Armature and go back to, instead of Edit Mode, we can go down to Pose Mode. This will enable us to actually start posing our skeleton. So I can press R to rotate, and you'll see that it's automatically given us a relationship between the vertices and certain bones. So this bone, for instance, will control the vertices that are in its immediate area and rotate those accordingly.</p><p><page-anchor target="#video-UiBN8K89W64" value="100">1:40</page-anchor> And it's also rotating the bones that are our children of them to move the vertices down the line. you can't move these like you could in edit mode so pose mode is very different. I'm just going to press command Z to undo that. Okay if you happen to move this and you want to zero this back out under the transform options here with that bone selected you can go ahead and press zero under rotation to undo that rotation. And we want to take the W value here and put that back to one.</p><p><page-anchor target="#video-UiBN8K89W64" value="144">2:24</page-anchor> And so what that does is just it resets it. And that's kind of how you can zero everything back out. Okay, so let's go ahead and look at the solid shaded view. I want to go ahead and rotate this just to test it out. So let's make sure everything is properly bound. So rotate in the x axis and we're going to just rotate this down x axis and see what our leg is doing. Okay it's not too bad. We just want to make sure there's no vertices elsewhere and other parts of the mesh that are being impacted. This does a pretty good job out of the box to keep a nice deformation but every once in a while you'll see something that is out of place or wrong.</p><p><page-anchor target="#video-UiBN8K89W64" value="192">3:12</page-anchor> okay so if you want to see the relationship here what we can do is go back to object mode if you do control tab that's going to change from object mode to pose mode and tab is going to go to edit mode and object mode for that armature okay so tab and control tab are going to be the quickies to jump between these two modes okay so now what I want to do is actually reset this bone and clear out these rotations. So if we do option R, actually I think if I press A and then do option R it will reset everything. And if you've moved anything, for instance if you've grabbed one of these disconnected bones and pressed G and actually moved it, this will enable you to do some kind of smeary type of animations. I'm going to hit escape there to undo that. But if you did move you could do option G or alt G and that will clear out any location changes to that bone as well.</p></div></a11y-collapse>