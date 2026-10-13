Rendering a scene for each camera and cutting the shots together in After Effects isn't the only way to make an animatic. If that's too confusing, you can make all your cuts inside Blender: put markers on the timeline and bind a camera to each, and Blender switches to that camera when playback reaches the marker. This part shows how, with three cameras and a cube.

Set up the cameras
------------------

1.  **Add your cameras.** <page-anchor target="#video-KHaYqnlE5dk" value="1">0:01</page-anchor> Press Shift+A and choose _Camera_; here there are three <page-anchor target="#video-KHaYqnlE5dk" value="20">0:20</page-anchor>.
    
    ![The default scene with a cube and a camera, and the Add menu open with Camera highlighted. The Outliner lists Camera, Camera.001, Cube and Light, and an Add Camera panel shows at the bottom left.](files/switching-cameras-with-markers-t0021.0.jpg)
    
    _Add → Camera_.
    
2.  **Frame each shot.** <page-anchor target="#video-KHaYqnlE5dk" value="30">0:30</page-anchor> Look through each camera in turn and move it into place. To move a camera by navigating the view, open the sidebar's _View_ tab and tick _Camera to View_ under _View Lock_ <page-anchor target="#video-KHaYqnlE5dk" value="42">0:42</page-anchor>.
    
    ![Camera Perspective through Camera.002, looking at the cube straight on. The sidebar's View tab shows View Lock with Camera to View ticked.](files/switching-cameras-with-markers-t0048.4.jpg)
    
    _Camera to View_: the camera follows as you move the view.
    

Bind a camera to each cut
-------------------------

1.  **Add a marker for each cut.** <page-anchor target="#video-KHaYqnlE5dk" value="60">1:00</page-anchor> In the timeline, choose _Marker → Add Marker_ at the first frame, at frame 40 and at frame 90 <page-anchor target="#video-KHaYqnlE5dk" value="64">1:04</page-anchor>. Markers show in several animation editors, so you can do this from other ones too <page-anchor target="#video-KHaYqnlE5dk" value="74">1:14</page-anchor>.
    
    ![The timeline at frame 1 with three markers along its bottom edge, named F_01, F_40 and F_90.](files/switching-cameras-with-markers-t0091.4.jpg)
    
    Three markers: one per shot.
    
2.  **Bind a camera to each marker.** <page-anchor target="#video-KHaYqnlE5dk" value="87">1:27</page-anchor> Select a marker so it's highlighted, select the camera for that shot, and choose _Marker → Bind Camera to Markers_ <page-anchor target="#video-KHaYqnlE5dk" value="91">1:31</page-anchor>. The marker takes the camera's name. If it doesn't seem to work, check the marker is selected: that's what went wrong in the video <page-anchor target="#video-KHaYqnlE5dk" value="139">2:19</page-anchor>. Markers can be dragged to move the cut <page-anchor target="#video-KHaYqnlE5dk" value="103">1:43</page-anchor>.
    
    ![The timeline's Marker menu open with Add Marker, Duplicate Marker, Delete Marker, Rename Marker, Move Marker and Bind Camera to Markers, Command B. The first marker is already named Camera.002.](files/switching-cameras-with-markers-t0110.0.jpg)
    
    _Marker → Bind Camera to Markers_.
    
3.  **Play it.** <page-anchor target="#video-KHaYqnlE5dk" value="156">2:36</page-anchor> As you play through, Blender switches cameras at each marker.
    
    ![The timeline with three camera markers, Camera.002 at frame 1, Camera at 40 and Camera.001 at 90, while the viewport looks through Camera.001.](files/switching-cameras-with-markers-t0156.0.jpg)
    
    Each marker now carries a camera.
    

Render it in one go
-------------------

1.  **Weigh it up.** <page-anchor target="#video-KHaYqnlE5dk" value="160">2:40</page-anchor> This way you don't need a scene for each shot or a viewport render of each, so rendering is much faster and the workflow simpler. The downside is that you don't get extra frames from the other angles to choose from in the edit <page-anchor target="#video-KHaYqnlE5dk" value="177">2:57</page-anchor>. Either way is fine: it depends on your workflow.
    
2.  **Render the viewport.** <page-anchor target="#video-KHaYqnlE5dk" value="192">3:12</page-anchor> Do a viewport render as in the last part, and the cameras switch as it renders.
    
    ![The Blender Render window partway through a viewport render at frame 57, showing the cube from the camera bound at frame 40, with another camera visible in the shot.](files/switching-cameras-with-markers-t0202.8.jpg)
    
    The viewport render switches cameras at the markers.
    

<page-anchor target="#video-KHaYqnlE5dk" value="209">3:29</page-anchor> Next, you'll bring the image sequences into After Effects.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-KHaYqnlE5dk" value="1">0:01</page-anchor> Ok, I just wanted to mention really quickly the other way to do this. If you find that that method is too confusing and you want to do all of your cuts within Blender, it's really easy to do that. So let's make a few cameras here. I'm just going to add another camera. Let's add a third one. okay you can see I have three cameras the way that you get these cameras to automatically switch in terms of what the default is so as we click through you can see that each camera is switching let me actually lock these here go ahead and lock that to the view right so let's go to this one move that around okay so clearly these are different cameras the way that you would do this is create a marker so we're going to create a marker here marker at frame 40 so we just have the default timeline up go into the marker tab and adding marker and frame 90 and then add another marker so these markers they exist within a bunch</p><p><page-anchor target="#video-KHaYqnlE5dk" value="80">1:20</page-anchor> of different animation editors as well so you can do this from other panels but for our purposes we'll just do it here in the timeline if you go to the first marker if you go up to marker and then bind camera to markers whatever you have selected will be bound and now you can see that camera 2 is bound to that first you can actually drag and move it. We're going to go ahead and select this camera here, and then we're going to bind that to this selected marker. It doesn't look like it worked here. Let's just try that again. All right, you can see that camera is now bound. I think I may have accidentally bound it the first time here to that marker so we're gonna just choose camera 2 again and we're gonna bind it there we go all right let's go to the third one and let's select the marker I think that was what I didn't do you have to select it so it's highlighted and then we're gonna choose the the last camera here which would be that's this one here we're gonna do marker bind and now you can see as</p><p><page-anchor target="#video-KHaYqnlE5dk" value="156">2:36</page-anchor> As you play through, it's going to automatically switch the camera. So if this is how you would rather produce your animation, so you don't have to create all of those different scene configurations and do all of the different viewport renders, this is completely acceptable. It really just depends on the workflow. The only downside is if you wanted extra frames from another angle, you don't have those, but your rendering will be much faster. and the workflow itself is much more simplified and then to get this animation created you would just do a viewport render here and it should automatically switch so just to test that out i'm going to go ahead and do a viewport render and you can see here in the preview as it's rendering it's actually switching those okay cancel this all right now let's go look at how to bring in our image sequences into after effects</p></div></a11y-collapse>