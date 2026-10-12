To give the Airline Chair textures and materials that match the photo, you first lay out its UVs. Before that, every object's scale should be reset to 1, or textures can come out stretched. In this short part you'll open the UV Editing workspace, see how a checker texture shows the problem, and apply the scale of each piece of the chair. You'll need your modeled chair. The video uses Blender 2.83.

Look at the UVs
---------------

1.  **Switch to the UV Editing workspace.** <page-anchor target="#video-egWgHYmKwww" value="1">0:01</page-anchor> The tabs along the top of Blender are workspaces: default layouts set up for different workflows. A texturing workflow starts in _UV Editing_ <page-anchor target="#video-egWgHYmKwww" value="26">0:26</page-anchor>, which shows the _UV Editor_ on the left and the 3D Viewport on the right.
    
    ![Blender in the Layout workspace with the smooth, grey Airline Chair in the viewport. The pointer is on the workspace tabs along the top (Layout, Modeling, Sculpting, UV Editing, Texture Paint, Shading and more), and a tooltip reads Active workspace showing in the window.](files/applying-scale-t0022.4.jpg)
    
    The workspace tabs: each is a layout for a different workflow.
    
2.  **Check the chair with a checker texture.** <page-anchor target="#video-egWgHYmKwww" value="41">0:41</page-anchor> Press Tab to go back to Object Mode and select all the objects. The video has already given them a texture that shows a checker pattern <page-anchor target="#video-egWgHYmKwww" value="50">0:50</page-anchor>, and it isn't spread evenly: some squares are really large, and others are very thin and stretched <page-anchor target="#video-egWgHYmKwww" value="66">1:06</page-anchor>.
    
    ![Close-up of the selected chair in Material Preview. The arms are covered in thin, stretched stripes of light and dark grey, while the cushions show a few very large light and dark patches.](files/applying-scale-t0065.0.jpg)
    
    A checker texture that's stretched and uneven across the chair.
    
3.  **See where the UVs came from.** <page-anchor target="#video-egWgHYmKwww" value="74">1:14</page-anchor> The main reason is that the UVs haven't been laid out yet. Select the side and press Tab: its UVs in the _UV Editor_ are still those of the plane you started modeling from, and the chair is far more complex than a plane <page-anchor target="#video-egWgHYmKwww" value="86">1:26</page-anchor>.
    
    ![UV Editing workspace. On the right, the chair's side is selected in Edit Mode, outlined in orange. On the left, the UV Editor shows its UVs as one square divided only by a few horizontal lines, the layout of the original plane.](files/applying-scale-t0084.4.jpg)
    
    The side's UVs are still a flat plane's.
    

Apply the scale
---------------

1.  **Check each object's scale.** <page-anchor target="#video-egWgHYmKwww" value="90">1:30</page-anchor> Before you lay out the UVs, make sure each object's scale is 1. Press Tab to go back to Object Mode and open the Sidebar in the 3D Viewport (N): _Scale_ is on its _Item_ tab. Click through the objects one at a time. On the side it's already 1, but the seat has an X scale that's been changed <page-anchor target="#video-egWgHYmKwww" value="104">1:44</page-anchor>.
    
2.  **Apply the scale.** <page-anchor target="#video-egWgHYmKwww" value="109">1:49</page-anchor> Press Ctrl+A and choose _Scale_ from the _Apply_ menu. That resets the scale to 1 without changing the object's size. Don't type 1 into the _Scale_ fields: that actually scales the object rather than resetting it <page-anchor target="#video-egWgHYmKwww" value="113">1:53</page-anchor>.
    
    ![The seat is selected, and the Sidebar shows its Scale X as 0.974 with Y and Z at 1.000. The Apply menu is open over the viewport with Scale highlighted, above All Transforms and Rotation and Scale. A key overlay shows Ctrl A.](files/applying-scale-t0110.0.jpg)
    
    Ctrl+A → _Scale_ on the seat, whose X scale is 0.974.
    
    ![The same view after applying: the seat's Scale reads 1.000 on X, Y and Z, its dimensions are unchanged, and an Apply Object Transform panel has appeared at the bottom of the viewport.](files/applying-scale-t0111.8.jpg)
    
    After applying, the scale is 1 and the seat is the same size.
    
3.  **Do the same for every piece.** <page-anchor target="#video-egWgHYmKwww" value="123">2:03</page-anchor> Go through the rest of the chair and apply the scale wherever it isn't 1. In the video, most of the objects hadn't had their scale applied, so check them all, including the small brackets <page-anchor target="#video-egWgHYmKwww" value="139">2:19</page-anchor>.
    

Wrap-up
-------

Applying the scale doesn't fix the stretched checker by itself, but it means the textures won't be stretched once you lay out the UVs <page-anchor target="#video-egWgHYmKwww" value="149">2:29</page-anchor>. Reset your transforms, especially the scale, as much as you can before you texture. Next, you'll unfold the chair's UVs.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-egWgHYmKwww" value="1">0:01</page-anchor> Let's look at how we can apply a texture and different materials to match the original photo of this chair. If we look at the top, you can see that there are different tabs and these tabs correspond to default layouts that Blender has set up. And this just makes working with different workflows more efficient. When we first start a texturing workflow, we need to actually work in a UV editing mode here. And so this is going to bring up on the left an editor for the UVs. And on the right is just our 3D viewport.</p><p><page-anchor target="#video-egWgHYmKwww" value="41">0:41</page-anchor> So I'm going to tab out of that object and put an object mode. You see nothing is selected here until we go in and select all of our objects here. I've gone ahead and set up a texture that just shows a checker pattern. and what we can see is that this checkered texture is not being evenly applied across the polygonal objects. There's sort of a really large checkered square here and over here. It's very thin and sort of stretched. This can happen for a couple reasons. The main reason is we haven't actually laid out our UVs yet. So if I press tab, we can see that our UVs on the left are from the original plane that we started modeling from.</p><p><page-anchor target="#video-egWgHYmKwww" value="86">1:26</page-anchor> And obviously this object is far more complex than a plane. So what we want to do is first check to see that our scale of our objects. I'm going to tab out here and just open up this menu. Make sure that our scale is set to one. And so it is on these. So let me just go and check the other ones. Looks like we have an X scale here that's been adjusted. and apply our scale. And you can see that resets it to one. Don't type one in here. You'll actually scale your object rather than reset it. So let's do control A for this. Reset that to one. These are looking okay. Let's go down here. Looks like these need to be applied. And the same with these, this object as well. So most of our objects had not had the scale applied. So let's just reset that one. And looks like just a couple more here. Make sure we get these other brackets.</p><p><page-anchor target="#video-egWgHYmKwww" value="149">2:29</page-anchor> These are correct. All right. So that didn't necessarily fix anything, but that just means that when we do fix the textures that they're not stretched at all. So you want to go ahead and reset your transforms, especially the scale, as much as you can.</p></div></a11y-collapse>