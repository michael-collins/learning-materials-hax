Before you model the Airline Chair, designed by Kem Weber in the 1930s, you need a picture of it to model from. In this short part you'll bring a side photo of the chair into Blender as a background image, lined up with the side view, and stop it being selectable so you can't move it by accident while you work. You'll need Blender (the video uses Blender 2.83) and the side reference image linked in the exercise.

Add the reference image
-----------------------

1.  **Start with an empty scene.** <page-anchor target="#video-qlVWEhwTxU0" value="0">0:00</page-anchor> The reference is a photo of the chair from the side, slightly turned, with the whole frame visible: arms, back, seat and runners. In a new Blender file, select the default cube and press X to delete it <page-anchor target="#video-qlVWEhwTxU0" value="32">0:32</page-anchor>.
    
2.  **Switch to the side view.** <page-anchor target="#video-qlVWEhwTxU0" value="45">0:45</page-anchor> Before adding the image, look straight along the X axis: click the _X_ on the navigation gizmo at the top right of the viewport (its shortcut is Numpad 3). The viewport's label changes to _Right Orthographic_. The image is added facing the view you're in, so this matters.
    
3.  **Add it as a background image.** <page-anchor target="#video-qlVWEhwTxU0" value="50">0:50</page-anchor> Choose _Add → Image → Background_.
    
    ![Blender's Add menu open in the Right Orthographic view, with Image highlighted and its submenu showing Reference, Background and Images as Planes; the pointer is on Background.](files/setting-up-the-reference-image-t0053.0.jpg)
    
    Add → Image → Background, in the Right Orthographic view.
    
4.  **Choose the photo.** <page-anchor target="#video-qlVWEhwTxU0" value="55">0:55</page-anchor> In the file browser, find the reference image and click _Load Background Image_. To get to its folder quickly, you can drag the file from the Finder into the file browser <page-anchor target="#video-qlVWEhwTxU0" value="56">0:56</page-anchor>.
    
    ![Blender's file browser open at a references folder holding two JPEG photos, with the second, 244191_5cd7e8666b5a9bfe_b.jpg, in the file name field and the Load Background Image button at the bottom right. A Finder window beside it shows the same folder.](files/setting-up-the-reference-image-t0058.0.jpg)
    
    Load the side photo from wherever you saved it.
    

Lock the reference
------------------

1.  **Show the selectable toggle in the Outliner.** <page-anchor target="#video-qlVWEhwTxU0" value="60">1:00</page-anchor> The image is an object like any other, so it's easy to click and move it by accident while you model. Open the _Filter_ menu at the top of the Outliner and, under _Restriction Toggles_, turn on the arrow icon, which controls whether an object can be selected <page-anchor target="#video-qlVWEhwTxU0" value="66">1:06</page-anchor>.
    
    ![The chair photo sits small in the middle of the Right Orthographic view. At the top right, the Outliner's Filter menu is open; under Restriction Toggles, the arrow icon for selecting is turned on next to the eye.](files/setting-up-the-reference-image-t0068.8.jpg)
    
    The Outliner's Filter menu, with the selectable (arrow) toggle turned on.
    
2.  **Make the image unselectable and name it.** <page-anchor target="#video-qlVWEhwTxU0" value="70">1:10</page-anchor> In the Outliner, click the image's arrow icon to turn it off. Rename it, from Empty to ref, so you know what it is later <page-anchor target="#video-qlVWEhwTxU0" value="73">1:13</page-anchor>. Now clicking the image in the viewport doesn't select it.
    
    ![The Outliner lists Camera, Light and ref. Camera and Light have a white arrow and an eye beside them; ref's arrow is greyed out. The Object Properties show ref at location 0, 0, 0 with rotation X 90 degrees and Z 90 degrees.](files/setting-up-the-reference-image-t0076.4.jpg)
    
    The reference renamed ref, with its arrow turned off so it can't be selected.
    
3.  **See it only from the side.** <page-anchor target="#video-qlVWEhwTxU0" value="87">1:27</page-anchor> Orbit away from the side view and the image disappears; go back to _Right Orthographic_ and it's there again <page-anchor target="#video-qlVWEhwTxU0" value="93">1:33</page-anchor>. That's helpful: the photo only shows where it lines up with the model, and stays out of the way when you look at the chair from other angles. Zoom in so the photo fills the view, ready to model over.
    
    ![Back in the Right Orthographic view, zoomed in so the side photo of the Airline Chair fills most of the viewport, with the Y axis running through the arms and the Z axis down the middle of the seat.](files/setting-up-the-reference-image-t0100.4.jpg)
    
    Ready to model: the reference lined up with the side view.
    

Wrap-up
-------

The chair's side photo is now in your scene as a background image, facing the side view, named ref and locked against selection. It only shows when you look along the X axis, which is the view you'll model the side of the chair in next.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-qlVWEhwTxU0" value="0">0:00</page-anchor> Okay, so here we are in Blender and we are going to make the Airline Chair by Kem Weber and so what we will do is use a side reference image that I've also linked in the assignment to base the model on. so what we need to do is get this image inside of blender so that we can start modeling from it and to do that we will uh let's just delete this cube so press x and delete i'm going to go to object sorry add image and then we're going to choose background but before we choose that we want to be in our X orthographic view here. So just go to add and we're going to put background and I'm going to drop this in so that it just navigates quickly to that image and here it is.</p><p><page-anchor target="#video-qlVWEhwTxU0" value="63">1:03</page-anchor> I am going to make it non-editable or selectable by adding a selection filter here in our outliner. so I'm going to just turn that off. I'm going to rename this ref so I can remember what it is later and now you can see that we can't actually select that object so that just makes it harder to screw it up accidentally while we're modeling. One of the things you'll notice is that if we go off of the orthogonal view on the x-axis it disappears and that's actually really helpful so that the you</p></div></a11y-collapse>