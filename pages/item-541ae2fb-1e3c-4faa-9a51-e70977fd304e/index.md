An animatic is a rough version of your animation, made early so you can check the story, the cameras and the timing against the sound before you spend time on models, materials and final renders. This series makes one in Blender: it sets up cameras and scenes, renders the shots quickly from the viewport, edits them together with sound in After Effects, and later swaps the animatic's footage for rendered footage. In this part you'll watch the finished example so you know what you're aiming for. There's nothing to do in Blender yet.

Watch the animatic
------------------

1.  **Start with the title.** <page-anchor target="#video-yr4h9_ww9D4" value="30">0:30</page-anchor> The animatic is a simple 20-second animation, "Alien's Best Friend". It opens on a title screen.
    
    ![The animatic playing in a video player over Blender: the title Alien's Best Friend in large pink letters on black, with a purple beam of light coming down behind it.](files/the-finished-animatic-t0030.0.jpg)
    
    The title screen.
    
2.  **Follow the story through its shots.** <page-anchor target="#video-yr4h9_ww9D4" value="45">0:45</page-anchor> A dog runs out onto a dock, a spaceship comes down and beams the dog up, then zooms off into the distance. A couple of trees move as it leaves, then there's a final shot. The shots come from different cameras in the Blender scene: the text burned into each frame names the camera.
    
    ![A wide shot from the animatic in flat, pale colors: a pink spaceship over a pine forest, a cabin, a dock and a red canoe by a lake. Text burned into the frame gives the Blender file, date, render time, timecode, frame 048, the camera, cam-2-wide, and the scene.](files/the-finished-animatic-t0033.8.jpg)
    
    A wide shot, from the camera cam-2-wide.
    
    ![A closer shot from the animatic, from the camera cam-3: the dog, a low-poly model in flat pink, rises inside a translucent purple beam above the end of the dock.](files/the-finished-animatic-t0035.5.jpg)
    
    The dog being beamed up, from a closer camera.
    
3.  **End with the credits and listen to the sound.** <page-anchor target="#video-yr4h9_ww9D4" value="78">1:18</page-anchor> The credits pop up and fade out. The sound was edited together in After Effects <page-anchor target="#video-yr4h9_ww9D4" value="81">1:21</page-anchor>.
    
    ![The end of the animatic: white text on black reading Credits, IE - Animation by Michael Collins.](files/the-finished-animatic-t0085.0.jpg)
    
    The credits, the last thing in the animatic.
    

Compare it with the EEVEE render
--------------------------------

1.  **Watch the same shots rendered.** <page-anchor target="#video-yr4h9_ww9D4" value="89">1:29</page-anchor> The animatic is a viewport render, a quick render of what Blender's viewport shows. The second video is the same animation with higher-quality renders made with the EEVEE render engine: the scene now has night lighting, lit windows in the cabin and reflections in the lake.
    
    ![The EEVEE render of the wide shot at night: a glowing pink spaceship over dark green pines, a cabin with lit windows and a porch light, and the dock and canoe by a blue lake.](files/the-finished-animatic-t0120.8.jpg)
    
    The wide shot rendered in EEVEE.
    
2.  **Notice what's still rough.** <page-anchor target="#video-yr4h9_ww9D4" value="132">2:12</page-anchor> These are better renders of the animatic's frames, with no cleanup of the animation. The dog has no armature and doesn't move its legs: it slides along like a statue, just to show where the character ends up and how fast it moves. The spaceship's animation could stay as it is, but the trees could be smoother, and the dog needs an armature so it walks or runs <page-anchor target="#video-yr4h9_ww9D4" value="157">2:37</page-anchor>.
    
    ![The EEVEE render of the final shot: the dog stands on the end of the dock under a full moon, beside a red canoe, with pines on the right and their reflections in the lake.](files/the-finished-animatic-t0176.8.jpg)
    
    The final shot. The dog is a single static model, moved as a whole.
    

<page-anchor target="#video-yr4h9_ww9D4" value="178">2:58</page-anchor> Next, you'll set up the animatic's project file in Blender. For your own animatic, start from your storyboard: the shots, what happens in each, and roughly how long each one lasts.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-yr4h9_ww9D4" value="0">0:00</page-anchor> Ok, in this series of tutorials we're going to look at how to create an animatic, how to use After Effects to do some editing, add sound, and we're going to look at setting up cameras inside of Blender, and setting up different scenes, and eventually replacing the animatic footage with rendered footage. So let's get started. I'm going to show you the animatic that we're going to create here. Okay, so as you can see, this is a really simple 20-second animation.</p><p><page-anchor target="#video-yr4h9_ww9D4" value="49">0:49</page-anchor> I have sort of an intro title screen here, and then I have an animation of sort of this dog running out onto a dock and then a spaceship coming down beaming up the dog and then kind of zooming off into the distance you can see there's a couple trees moving as it leaves the area and then kind of this final shot here and then I have some credits pop up and fade out I also have some sound that I've edited together using After Effects as well. And then I'm going to just show you another video that is the same thing but with a bit higher quality renders using EEVEE rather than the Viewport Render which is what we use to make that animatic there.</p><p><page-anchor target="#video-yr4h9_ww9D4" value="104">1:44</page-anchor> Let's just play this one. Okay, so a few things to note that I didn't mention. So because this is really just a slightly higher quality render of the frames that I used for the animatic, I didn't do any additional cleanup on the animation. So it's still pretty rough. since the dog has no armature and doesn't move. And that's essentially just to kind of illustrate where the character is going to end up and how fast it's going to be moving, things like that.</p><p><page-anchor target="#video-yr4h9_ww9D4" value="157">2:37</page-anchor> The only thing I think I'm really happy with animation-wise is the spaceship, so I probably wouldn't change that, but I might go in and adjust the trees to be a bit smoother and put an armature on the dog character here. So it's actually walking or running instead of just kind of sliding like a statue. Okay, so next let's look at how we can jump into Blender and set up our animatic project file.</p></div></a11y-collapse>