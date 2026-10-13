You'll render an animation from Blender as a folder of numbered PNG images, one per frame, and then turn them into a video: set the footage to the animation's frame rate in After Effects, and export an H.264 MP4 with Media Encoder. You'll need an animation in Blender (the video uses a stylized waterfall, 250 frames at 24 fps), After Effects and Media Encoder. The video uses Blender 4.2 and After Effects 2025, so some menus may look a little different in newer versions.

Render an image sequence in Blender
-----------------------------------

1.  **Check the animation.** <page-anchor target="#video-Tv7RAvdBQNw" value="5">0:05</page-anchor> Play it back to see what you're rendering: here a stylized waterfall that runs for 250 frames. In the _Output Properties_, _Frame Rate_ is 24 fps and the frame range is 1 to 250.
    
2.  **Choose a folder for the images.** <page-anchor target="#video-Tv7RAvdBQNw" value="16">0:16</page-anchor> In the _Output Properties_, under _Output_, click the folder icon. In Blender's file browser, make a new folder for the images (here waterfall-images) <page-anchor target="#video-Tv7RAvdBQNw" value="26">0:26</page-anchor>, open it and click _Accept_ <page-anchor target="#video-Tv7RAvdBQNw" value="36">0:36</page-anchor>.
    
3.  **Save the frames as PNG.** <page-anchor target="#video-Tv7RAvdBQNw" value="38">0:38</page-anchor> Under _Output_, set _File Format_ to _PNG_.
    
    ![Blender's Output Properties: Frame Rate 24 fps, Frame Start 1 and End 250, and an output path ending in waterfall-images. The File Format menu is open with PNG highlighted among the image formats, and FFmpeg Video on its own under Movie. The viewport shows gray low-poly cliffs with a blue waterfall falling into a teal pool.](files/turning-an-image-sequence-into-a-video-t0041.8.jpg)
    
    250 frames at 24 fps, saved as PNG images in a folder of their own.
    
4.  **Render the animation.** <page-anchor target="#video-Tv7RAvdBQNw" value="45">0:45</page-anchor> Choose _Render → Render Animation_. Blender renders each frame of the animation in turn and saves it into the folder <page-anchor target="#video-Tv7RAvdBQNw" value="50">0:50</page-anchor>.
    

Make it a video in After Effects
--------------------------------

1.  **Import the folder.** <page-anchor target="#video-Tv7RAvdBQNw" value="63">1:03</page-anchor> The folder now holds the numbered frames, 0001.png to 0250.png <page-anchor target="#video-Tv7RAvdBQNw" value="65">1:05</page-anchor>. Drag the folder into After Effects' _Project_ panel <page-anchor target="#video-Tv7RAvdBQNw" value="68">1:08</page-anchor>: the images come in as one piece of footage, a PNG sequence named \[0001-0250\].png.
    
2.  **Set the footage to 24 fps.** <page-anchor target="#video-Tv7RAvdBQNw" value="77">1:17</page-anchor> After Effects reads the sequence at 30 frames per second, which is wrong: the animation was made at 24. Right-click the footage, choose _Interpret Footage → Main_, set _Assume this frame rate_ to 24 and click _OK_ <page-anchor target="#video-Tv7RAvdBQNw" value="84">1:24</page-anchor>.
    
    ![After Effects' Interpret Footage dialog for [0001-0250].png, with Assume this frame rate set to 24 frames per second. Behind it, the Project panel lists the footage as a PNG sequence, 3000 by 1500, at 30 fps and 0:00:08:10 long.](files/turning-an-image-sequence-into-a-video-t0086.8.jpg)
    
    Read at 30 fps, the 250 frames last just over 8 seconds. At 24 they last about 10.
    
3.  **Make a composition and preview it.** <page-anchor target="#video-Tv7RAvdBQNw" value="89">1:29</page-anchor> Drag the footage down into the empty timeline: After Effects makes a composition from it <page-anchor target="#video-Tv7RAvdBQNw" value="91">1:31</page-anchor>. Press Space to preview it <page-anchor target="#video-Tv7RAvdBQNw" value="93">1:33</page-anchor>. It should last roughly 10 seconds <page-anchor target="#video-Tv7RAvdBQNw" value="96">1:36</page-anchor>.
    
4.  **Send it to Media Encoder.** <page-anchor target="#video-Tv7RAvdBQNw" value="103">1:43</page-anchor> Choose _File → Export → Add to Adobe Media Encoder Queue_. Media Encoder opens with the composition in its queue <page-anchor target="#video-Tv7RAvdBQNw" value="109">1:49</page-anchor>.
    
    ![After Effects' File menu open at Export, with its submenu: Add to Adobe Media Encoder Queue, Add to Render Queue, Export Adobe Premiere Pro Project and Maxon Cinema 4D Exporter. Behind it, the composition Comp shows the waterfall, and its timeline runs from 0 to 10 seconds.](files/turning-an-image-sequence-into-a-video-t0105.4.jpg)
    
    The video is made in Media Encoder, so send the composition to its queue.
    

Export an H.264 video with Media Encoder
----------------------------------------

1.  **Use H.264 with the Vimeo preset.** <page-anchor target="#video-Tv7RAvdBQNw" value="109">1:49</page-anchor> Here the composition comes in with the format _H.264_ and the preset _Vimeo 1080p Full HD_; keep them. If yours has another preset, click the _Preset_ drop-down and select _Vimeo 1080p Full HD_ <page-anchor target="#video-Tv7RAvdBQNw" value="117">1:57</page-anchor>. _HEVC (H.265)_ is a newer standard you could use, but with it you lose the Vimeo preset <page-anchor target="#video-Tv7RAvdBQNw" value="123">2:03</page-anchor>, so the video goes back to H.264 and selects Vimeo 1080p Full HD again <page-anchor target="#video-Tv7RAvdBQNw" value="132">2:12</page-anchor>.
    
    ![Adobe Media Encoder's Queue: the Comp item has Format H.264 and Preset Vimeo 1080p Full HD, both shown as blue links, and its Output File is in a temporary folder, ending in Untitled Project_AME/Comp.mp4. Its status is Ready.](files/turning-an-image-sequence-into-a-video-t0116.0.jpg)
    
    H.264 with the Vimeo 1080p Full HD preset. The output file starts out in a temporary folder.
    
2.  **Choose where the video goes.** <page-anchor target="#video-Tv7RAvdBQNw" value="141">2:21</page-anchor> Click the path under _Output File_. In the _Save As_ dialog, choose a folder: here a new folder, waterfall-video, beside the folder of images <page-anchor target="#video-Tv7RAvdBQNw" value="156">2:36</page-anchor>. Then click _Save_ <page-anchor target="#video-Tv7RAvdBQNw" value="163">2:43</page-anchor>.
    
3.  **Start the queue.** <page-anchor target="#video-Tv7RAvdBQNw" value="166">2:46</page-anchor> Click the green play button at the top right of the queue. Media Encoder encodes the animation into the video file; here it takes about 20 seconds.
    
    ![Media Encoder encoding: a progress bar beside Comp in the Queue, and the Encoding panel with a preview of the waterfall, the file name Comp.mp4 in the waterfall-video folder, Format H.264, Preset Vimeo 1080p Full HD and a target bitrate of 16 Mbps, with 19 seconds remaining.](files/turning-an-image-sequence-into-a-video-t0174.4.jpg)
    
    Encoding into the new waterfall-video folder.
    
4.  **Check the video.** <page-anchor target="#video-Tv7RAvdBQNw" value="180">3:00</page-anchor> When it's done, click the output file's path to show it in the Finder, and open the video (here Comp.mp4) to preview it <page-anchor target="#video-Tv7RAvdBQNw" value="184">3:04</page-anchor>.
    
    ![The finished Comp.mp4 playing in a Quick Look window at 1 second of 10: the blue waterfall between the gray low-poly cliffs, with Open with QuickTime Player at the top right.](files/turning-an-image-sequence-into-a-video-t0186.8.jpg)
    
    The finished 10-second MP4.
    

Wrap-up
-------

You've rendered a Blender animation as a sequence of PNG images, set the footage to its real frame rate in After Effects with Interpret Footage, and exported it from Media Encoder as an H.264 MP4 with the Vimeo 1080p Full HD preset.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-Tv7RAvdBQNw" value="0">0:00</page-anchor> Okay, let's quickly look at how to render an image sequence. In Blender I have an animation. I'm going to play this back. It's a sort of stylized waterfall. Okay, and it spans 250 frames. And so what I can do is go over to my output settings and select a folder. And so I'm just going to choose a folder here. Let's call this waterfall images. So let's click accept and in this case I'm going to use PNG and then we will go to render, render animation and what you'll see is this goes through and renders each frame of the animation to that folder. Okay the render has completed so let's go ahead and import it into After Effects. So here is After Effects and here is the image sequence.</p><p><page-anchor target="#video-Tv7RAvdBQNw" value="67">1:07</page-anchor> So I'm going to drag this folder into After Effects in this project panel. It creates a sequence. the sequence is 30 frames per second so that's wrong so we need to right click Interpret Footage main make this 24 click on okay and drag and drop into the comp area press space bar to preview it okay it looks like it's working as it should roughly 10 seconds all right so now we can export it go to file export Adobe Media Encoder okay so here is the project in Media Encoder so i'm going to keep the Vimeo 1080p Full HD preset but if you want to select that you can click on the drop down select it we're going to stick with H.264 although H.265 is a new standard that you can use however we lose the Vimeo preset so i'm going to go back to H.264 and select Vimeo 1080p Full HD and i'm going to choose a folder</p><p><page-anchor target="#video-Tv7RAvdBQNw" value="163">2:43</page-anchor> Okay, with the folder selected, I'm going to click Save and click the Play button, and it will go through and render out this animation. okay now that that's done i can click on this file here and i can open it up and preview my animation</p></div></a11y-collapse>