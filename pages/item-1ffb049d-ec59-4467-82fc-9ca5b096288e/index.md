With a scene set up for each shot, you can render them. An animatic doesn't need proper renders: Blender's viewport render saves what the viewport shows, frame by frame, in seconds. In this part you'll give each scene its own output folder, named to match the scene, burn the frame number and camera into every image, and render each scene as an image sequence ready for editing.

Set up the first scene's output
-------------------------------

1.  **Lock the cameras first.** <page-anchor target="#video-AHLXV1owoaQ" value="0">0:00</page-anchor> It's easy to knock a camera out of place by accident; it happens again at the start of the video. Lock each camera's transform in the sidebar so it can't happen again <page-anchor target="#video-AHLXV1owoaQ" value="27">0:27</page-anchor>.
    
2.  **Choose an output folder.** <page-anchor target="#video-AHLXV1owoaQ" value="42">0:42</page-anchor> In _Output Properties_, go down to _Output_ and click the folder icon. Make a new folder for this set of renders, so you don't overwrite earlier ones; here it's _animatic-2_, but yours doesn't need a number.
    
3.  **Make a folder for each scene, named like the scene.** <page-anchor target="#video-AHLXV1owoaQ" value="60">1:00</page-anchor> With the new-folder button in Blender's file browser, make _cam-1\_1-144_, then the others while you're there: _cam-2\_1-144_, _cam-3\_1-144_ <page-anchor target="#video-AHLXV1owoaQ" value="81">1:21</page-anchor>. Select the folder for the scene you're in, double-click it and click _Accept_ <page-anchor target="#video-AHLXV1owoaQ" value="107">1:47</page-anchor>.
    
    ![Blender's file browser open in the animatic-2 folder, holding cam-1_1-144 and cam-2_1-144, with a third folder being named cam-. The Recent list on the left shows earlier folders such as cam-3_250-350_x400.](files/rendering-the-viewport-to-image-sequences-t0095.4.jpg)
    
    A folder per scene, made in Blender's file browser.
    
4.  **Keep PNG.** <page-anchor target="#video-AHLXV1owoaQ" value="113">1:53</page-anchor> The default, a PNG image sequence, is what you want.
    
5.  **Burn the frame number into the images.** <page-anchor target="#video-AHLXV1owoaQ" value="118">1:58</page-anchor> Open _Metadata_ and tick _Burn Into Image_. Make sure _Frame_ is ticked: it's the important one. _Camera_ is useful too, so you know which camera made the image. The others are on by default and won't hurt <page-anchor target="#video-AHLXV1owoaQ" value="127">2:07</page-anchor>.
    
    ![Output Properties with the output path set to a cam-1_1-144 folder, File Format PNG, and the Metadata panel open: Date, Time, Render Time, Frame, Camera, Scene and Filename are ticked, and Burn Into Image is ticked at the bottom.](files/rendering-the-viewport-to-image-sequences-t0123.8.jpg)
    
    _Metadata_, with _Frame_, _Camera_ and _Burn Into Image_ ticked.
    

Render the viewport
-------------------

1.  **Render the animation from the viewport.** <page-anchor target="#video-AHLXV1owoaQ" value="139">2:19</page-anchor> Look through the scene's camera and choose _View → Viewport Render Animation_. It renders whatever the viewport shows, for the scene's frame range, into the output folder. While it works, the mouse pointer turns into the number of the frame being rendered <page-anchor target="#video-AHLXV1owoaQ" value="152">2:32</page-anchor>.
    
    ![The 3D Viewport's View menu open with Viewport Render Animation highlighted, between Viewport Render Image and Viewport Render Keyframes, and its tooltip: Render the viewport for the animation range of this scene.](files/rendering-the-viewport-to-image-sequences-t0149.4.jpg)
    
    _View → Viewport Render Animation_.
    
2.  **Make the burned-in text readable.** <page-anchor target="#video-AHLXV1owoaQ" value="158">2:38</page-anchor> At the default size the text is hard to read, so press Esc to stop, change _Font Size_ under _Burn Into Image_ from 12 to 24 px, and render again <page-anchor target="#video-AHLXV1owoaQ" value="163">2:43</page-anchor>.
    
    ![The Blender Render window showing a viewport render of camera 1's shot: the beam, dock, canoe and pines. Along the top are the file path, date and render time; along the bottom, Timecode 00:00:02:18, Frame 066, the camera and Scene CAM-1_1-144. The Burn Into Image settings show Font Size 24 px.](files/rendering-the-viewport-to-image-sequences-t0175.8.jpg)
    
    The frame, camera and scene, readable at 24 px.
    
3.  **Check the folder.** <page-anchor target="#video-AHLXV1owoaQ" value="179">2:59</page-anchor> In _animatic-2_, the scene's folder now holds an image sequence.
    

Repeat for every scene
----------------------

1.  **Set each scene's output folder to match its name.** <page-anchor target="#video-AHLXV1owoaQ" value="188">3:08</page-anchor> Switch to each scene in turn and point its output at the folder with the same name. This is where careful folder, file and scene names pay off: it's easy to get confused, and setting this up ahead of time keeps the renders straight <page-anchor target="#video-AHLXV1owoaQ" value="216">3:36</page-anchor>.
    
2.  **Copy the name of the slowed-down scene.** <page-anchor target="#video-AHLXV1owoaQ" value="242">4:02</page-anchor> For the _x400_ scene, copy the scene's name and paste it as the new folder's name. Here the folder is lowercase, _cam-3\_250-350\_x400_, to match the others, though uppercase would match the scene names better <page-anchor target="#video-AHLXV1owoaQ" value="254">4:14</page-anchor>.
    
    ![The scene CAM-3_250-350_x400 looking through cam-3 at frame 167, with the dog close up by the house. Output Properties show Frame Start 166, End 200, Time Remapping 100 to 400, and an output path ending in cam-3_250-350_x400.](files/rendering-the-viewport-to-image-sequences-t0270.0.jpg)
    
    The slowed-down scene with its own output folder.
    
3.  **Check each scene's metadata.** <page-anchor target="#video-AHLXV1owoaQ" value="283">4:43</page-anchor> Linked copies keep their own render settings, and these scenes were copied before the metadata was set up, so the others don't burn anything in. Go through each scene and tick _Burn Into Image_ and set the font size to 24 <page-anchor target="#video-AHLXV1owoaQ" value="302">5:02</page-anchor>. If you followed along, you'll have the same problem.
    
    <oer-callout type="tip" title="Set it up once"><p>Set up the output format and metadata in your first scene before you make linked copies of it, so every copy starts with them.</p></oer-callout>
4.  **Render them all.** <page-anchor target="#video-AHLXV1owoaQ" value="315">5:15</page-anchor> Render each scene with _View → Viewport Render Animation_ into its folder.
    
5.  **Check the folders.** <page-anchor target="#video-AHLXV1owoaQ" value="369">6:09</page-anchor> Make sure each folder has what you expect.
    
    ![A Finder window open on the cam-3_250-350_x400 folder: 35 PNG images numbered from 0166 to 0200, with 0170.png selected and previewed, showing the dog by the house, 1920 by 1080.](files/rendering-the-viewport-to-image-sequences-t0372.8.jpg)
    
    The slowed-down shot's images, numbered by frame.
    

<page-anchor target="#video-AHLXV1owoaQ" value="375">6:15</page-anchor> Next, you'll bring these folders into After Effects as footage and add audio.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-AHLXV1owoaQ" value="0">0:00</page-anchor> Okay, let's prepare for rendering. So let's go down to our output folder. You can see I just ruined my camera shot there. And I don't remember. Okay, I've zoomed back into the right place. Let's go ahead and lock these. so if I go down to each one looks like it's going to save our lock settings for each one so just to be safe here so I don't do that again let's go do that all right back to our output settings down here under the output settings tab we can go down to output click on the folder I'm going to set up a new folder so I already have one called animatic so I'm going to create a new just so I don't overwrite anything.</p><p><page-anchor target="#video-AHLXV1owoaQ" value="60">1:00</page-anchor> And that folder button is up here. So let's call this animatic. I'm going to call it two, but you don't have to do that for yours. And let's create a folder with the right name. So I'm going to call this cam-1_1-144. And we can actually make all of our folders right now if we want. So why don't we do that? two underscore 144 1-144 and I think we're probably gonna have cam 3 1 to 144 all right so we'll add the others as we go so I'm going to select this one here double click and then accept it and now that folder is set up under output settings for our purposes the default is fine the PNG image sequence is what we want and then we want to go down to metadata and click burn into image and I want the frame to be highlighted here you don't need all of these other ones frame is the important one and maybe camera so we know what camera is being used all the other ones are default or won't hurt anything so we can leave those turned on</p><p><page-anchor target="#video-AHLXV1owoaQ" value="139">2:19</page-anchor> and then we can come up to view viewport render animation and that's going to render whatever viewport you have up currently into an animation into that folder so let's click on that button you can see your mouse pointer turns into a block of moving numbers and that's indicating what frames are getting rendered. I can't really read that, so I'm going to escape out of this, and we're going to actually make this 24 pixels instead of 12 under font size, and we're going to try that again. Okay, there we go. I can read these metadata notes here that are burned into our image. Okay, let's go to our folder under Animatic 2 and see what we have under our folder.</p><p><page-anchor target="#video-AHLXV1owoaQ" value="188">3:08</page-anchor> an image sequence. And now we need to repeat that process. I'm actually going to go down here and set all of these up. Okay, you can see that folder here matches. And let's go down the list down here to output. Let's set this one up as well. Camera two. so I'm already getting confused and if you remember I mentioned that folder and file naming is so important even scene naming is important and configuring this ahead of time really important otherwise you're going to get very confused so these match that's good I'm to go down to camera three let's configure this output folder okay and looks like I have my special kind of slow-mo here I'm gonna copy that file name so that I can just paste it into a new file name here folder name rather okay and just for consistency I'm gonna make this lowercase but probably uppercase would have made more sense given my scene names all right so i'm going to choose that accept</p><p><page-anchor target="#video-AHLXV1owoaQ" value="267">4:27</page-anchor> and accept to configure that and now i can not worry so much about things being properly configured i can just kind of go through the process of rendering the viewport okay you'll notice that it looks like i didn't set up metadata for everything so just make sure that and you know what it's because I didn't have this configured before I was duplicating the scenes so if you're following along you will have made the same mistake that I made so I'm going to go ahead and just quickly jump back through a couple of these click that on type 24 there and this doesn't take much time to do so I'm probably going to just skip the video ahead so you don't have to watch me re-render these. And just go through the process of exporting all of these to the folders. Okay, there we go.</p><p><page-anchor target="#video-AHLXV1owoaQ" value="369">6:09</page-anchor> Okay, once you're done rendering, just check your folders, make sure you have what you're each one and in the next step we're going to take these folders and import them into After Effects as footage and we're going to add audio</p></div></a11y-collapse>