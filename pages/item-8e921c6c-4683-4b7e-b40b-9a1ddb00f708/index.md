With the lights and materials working, the last steps are the camera and the finish. In this part you'll choose a focal length and a composition for the render camera, match the lens to the reference photo, make the backdrop a shadow catcher so the chair renders on a transparent background with its shadow, and then put a background behind it and boost the colour in Photoshop. You'll need the scene from the previous parts, the reference photos of the chair, and Photoshop or another image editor with layers. The video uses Blender 2.83 and Photoshop 2020.

Choose a focal length
---------------------

1.  **Select the camera.** <page-anchor target="#video-BKoH1v42WHo" value="0">0:00</page-anchor> Go to the _Layout_ workspace and switch the viewport to _Material Preview_ so things go a little quicker. Select the camera by clicking its dotted outline in the camera view, or in the Outliner, and open its camera properties.
    
2.  **Try the focal length.** <page-anchor target="#video-BKoH1v42WHo" value="28">0:28</page-anchor> Drag _Focal Length_ to the left and you get a wide-angle lens; the field shows the equivalent in millimetres. Go the other way, to something like 80 mm, and the camera is too close and crops the chair, but a longer lens may give a more pleasing view.
    
    ![Looking through the camera at a 22 mm focal length: the chair is small in the middle of a wide view, with the lights' outlines around it. The camera properties show Lens, Type Perspective, Focal Length 22 mm.](files/framing-the-shot-and-finishing-in-photoshop-t0038.0.jpg)
    
    A short focal length gives a wide-angle view.
    
3.  **Compose the shot.** <page-anchor target="#video-BKoH1v42WHo" value="54">0:54</page-anchor> Pull back, come down to a lower angle and reposition the camera. Drag the magnifying-glass button at the right of the viewport to zoom in slowly, and leave a bit of space at the top and bottom to centre the chair. A straight-on or side view would also work, though you'd have to move the backdrop <page-anchor target="#video-BKoH1v42WHo" value="81">1:21</page-anchor>.
    
    ![The camera view at 80 mm, from a lower angle: the whole chair is centred in the frame with some space above and below it. Focal Length reads 80 mm.](files/framing-the-shot-and-finishing-in-photoshop-t0078.8.jpg)
    
    At 80 mm, with room above and below the chair.
    
4.  **Match the reference photo's lens.** <page-anchor target="#video-BKoH1v42WHo" value="94">1:34</page-anchor> Compare the camera view with the reference photo. The photo was taken with a wider lens; at 80 mm the chair looks flattened. You can guess the photographer's lens: move the camera to match the photo's angle, and from the distance across the bottom of the chair you can tell it isn't the same lens. Try 35 mm <page-anchor target="#video-BKoH1v42WHo" value="132">2:12</page-anchor>. It's not pixel perfect, but it's pretty close: the photo was probably shot with a 35 mm lens.
    
    ![The camera view, now at 35 mm and from the side and slightly in front, next to the reference photo side.jpg open in Preview: the render and the photo show the chair from almost the same angle and perspective.](files/framing-the-shot-and-finishing-in-photoshop-t0160.0.jpg)
    
    At 35 mm the camera view is close to the reference photo.
    
5.  **Turn the backdrop and render.** <page-anchor target="#video-BKoH1v42WHo" value="164">2:44</page-anchor> The backdrop no longer faces the right way, so rotate it, and zoom out a little so the chair isn't cropped. Render. The background is a little dark <page-anchor target="#video-BKoH1v42WHo" value="183">3:03</page-anchor>.
    

Brighten the background
-----------------------

1.  **Move the backdrop closer.** <page-anchor target="#video-BKoH1v42WHo" value="191">3:11</page-anchor> You could add another light for the background. Instead, move the backdrop much closer so the light reaches it more easily (first switch the render window to _Slot 4_ to keep the last render). That's more like a real photo studio: there isn't a huge space, just a room, so the backdrop is much closer to the object.
    
    ![A wide view of the scene from above: the backdrop, selected and outlined in orange, is very large next to the small chair and its lights. The Move panel shows Move X -7.7328 m.](files/framing-the-shot-and-finishing-in-photoshop-t0225.0.jpg)
    
    The backdrop moved much closer to the chair.
    
2.  **Make a quick test render.** <page-anchor target="#video-BKoH1v42WHo" value="240">4:00</page-anchor> In the render settings, set _Sampling_ › _Render_ to 70 so it renders quickly. There's still some grey, so turn the sun up a bit <page-anchor target="#video-BKoH1v42WHo" value="259">4:19</page-anchor> (the video sets its _Strength_ to 1.5). It's still hard to get rid of the grey in the background <page-anchor target="#video-BKoH1v42WHo" value="275">4:35</page-anchor>.
    

Render on a transparent background
----------------------------------

1.  **Rename the backdrop.** <page-anchor target="#video-BKoH1v42WHo" value="279">4:39</page-anchor> Another way is to make the backdrop invisible in the render rather than deleting it. Select it and rename it from _Plane_ to _backdrop_ in the Outliner (double-click the name), so you'll recognize it later.
    
2.  **Make it a shadow catcher.** <page-anchor target="#video-BKoH1v42WHo" value="299">4:59</page-anchor> In its object properties, open _Visibility_ and check _Shadow Catcher_. A shadow catcher only renders the shadows that fall on it.
    
    ![The backdrop's object properties, Visibility panel: Show in Viewports, Show in Renders, Selectable and Shadow Catcher are checked, and a tooltip reads: Only render shadows on this object, for compositing renders into real footage.](files/framing-the-shot-and-finishing-in-photoshop-t0312.0.jpg)
    
    _Shadow Catcher_, in the object's _Visibility_ panel.
    
3.  **Turn on a transparent background.** <page-anchor target="#video-BKoH1v42WHo" value="314">5:14</page-anchor> In the render properties, under _Film_, check _Transparent_. Nothing is rendered behind the chair, just transparent pixels, and the shadow catcher captures the shadows on the floor. The white backdrop still reflects white light onto the chair and helps light it, so you get the best of both, and you can choose the background more carefully in Photoshop.
    
    ![The render properties: Sampling shows Render 70 and Viewport 32, and under Film, Exposure 1.00, Pixel Filter Blackman-Harris 1.50 px, and Transparent checked. The Outliner now lists the backdrop by name.](files/framing-the-shot-and-finishing-in-photoshop-t0330.8.jpg)
    
    _Transparent_, under _Film_ in the render properties.
    
4.  **Render.** <page-anchor target="#video-BKoH1v42WHo" value="371">6:11</page-anchor> The chair and its shadow render over a transparent, checkered background. On screen, the render settings show 250 samples again for this render.
    
    ![The render window, Slot 5, Time 03:41.00: the chair seen from the side, with its soft shadow on the floor, over a dark checkered background that shows transparency. The render settings show Render 250 and Film Transparent checked.](files/framing-the-shot-and-finishing-in-photoshop-t0372.0.jpg)
    
    The finished render: the chair and its shadow, with nothing behind them.
    
5.  **Save the image.** <page-anchor target="#video-BKoH1v42WHo" value="373">6:13</page-anchor> In the render window, choose _Image_ › _Save As_. The video saves it to the desktop as _chair-render-1.png_, a PNG with _RGBA_ colour so the transparency is kept. If you make several renders as you find things to fix, number them at the end of the name to keep them straight.
    

Finish it in Photoshop
----------------------

1.  **Put a white background behind it.** <page-anchor target="#video-BKoH1v42WHo" value="406">6:46</page-anchor> Open the image in Photoshop: there's one layer, with nothing behind it. Create a new layer with the plus icon at the bottom of the _Layers_ panel, drag it below the render and rename it "bg". Press Cmd Delete to fill it with the background colour, white <page-anchor target="#video-BKoH1v42WHo" value="436">7:16</page-anchor>. Now you can see the chair on a pure white background.
    
    ![Photoshop 2020 with chair-render-1.png open: the chair and its shadow on a white background. The Layers panel shows Layer 1 above a white layer named bg.](files/framing-the-shot-and-finishing-in-photoshop-t0444.4.jpg)
    
    A white "bg" layer under the render.
    
2.  **Boost the saturation.** <page-anchor target="#video-BKoH1v42WHo" value="451">7:31</page-anchor> The reference photo is much brighter and more saturated. Add a _Hue/Saturation_ adjustment layer with the adjustment-layer button at the bottom of the _Layers_ panel, and raise _Saturation_ a bit <page-anchor target="#video-BKoH1v42WHo" value="468">7:48</page-anchor>. Switch it on and off to compare, and don't overdo it.
    
3.  **Try Vibrance as well.** <page-anchor target="#video-BKoH1v42WHo" value="488">8:08</page-anchor> Another adjustment layer, _Vibrance_, can help: raise its _Vibrance_ and its _Saturation_. More advanced adjustments, such as _Curves_, give a more finely tuned result <page-anchor target="#video-BKoH1v42WHo" value="512">8:32</page-anchor>, but this doesn't have to be exact: what matters is a good render you're happy with. That's a really simple compositing workflow: add a background and adjust the colour.
    
    ![The Properties panel for a Vibrance adjustment layer, with Vibrance +46 and Saturation +36. The chair's wood is a richer orange. The Layers panel shows Vibrance 1 and Hue/Saturation 1 above Layer 1 and bg.](files/framing-the-shot-and-finishing-in-photoshop-t0508.0.jpg)
    
    _Vibrance_ above _Hue/Saturation_: the wood's colour is much richer.
    
4.  **Choose a background colour, if you like.** <page-anchor target="#video-BKoH1v42WHo" value="539">8:59</page-anchor> You can add a _Solid Color_ fill layer above "bg" in any colour you want. Keep in mind it won't look realistic: a blue background isn't reflecting blue light onto the chair, so it isn't really part of the scene, more like a collage. The shadows still give it some relationship to the ground.
    
    ![The Color Picker (Solid Color) is open with a blue, hex 0379b6, and the background behind the chair is blue. A Color Fill 1 layer sits between Layer 1 and bg.](files/framing-the-shot-and-finishing-in-photoshop-t0546.0.jpg)
    
    A blue background: possible, but the chair doesn't reflect it.
    
5.  **Or pull it just off white.** <page-anchor target="#video-BKoH1v42WHo" value="569">9:29</page-anchor> Add only a little colour to take the background off pure white. The video chooses a warmer, yellowy off-white: in the RGB values, where 255 is the highest, it's almost white but not quite (252, 250, 243).
    
    ![The finished composite in Photoshop: the chair, with richer colour and a soft shadow, on a warm off-white background. The Layers panel shows Vibrance 1, Hue/Saturation 1, Layer 1, Color Fill 1 and bg.](files/framing-the-shot-and-finishing-in-photoshop-t0622.0.jpg)
    
    The finished image on a warm off-white background.
    
6.  **Save it as a PNG.** <page-anchor target="#video-BKoH1v42WHo" value="606">10:06</page-anchor> Save a copy as a PNG (the video names it _chair-render-comp.png_). When you submit it, rename it to the file name the exercise asks for.
    

Wrap-up
-------

A focal length close to the one in your reference makes the render look like the photo; a backdrop near the chair catches more light; and a shadow catcher with a transparent background lets you choose the background later, keeping the shadows and the light the white backdrop reflects. In Photoshop, a background layer and a couple of adjustment layers finish the image. That completes lighting, rendering and a little colour grading of the Airline Chair.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-BKoH1v42WHo" value="0">0:00</page-anchor> So now I want to talk about camera settings. So we've learned how to set up lights and add a couple textures to enhance the quality of our surfaces for our materials. And so now I'm going to click on layout view here. and let's jump into material view just to make things go a little bit quicker for us. I'm going to select our camera by choosing this dotted outline. You could also choose it here in the outliner. Go down to camera settings and now let's adjust the focal length. So if I was to pull this to the left you can see I'm essentially getting a wide angle camera lens. So it gives you the corresponding millimeters. If I go in the other direction let's go to something like 80 type in 80 and you can see we're too close now it's sort of cropping cropping in but you know this might be a more pleasing type of camera focal length for us to use so i'm going to scroll out a bit and maybe just come down to a lower angle and just reposition this here if i click on this plus and drag I can sort of zoom in slowly give it a bit of space on the top and</p><p><page-anchor target="#video-BKoH1v42WHo" value="75">1:15</page-anchor> bottom just to center it here okay so that's that's not a bad composition for an object like this you could also think about doing a straight-on render of course we'd have to modify the position of our background or a render from the side. And if we jump back to our references, this is the original, this is going to be the render. And so there's is a wider lens. So ours is an 80 millimeter, and it's really kind of flattening this object out. So if I wanted to try to match this, I could just kind of guess what type of camera lens they have. So if I want to match these up, I could maybe change the position of my camera a bit. And because of the distance at the bottom, I know that I'm not using the same lens here. So let's go ahead and just maybe use a, let's try a 30, 35 millimeter lens.</p><p><page-anchor target="#video-BKoH1v42WHo" value="150">2:30</page-anchor> and let's just jump back into our reference. That looks pretty close. I bet they're using a 35mm lens to shoot this. So it's not going to be pixel perfect, but I can get a pretty close render here. So you can see my background is not facing the right direction. Let's just rotate that. Maybe zoom out a bit so it's actually not getting cropped. Okay, so our render completed, and you can see the background is a little bit dark. So I could try to fix that by adding another light to the scene and illuminating the background.</p><p><page-anchor target="#video-BKoH1v42WHo" value="198">3:18</page-anchor> Another thing I can do is actually bring the background closer so that the light is able to get to this background much more easily. So if I go ahead and just go to slot four to save that out to a different slot. Let's close this here. Okay, let's move the background closer, much closer. So this is more in line with what you would see in a photo studio. They don't have a huge space to work with. Typically, they have a room. And so this backdrop would be indeed much closer to the object. Okay, so let's go ahead and go to our settings, we want to do a quick render here.</p><p><page-anchor target="#video-BKoH1v42WHo" value="244">4:04</page-anchor> So let's go to sampling. I'm going to put that at 70, and this should render pretty quickly. Okay, I can see we're still getting a bit of gray. So another thing we can do is to turn up the sunlight a bit. Okay, so it looks like we're really struggling to get rid of that gray in the background. Another thing you can do is to remove the background entirely, not by deleting it, but by making it sort of invisible.</p><p><page-anchor target="#video-BKoH1v42WHo" value="287">4:47</page-anchor> If we go into the object properties for this backdrop, so I do have it selected here. it's just called plane in my outliner, so I'm going to call this backdrop just so I can remember it later. If we go down to the visibility option, if it's not open for you, you can just click on it and it will open up these other options. We can click this to shadow catcher, and what that will do is if we turn on another mode under film if you go to render properties here you can see there's a button called transparent if we turn that on it will make it so that we can render out nothing in the background transparent pixels and if this material is set to be only a shadow catcher when we go to render it should render out a transparent background but also capture these onto the surface.</p><p><page-anchor target="#video-BKoH1v42WHo" value="346">5:46</page-anchor> And one of the nice things about doing this is that background being white is also reflecting white light onto our object and helping illuminate it. So we're getting kind of the best of everything. But now we can control what that background is more carefully in a software like Photoshop. Okay, so now that this has finished rendering, I'm going to go to image, and then we're going to save this to our desktop. So I'm going to click Save As, and let's just go into, I'm going to just save this to the desktop for now, and I will call this, call this chair render, render one. And sometimes I do multiple renders as I find things that are wrong with them.</p><p><page-anchor target="#video-BKoH1v42WHo" value="399">6:39</page-anchor> So I just iterate the name at the end and it helps me keep things straight. So let's go ahead and save that out. Okay, so I've gone and opened that image up in Photoshop. And so what you can see We have a layer and there's just nothing behind it. So I'm going to create a new layer by clicking on the plus icon. Let's drag that down. I'm going to rename this to BG for background. And I'm going to do command delete on the keyboard. And that will paint white into the background.</p><p><page-anchor target="#video-BKoH1v42WHo" value="443">7:23</page-anchor> And so now we can kind of see what's happening now with our background. Sort of this perfect pure white background. Okay, so let's look at the reference image. is much brighter and more saturated so I'm going to add a hue saturation adjustment layer here and so if we just go to saturation and bump this up a bit now you can see it's really starting to saturate these colors so let's just jump back here back and forth okay maybe a bit more saturated not too much that might be a little bit too much but we can also try another adjustment layer that's getting much better but if we want to maybe try vibrance that could help maybe just saturation on here as well there's more advanced color filters for instance curves are going to give you a much more fine tuned result but I think for our purposes we don't have to be exact this is pretty close</p><p><page-anchor target="#video-BKoH1v42WHo" value="523">8:43</page-anchor> and as long as it's a good render that we're happy with that's all that matters So I think I'm going to call this one done, but essentially this is a really simple compositing workflow that includes adding a background and adjusting the color. Of course, if you want to, you could go ahead and we can add a solid color adjustment layer and you could add any color you want. Just keep in mind, it's not really going to be realistic because it's not reflecting this blue light onto our object. And so it's really not a part of the scene anymore. like, you know, if you collaged this onto a colored background, but you are getting the shadows, so it does have a little bit of a relationship to this ground.</p><p><page-anchor target="#video-BKoH1v42WHo" value="569">9:29</page-anchor> You could also just add a little bit of color if you want. Something like this, just to pull it off of white, pure white, just a bit. I might do all around a kind of warmer yellowy color. We can go over here. Yeah. Okay, so it's just barely off-white. You can see here in the RGB channels, 255 is the highest. So we're almost at white, but not quite. And so that is good. I'm going to go ahead and save this out. and I'm going to export this as a PNG, call this chair render comp and save this out to the desktop it's when you go ahead and submit this there's going to be a file name that you want to rename that to okay so that's going to be it for lighting rendering and setting up materials and doing a little bit of color grading in Photoshop</p></div></a11y-collapse>