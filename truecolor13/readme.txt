TrueColor provides a web interface to the oftenly available GD2 graphic library in PHP4.

GD2 supports truecolor image creation, enabling manipulation of hi-res JPEG images.
It can open GIF, PNG and JPG images for editing, output deafults to 24-bits JPEG of user 
definable output quality/size.

The dragable DHTML toolbars provides an easy and intuitive interface to image manipulation and
file management functions.
Image cropping for instance is a visual drag-and-resize operation.

Uniquely named temporary image files help avoid web browser caching.
After creation, these images are immediately available for further editing 
or can be saved by renaming them.
Editing sessions can be concluded by removal of all created temporary files.

Testing shows that once this 'edit result' mechanism is comprehendend even novice users find 
TrueColor easy to work with and fun to use.

File management includes directory browsing, creation and deletion.

Because of these functions and the simple one file installation TrueColor easily runs as module to 
almost any other PHP based web system.

It already succesfully replaces numerous image uploaders of content management systems.

TrueColor was tested on standard shared PHP hosting using various functions on digital camera 
images up to 1600 x 1200 pixels without performance issues or complaints about extreme server load.

Version 1.3 release note: besides file upload, now also copying of remote images is supported

******************************************** Requirements *****************************************

TrueColor was tested on PHP 4.3.3 with GD 2 bundled and freetype enabled.
Non-bundled versions seem to have problems with the imagerotate().

******************************************* Installation ******************************************

Rename the php file according to your PHP version. 

PHP 4.3.0 has a bug in truecolor truetype text, so this version merges a palette image with text in it.

Just drop the file in any directory, it can be renamed.

Open the script file and change the configuration part (starts at line # 26):

* Assign an image subdirectory (default is 'images/')
* Assign an truetype font subdirectory, this can be a full path
* Define maximum size for memory intensive functions
* Maximum upload filesize, defaults to 1.5 MB

Make sure that the images directory is writable!

******************************************* Licensing *********************************************
TrueColor is freeware: free for private non-commercial use. It is not free for public use, modification or copyright removal.
If you would like a customized version (like TrueColor MyImage) for on your website please contact Allayers.com.
These services can either be hosted by us remotely or by your own PHP supporting server. 
URL:   http://truecolor.allayers.com
email: truecolor@allayers.com

Omly some limited TrueType fonts without copywrite notice are included. 
Please install additional TTF fonts according to your needs.

******************************************** Copyright Notice **************************************

Copyright Paul Barends 2003,2004 - email: paulbarends@allayers.com