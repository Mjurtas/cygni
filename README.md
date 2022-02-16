# nv90 - not a part of Accenture...yet.
![Logotype](./nv90-logo.png)

**nv90** is my take on the provided assignment from Cygni, Malmö.
It's a website that basically mimics [Flickr](www.flickr.com) by using its API and displays photos in a gallery-ish manner.

**Star Wars** is added on default as a tag, due to some...explicit content when performing a general search. It's possible to remove this of course.



Why nv90? [This is why.](https://www.google.se/maps/place/Cygni+Syd/@55.6066366,12.99353,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a329ca757dc3:0xf3379b29cb6695ec!8m2!3d55.6066624!4d12.9956981)

# **Features**

Implements lazy loading of images with the help of JavaScripts `IntersectionObserver`. In addition, infinite scrolling is enabled with help of the same interface. Great stuff.

## **Test**
Very basic front end testing is implemented with [Cypress](cypress.io). It currently only tests the tag functionality.



# **Get started**

First of all, run `npm install` in both `./Backend` aswell as in `./Frontend` directory to ensure you have installed latest versions of the required packages, 


| In directory   |Action                      	 |Command                       |
|----------------|-------------------------------|-----------------------------|
|./Backend		 |Start backend					 |`npm run server.js`
|./Frontend		 |Start test w [Cypress](cypress.io)|`npm run test`        |

## **Tags**

To search for photos with a specific "tag" - simply type in what tag you would like to filter on and press **Enter**. and the gallery will be updated. Cool? Cool.

____
Author: Mårten Bendroth **marten.bendroth@gmail.com**