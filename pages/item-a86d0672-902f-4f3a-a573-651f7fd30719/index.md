Seams tell Blender where to cut a model's surface so it can lie flat as a UV layout. In this part you'll mark seams on one side of the Airline Chair, unwrap it, then lay its inner and outer faces on top of each other so a single texture covers both, and arrange the pieces neatly for painting in Photoshop. You'll need the side from your chair with its scale applied (Part 2). The video uses Blender 2.83.

Mark the seams
--------------

1.  **Look at the seams.** <page-anchor target="#video-3_2ciHv-zAQ" value="2">0:02</page-anchor> Select the side and press Tab to go into Edit Mode. The red edges are seams, already marked in the video. They're easy to mark yourself: to start again, select everything and choose _UV → Clear Seam_ <page-anchor target="#video-3_2ciHv-zAQ" value="16">0:16</page-anchor>.
    
    ![The chair's side, Plane.001, in Edit Mode with Edge select on: a C-shaped piece covered in a fine mesh, with red seam lines running along both edges of its narrow outer strip.](files/marking-seams-and-unwrapping-t0010.8.jpg)
    
    The side's seams, in red, run along both edges of its narrow strip.
    
2.  **Select the edge loops for the seams.** <page-anchor target="#video-3_2ciHv-zAQ" value="25">0:25</page-anchor> In Edge select mode, hold Alt+Shift and click an edge to add its whole loop to the selection. Select the loop along each edge of the narrow strip, where it meets the flat faces of the side.
    
    ![Close-up of the side's narrow strip in Edit Mode with a long edge loop selected along one edge. An on-screen note reads Alt + Shift + left mouse to select edge loops.](files/marking-seams-and-unwrapping-t0031.8.jpg)
    
    Alt+Shift+click selects a whole edge loop.
    
3.  **Check that they match.** <page-anchor target="#video-3_2ciHv-zAQ" value="31">0:31</page-anchor> Look at the strip straight on (the video uses _Front Orthographic_) to check the two loops are symmetrical. In the video one was off by one loop, so it was reselected <page-anchor target="#video-3_2ciHv-zAQ" value="39">0:39</page-anchor>.
    
4.  **Mark them as seams.** <page-anchor target="#video-3_2ciHv-zAQ" value="45">0:45</page-anchor> Choose _UV → Mark Seam_. Deselect, and the loops show red: they're marked <page-anchor target="#video-3_2ciHv-zAQ" value="48">0:48</page-anchor>.
    
    ![Front Orthographic view of the narrow strip, with the UV menu open in the 3D Viewport header and Mark Seam highlighted, just above Clear Seam.](files/marking-seams-and-unwrapping-t0047.5.jpg)
    
    _UV → Mark Seam_.
    
5.  **Cut the strip into shorter pieces.** <page-anchor target="#video-3_2ciHv-zAQ" value="52">0:52</page-anchor> Mark a few seams across the narrow strip too, so its UV islands are shorter <page-anchor target="#video-3_2ciHv-zAQ" value="98">1:38</page-anchor>. To select a row of edges across it, click the first edge, then Ctrl+click the last: Blender selects the edges in between (the video did it the hard way, one edge at a time). If you need to get closer, select an edge and use _View → Frame Selected_ <page-anchor target="#video-3_2ciHv-zAQ" value="102">1:42</page-anchor>. Mark each with _UV → Mark Seam_.
    
    ![Close-up of the narrow strip where it widens, with the two long red seams running down it and a few edges selected across it. An on-screen note reads: to select a range of edges, choose the first edge, then Ctrl + left mouse the last edge. I did this the hard way.](files/marking-seams-and-unwrapping-t0070.8.jpg)
    
    Selecting a row of edges across the strip.
    
6.  **Put one on the bottom.** <page-anchor target="#video-3_2ciHv-zAQ" value="121">2:01</page-anchor> Mark a couple more, including one underneath. Nobody will see the bottom, so it doesn't need much space for texture in the UV layout. Then _UV → Mark Seam_ <page-anchor target="#video-3_2ciHv-zAQ" value="144">2:24</page-anchor>.
    

Unwrap the side
---------------

1.  **Unwrap it.** <page-anchor target="#video-3_2ciHv-zAQ" value="149">2:29</page-anchor> Press A to select everything and choose _UV → Unwrap_. On a dense mesh it takes a moment to calculate. In the _UV Editing_ workspace, the side's inner and outer faces now lie side by side as two C shapes, with the strip in pieces beside them.
    
    ![UV Editing workspace. In the UV Editor on the left, the unwrapped side shows as two orange C shapes side by side, with thin strips along the top and right edge. On the right, the whole side is selected in the 3D Viewport.](files/marking-seams-and-unwrapping-t0161.8.jpg)
    
    The unwrapped side: two faces, each a C shape, and the strip in pieces.
    

Stack the two faces
-------------------

1.  **Select the strip's faces.** <page-anchor target="#video-3_2ciHv-zAQ" value="161">2:41</page-anchor> The inner and outer faces of the side have the same shape, so you can map them over the top of each other. Switch to Face select mode, and in a view where you can see the strip, select its face loops (Alt+Shift+click): everything between the marked edges, and nothing else <page-anchor target="#video-3_2ciHv-zAQ" value="207">3:27</page-anchor>. The video does this in the _Layout_ workspace <page-anchor target="#video-3_2ciHv-zAQ" value="188">3:08</page-anchor>.
    
    ![Layout workspace, Edit Mode with Face select on: all the faces of the side's narrow outer strip are selected in orange, while the two large flat faces are not.](files/marking-seams-and-unwrapping-t0225.0.jpg)
    
    Only the strip, the faces between the seams, is selected.
    
2.  **Invert the selection.** <page-anchor target="#video-3_2ciHv-zAQ" value="221">3:41</page-anchor> Choose _Select → Invert_. Now just the two flat faces of the side are selected <page-anchor target="#video-3_2ciHv-zAQ" value="231">3:51</page-anchor>.
    
3.  **Project them from the side view.** <page-anchor target="#video-3_2ciHv-zAQ" value="234">3:54</page-anchor> Go to the side view (_Right Orthographic_) and choose _UV → Project From View_. Both faces get the same shape, seen straight on, laid on top of each other.
    
    ![Right Orthographic view: the side's flat faces are selected in orange, seen straight on as a C shape. The Project From View panel is open at the bottom left, with Correct Aspect ticked.](files/marking-seams-and-unwrapping-t0240.8.jpg)
    
    _Project From View_ in the side view.
    

Arrange the layout
------------------

1.  **See all the UVs.** <page-anchor target="#video-3_2ciHv-zAQ" value="243">4:03</page-anchor> Open the _UV Editing_ workspace again. Move the projected faces out of the way, then press A in the 3D Viewport to see the UVs from the first unwrap as well. The two faces are now stacked on top of each other <page-anchor target="#video-3_2ciHv-zAQ" value="249">4:09</page-anchor>.
    
    ![The UV Editor showing all of the side's UVs in the square: the projected side as a single C shape, the strip's pieces as striped bars across the top, and a long strip selected in orange down the right edge.](files/marking-seams-and-unwrapping-t0256.0.jpg)
    
    All the islands, with the two faces stacked as one C shape.
    
2.  **Move the islands into place.** <page-anchor target="#video-3_2ciHv-zAQ" value="252">4:12</page-anchor> Select an island, press Ctrl+L to select everything linked to it (the video uses Cmd+L on a Mac), and move it with G. Put the strips along the top and the small piece in the middle <page-anchor target="#video-3_2ciHv-zAQ" value="266">4:26</page-anchor>. Rotate pieces with R (the video rotates some 90°) and scale them with S <page-anchor target="#video-3_2ciHv-zAQ" value="274">4:34</page-anchor>. G then X or Y keeps a move along one axis <page-anchor target="#video-3_2ciHv-zAQ" value="324">5:24</page-anchor>.
    
3.  **Leave a little space.** <page-anchor target="#video-3_2ciHv-zAQ" value="291">4:51</page-anchor> The pieces can be tightly packed, but a little space between them makes them easier to work on in Photoshop.
    
4.  **Fill the square and save.** <page-anchor target="#video-3_2ciHv-zAQ" value="333">5:33</page-anchor> Make sure every piece is inside the square, then scale the side up to fill as much of it as you can without going over <page-anchor target="#video-3_2ciHv-zAQ" value="340">5:40</page-anchor>. Save the file <page-anchor target="#video-3_2ciHv-zAQ" value="352">5:52</page-anchor>.
    
    ![The finished UV layout in the UV Editor: the side's C shape, selected in orange, fills most of the square, the strip's pieces are lined up in rows across the top, and a small piece sits in the middle. A Resize panel shows a scale of 0.968.](files/marking-seams-and-unwrapping-t0355.0.jpg)
    
    The finished layout: the side fills the square, the strips run across the top.
    

Wrap-up
-------

You've marked seams along and across the side, unwrapped it, and projected its two flat faces on top of each other, so one texture maps to both sides of the piece <page-anchor target="#video-3_2ciHv-zAQ" value="358">5:58</page-anchor>. With the islands spaced out inside the square, the layout is ready to take into Photoshop, which is the next step.

<a11y-collapse heading-button=""><p slot="heading">Transcript</p><div slot="content"><p><em>From speech to text.</em></p><p><page-anchor target="#video-3_2ciHv-zAQ" value="2">0:02</page-anchor> Ok now I'm going to show you how to mark seams so you can make unwrapping your UV layout much easier. So if we tab in here you can see there are red edges that I have pre-marked. These are pretty easy to mark. For instance if we clear these out all you would have to do is if we clear the seams select your edge loops that you want to mark. So I'm going to shift select those and I will shift select those. Let's just double check that those are symmetrically selected here. And it looks like I'm off by one. So let's grab this edge loop and this edge loop.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="43">0:43</page-anchor> And those should be the same. We can come up here to UV mark seam. And now you'll see that if we deselect, those are marked. So I would recommend for this object that you mark a seam here and also here. Okay, that looks good there.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="96">1:36</page-anchor> And we're going to mark it in a few other places. And this is to make our UV eye lens a little bit shorter. So if we select that and do frame selected, we can get a little bit closer here. Let's just mark this one. and we're going to do mark. Okay, and a couple more places. We're going to do one here. Since we're not going to see the bottom, we don't need to give it much space on our UV layout for texture information. Okay, UV, mark seam, and that should be it.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="149">2:29</page-anchor> So now all we have to do is press A and go to UV unwrap, and it will take a minute to do all the calculations. Okay, one of the things that we can do is try to map these to be over top of each other. one of the ways we can accomplish that is by selecting just faces here and faces here in order to do that I'm going to go into this view here and I'm going to select just these let's go to face mode go to layout Okay.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="200">3:20</page-anchor> Face mode. And we're going to select all these edge loops here. Careful to just select these. So we're selecting everything in between those marked edges. And so all that leaves is now the side faces. So if we were to invert this selection, go to select invert. Now we have just the faces selected that we need. So if we go to this view and do UV project from view, open up our UV editor again.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="243">4:03</page-anchor> We're just going to move these down here. And if we press A, we can see the existing UVs that we unwrapped earlier. And now these are stacked on top of each other. So I'm going to select these, press command L, and we're going to move these over. And these we're going to move up. This I'm going to move probably in the middle here. And these we can actually scale. So let's rotate 90. Scale that up. Okay.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="291">4:51</page-anchor> And they're tightly packed, but I just want a little bit of space for it to be easier in Photoshop to work on these. So let's move those a little bit apart. And these we can now scale up. Okay, and actually if we rotate these 90. Okay, G and Y will, or G and X will constrain this to the axis. And let's just make sure that they're in and they are. Okay, and now we can maybe scale this a little bit larger.</p><p><page-anchor target="#video-3_2ciHv-zAQ" value="352">5:52</page-anchor> A little too big. Let's bring that down. That's pretty good. All right. Let's save our file. So this is going to be a good UV layout. We can get just one texture to map to both sides of this piece here okay and and the next step we will look at taking this into Photoshop</p></div></a11y-collapse>