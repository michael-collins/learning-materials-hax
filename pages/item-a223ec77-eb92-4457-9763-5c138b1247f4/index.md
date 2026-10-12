In this part you'll give the side of the Airline Chair a real wood texture, taken from a photo of the chair itself. You'll cut the side out of the photo, paste it into the UV layout in Photoshop, warp and patch it until it fits the UVs, and bring it into Blender, then give the edge banding a wood texture of its own. You'll need the UV layout file and the material from Part 4, and a photo of the chair or any wood texture you like. The video uses Blender 2.83 and Photoshop 2020.

Bring the photo into the UV layout
----------------------------------

1.  **Choose a texture.** <page-anchor target="#video-gFglq5aaW1w" value="0">0:00</page-anchor> The video uses the chair's reference photos, opened in Photoshop, to be faithful to the original design <page-anchor target="#video-gFglq5aaW1w" value="30">0:30</page-anchor>. You don't have to: you can use any texture you want, for example one from a texture website. There's no prescribed or recommended texture.
    
2.  **Cut out the side.** <page-anchor target="#video-gFglq5aaW1w" value="37">0:37</page-anchor> With the _Lasso_ tool, select the side of the chair in the photo and copy it (Cmd+C).
    
    ![Photoshop with a side-on photo of the Airline Chair: a loose lasso selection, shown as marching ants, runs around the wooden side, from the arm's rounded front end down to the end of the leg.](files/texturing-the-side-from-a-photo-t0058.8.jpg)
    
    The side selected with the _Lasso_ tool.
    
3.  **Paste it into the UV layout.** <page-anchor target="#video-gFglq5aaW1w" value="57">0:57</page-anchor> In your UV layout file, delete the test layers you no longer need, turn the uv layer back on <page-anchor target="#video-gFglq5aaW1w" value="64">1:04</page-anchor> and paste (Cmd+V).
    
4.  **Scale it up and line it up.** <page-anchor target="#video-gFglq5aaW1w" value="73">1:13</page-anchor> The photo is fairly low resolution, and you should always work with the highest-resolution textures you can get, but scaled up it's good enough here. Line it up with the side's UVs as closely as you can <page-anchor target="#video-gFglq5aaW1w" value="84">1:24</page-anchor>.
    
    ![The UV layout in Photoshop with the pasted photo of the side being scaled up in a Free Transform box. The photo's side is starting to cover the C-shaped wireframe of the side's UVs.](files/texturing-the-side-from-a-photo-t0090.0.jpg)
    
    Scaling the photo up over the side's UVs.
    

Fit it to the UVs
-----------------

1.  **Fade and lock the UV layer.** <page-anchor target="#video-gFglq5aaW1w" value="93">1:33</page-anchor> To make it easier to adjust the edges, lower the uv layer's opacity <page-anchor target="#video-gFglq5aaW1w" value="104">1:44</page-anchor> and lock the layer with the lock icon in the _Layers_ panel <page-anchor target="#video-gFglq5aaW1w" value="111">1:51</page-anchor>.
    
    ![Close-up of the top corner of the side in Photoshop: the photo's wood shows through a faint wireframe of the UVs. In the Layers panel, the uv layer has a lock icon and its opacity is lowered.](files/texturing-the-side-from-a-photo-t0115.8.jpg)
    
    The uv layer, faded and locked, over the photo.
    
2.  **Warp the edges into place.** <page-anchor target="#video-gFglq5aaW1w" value="127">2:07</page-anchor> Select the photo's layer, press Cmd+T for Free Transform and choose _Edit → Transform → Warp_ <page-anchor target="#video-gFglq5aaW1w" value="133">2:13</page-anchor>. To work on just one area, such as the top corner, click a _Split_ button in the options bar and click to split the warp there <page-anchor target="#video-gFglq5aaW1w" value="146">2:26</page-anchor>; then drag inside that region to move it <page-anchor target="#video-gFglq5aaW1w" value="149">2:29</page-anchor>. Look around for other areas that aren't quite staying inside the lines <page-anchor target="#video-gFglq5aaW1w" value="168">2:48</page-anchor>.
    
    ![The top corner of the side in Photoshop with a warp grid over the photo: split lines cross at the inside of the corner, and the options bar shows Split buttons and Warp: Custom.](files/texturing-the-side-from-a-photo-t0153.8.jpg)
    
    A split warp grid, to move just the top corner.
    
3.  **Clean it up with the Patch tool.** <page-anchor target="#video-gFglq5aaW1w" value="235">3:55</page-anchor> Duplicate the layer and hide the copy first <page-anchor target="#video-gFglq5aaW1w" value="244">4:04</page-anchor>. Then turn off the uv layer and use the _Clone Stamp_ or _Patch_ tool (the video uses Patch) to get rid of extra information, such as the parts of the photo that cross in front of the side <page-anchor target="#video-gFglq5aaW1w" value="249">4:09</page-anchor>. It doesn't need to be perfect, as long as it looks right where the UVs are <page-anchor target="#video-gFglq5aaW1w" value="291">4:51</page-anchor>.
    
    ![Close-up of the side's front leg in Photoshop with the Patch tool active: two wavy selections on the wood, one dragged below the other, cover the place where the brace crossed the leg. The Layers panel shows a hidden Layer 3 copy.](files/texturing-the-side-from-a-photo-t0270.4.jpg)
    
    Patching out the brace where it crosses the side.
    
4.  **Line up the joints.** <page-anchor target="#video-gFglq5aaW1w" value="337">5:37</page-anchor> Check that joins in the wood land where they should on the UVs. In the video, the joint where the leg meets the upright sits too low, so the leg is selected in the texture and moved up until the joint lines up with the inside corner of the UVs <page-anchor target="#video-gFglq5aaW1w" value="372">6:12</page-anchor>.
    
5.  **Remove the bracket.** <page-anchor target="#video-gFglq5aaW1w" value="388">6:28</page-anchor> Patch out the metal bracket at the back end of the arm too. If the patch comes out too bright, undo and try again <page-anchor target="#video-gFglq5aaW1w" value="426">7:06</page-anchor>.
    
    ![Close-up of the rounded back end of the arm in Photoshop, with a patch selection drawn around the small grey metal bracket where the brace meets the wood.](files/texturing-the-side-from-a-photo-t0400.8.jpg)
    
    Selecting the bracket to patch it out.
    

Put it on the model
-------------------

1.  **Export and reload.** <page-anchor target="#video-gFglq5aaW1w" value="445">7:25</page-anchor> Save, then export a PNG with the uv layer hidden, overwriting your color.png <page-anchor target="#video-gFglq5aaW1w" value="454">7:34</page-anchor>. In Blender's _Shading_ workspace, reload the image by picking it again on the _Image Texture_ node <page-anchor target="#video-gFglq5aaW1w" value="466">7:46</page-anchor>. The texture shows on the side in the viewport; the parts you haven't textured yet still use the white material <page-anchor target="#video-gFglq5aaW1w" value="480">8:00</page-anchor>.
    
    ![The Shading workspace: the side in the viewport now has the photo's warm, orange-brown wood on its face, with pale, untextured edges. Below, the color.png Image Texture node feeds the Principled BSDF's Base Color.](files/texturing-the-side-from-a-photo-t0476.4.jpg)
    
    The photo's wood on the side, through the same _Image Texture_ node.
    

Texture the edge banding
------------------------

1.  **Repeat it for the strips.** <page-anchor target="#video-gFglq5aaW1w" value="492">8:12</page-anchor> Repeat the process to texture the rest of the side <page-anchor target="#video-gFglq5aaW1w" value="499">8:19</page-anchor>. The video gives the edge banding, including the inside corner, a more general wood texture so it contrasts with the side's wood <page-anchor target="#video-gFglq5aaW1w" value="508">8:28</page-anchor>. Hide the uv layer, export the PNG over color.png again <page-anchor target="#video-gFglq5aaW1w" value="522">8:42</page-anchor> and reload it in Blender <page-anchor target="#video-gFglq5aaW1w" value="534">8:54</page-anchor>.
    
    ![The UV layout in Photoshop with all of the side's islands filled: the photo's wood on the C shape, and a darker, even wood texture across the strips at the top and on the small piece in the middle. The Layers panel adds Layer 4 and a Hue/Saturation adjustment.](files/texturing-the-side-from-a-photo-t0510.4.jpg)
    
    A separate wood texture for the edge banding.
    
2.  **Check the result.** <page-anchor target="#video-gFglq5aaW1w" value="541">9:01</page-anchor> The wood texture now covers the banding too. Some highlights from the original photo are baked into the texture, so you might clean those up so the seam isn't as jarring <page-anchor target="#video-gFglq5aaW1w" value="547">9:07</page-anchor>.
    
    ![Both of the chair's sides in the Shading workspace's viewport, fully textured: warm wood on the faces and slightly different wood on the edges.](files/texturing-the-side-from-a-photo-t0562.4.jpg)
    
    Both sides, with wood on the faces and the banding.
    

Wrap-up
-------

That's the basic workflow: take the UVs into Photoshop, fit a texture to them, and bring it back into Blender to preview on the mesh <page-anchor target="#video-gFglq5aaW1w" value="553">9:13</page-anchor>. Follow the same process to unwrap and texture each of the chair's other parts.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-gFglq5aaW1w" value="0">0:00</page-anchor> Ok, so here I've opened the reference images up inside of Photoshop and this isn't a Photoshop class but we will be using Photoshop here to get the texture information from the reference on to the original UV layout and you don't have to do this you can use any texture you want you can go for instance to a texture website and I'll provide links to that and grab you know really anything you want there there's no um prescribed or recommended texture i'm just going to use this to try to be faithful to the original object's design so with my lasso tool i'm just going to select this object, copy, go to our UV layout here. And I'm going to delete these since I don't really need them. And let's turn our UVs back on and just go ahead and paste that in.</p><p><page-anchor target="#video-gFglq5aaW1w" value="73">1:13</page-anchor> so unfortunately this texture is fairly low resolution you always want to work with the highest resolution textures that you can get I think it's fine we'll just scale it up and it will be good enough for our purposes so you can see here I'm just essentially lining this up as much as I can okay and now I'm going to go and adjust the edges to try to get them to fit correctly So I think what's going to make this easier for me is to lower the opacity of the UVs. And we will actually lock this layer with the lock icon here.</p><p><page-anchor target="#video-gFglq5aaW1w" value="127">2:07</page-anchor> I'm going to use the warp tool to try to warp this texture into place. So if I press command T to go into transform mode and I go to edit transform warp that brings up my warp tools and I am going to try to target warping just this top corner. So by clicking on split, I can click here and now if I just grab inside of this region, I can just move this down. Look around for other areas that are not quite staying in the lines here.</p><p><page-anchor target="#video-gFglq5aaW1w" value="235">3:55</page-anchor> Okay, so now that I've adjusted the position of this texture, I can do a clone tool to get rid of some of this extra information. Before I do that, I want to duplicate this layer and we'll hide it. The easiest way is to actually disable UVs and use either the clone stamp tool or one to us. I like using the patch tool. And it doesn't matter necessarily that we're not making this look perfect, as long as it looks okay where the UVs match up.</p><p><page-anchor target="#video-gFglq5aaW1w" value="301">5:01</page-anchor> Okay, so that looks good. We might want to adjust this as well. There we go. Okay, I think this seam may need to be higher on our UV map here, because we want the seam to be here and right now it's down here so let's see what we can do to change that okay and now we have the seam lining up with that corner there</p><p><page-anchor target="#video-gFglq5aaW1w" value="381">6:21</page-anchor> this looks good here and let's just remove this bracket Okay, we're getting a little bit too bright here, so let's try this again.</p><p><page-anchor target="#video-gFglq5aaW1w" value="443">7:23</page-anchor> That might be okay. So let's save this. And let's see what it looks like on our model. So save, export, PNG. And I'm going to overwrite my color PNG image. and let's just reload that texture. So go to shading view. We'll just pick it again. And now we have our texture here in the 3D viewport. You can see that the other parts of our model that we didn't yet texture are still using that white material.</p><p><page-anchor target="#video-gFglq5aaW1w" value="492">8:12</page-anchor> Let's go to layout view. Now I'm going to repeat this process so I can texture the rest of our object and the other parts of our chair that we have in our scene. So now I've done some work to get the texture information to also apply to the edge banding, including that inside corner. and I just used a more general wood texture for this so it would have some contrast to the side wood texture. Disable UVs, file, export. Export is paying. Let's overwrite the color PNG. Back in Blender, we will reload this.</p><p><page-anchor target="#video-gFglq5aaW1w" value="541">9:01</page-anchor> and now you can see our wood texture is also applied to the banding. Now some of the highlights from the original image are kind of baked in here so I might go in and clean that up a little bit so that the seam is not quite as jarring. So that kind of covers the basic workflow of getting your UVs into Photoshop, applying a texture and importing it back into Blender so that you can preview it on your mesh. Go ahead and follow this process to UV unwrap and texture the other objects for the chair and I will supply some textures to help you along in that process.</p></div></a11y-collapse>