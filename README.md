# nv90 - not a part of Accenture...yet.

![Logotype](./nv90-logo.png)

**nv90** is my take on the provided assignment from Cygni, Malmö.
It's a website that basically mimics [Flickr](www.flickr.com) by using its API and displays photos in a gallery-ish manner.

**Star Wars** is added on default as a tag, due to some...explicit content when performing a general search. It's possible to remove this of course.

**Want to check it out immediately?**

Public Client URL - https://nv90-client.herokuapp.com/

Public Server URL - https://nv90-server.herokuapp.com/

Why nv90? [This is why.](https://www.google.se/maps/place/Cygni+Syd/@55.6066366,12.99353,17z/data=!3m1!4b1!4m5!3m4!1s0x4653a329ca757dc3:0xf3379b29cb6695ec!8m2!3d55.6066624!4d12.9956981)

# **Features**

Implements lazy loading of images with the help of JavaScripts `IntersectionObserver`. In addition, infinite scrolling is enabled with help of the same interface. Great stuff.

## **Whats new in version 2.0?**

- Added bundling via webpack, minifying and automated lintning upon building.
- Added basic caching via `localStorage`. Not ideal in the long run, but sufficient for now.
- Deployed to Heroku to easily check out the client.

## **Test**

Very basic front end testing is implemented with [Cypress](cypress.io). It currently only tests the tag functionality.

# **Get started**

**IMPORTANT!**

A secret api-key is required in dev-mode and is provided the **email**. 

When running server in `dev (localhost:3000)` Add the key to `./Backend/.env` to API_KEY=<the provided key\>

The contents in the `./Backend/.env`-file should look something like this:

`BASE_URL=https://www.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1`  

`API_KEY=1a2b3c4d5e6f`




## Please note the directories.

| In directory | Action                                                | Command             |
| ------------ | ----------------------------------------------------- | ------------------- |
| ./Cygni      | Install dependencies for back- and frontend           | `npm run setup`     |
| ./Cygni      | Start dev server                                      | `npm run devServer` |
| ./Cygni      | Bundles and open webapp in devmode to default browser | `npm run devClient` |
---------------------------------------------------------------------------------------------------
## Other commands
| In directory | Action                                                | Command             |
| ------------ | ----------------------------------------------------- | ------------------- |
| ./Frontend   | Creates production ready build.                       | `npm run build`     |
| ./Frontend   | Start test w [Cypress](cypress.io)                    | `npm run test`      |

## **Tags**

To search for photos with a specific "tag" - simply type in what tag you would like to filter on and press **Enter**. and the gallery will be updated. Cool? Cool.

---

Author: Mårten Bendroth **marten.bendroth@gmail.com**
