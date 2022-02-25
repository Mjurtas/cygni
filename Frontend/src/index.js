import "./main.css";
import useIntersectionObserver from "./useIntersectionObserver.js";
import createImageElement from "./components/image.js";
import { createSearchTag, createAddTag, createClearCacheTag } from "./components/tags.js";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "./urls.js";
import createError from "./components/error.js";

let tags = ["star_wars"];
let PAGE_NUMBER = 1;

// set correct url to backend depending on buildstatus
const IS_PRODUCTION = process.env.NODE_ENV === "production";
const API_URL = IS_PRODUCTION ? PROD_SERVER_URL : DEV_SERVER_URL;

console.log(
  `Welcome to nv90. You are running in ${process.env.NODE_ENV} mode. Server url is ${API_URL}`
);

/** Handler for lazy loading scrolling
 *  * @param {Node[]} entries List of nodes to observe
 */
const handleImageIntersection = (entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    if (entry.isIntersecting) {
      entry.target.src = entry.target.getAttribute("data-src");
      entry.target.style.width = "100%";
      imageObserver.unobserve(entry.target);
    }
  });
};

/** Handler for infinite scrolling
 * @param {Node[]} entries List of nodes to observe
 */
const handleScrollIntersection = (entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    if (entry.isIntersecting) {
      // Fetch next page
      PAGE_NUMBER++;
      scrollObserver.unobserve(entry.target);

      // Debouncer for preventing massive scrolling
      setTimeout(() => {
        initGallery();
      }, 600);
    }
  });
};

/** Handler for deleting searchtag and rerender images
 * @param {any} target The pressed tag to remove
 */
const handleDeleteTag = (index) => {
  tags.splice(index, 1);
  resetGallery();
};

/** Handler for adding searchtag and rerender images
 * @param {string} tagName Title of  the added tag.
 */
const handleAddTag = (tagName) => {
  const tag = tagName.replace(" ", "_").toLowerCase();
  if (tag === null || tag.length === 0) {
    return;
  }
  // Cant add same tag twice.
  if (!tags.includes(tag)) {
    tags.push(tag);
    resetGallery();
  }
};

const handleClearCache = () => {
  localStorage.clear();
  resetGallery();
};
/**
 * Retrieve IntersectionObservers using custom hook.
 */
const imageObserver = useIntersectionObserver(handleImageIntersection, {
  threshold: 0.2,
  rootMargin: "100px",
});

const scrollObserver = useIntersectionObserver(handleScrollIntersection, {
  rootMargin: "100px",
});

/*
Add observers to all images and scrollsensor to enable lazyloading and infinite scrolling
*/
const addObservers = () => {
  const image = document.querySelectorAll(".image");
  const scrollSensor = document.querySelector(".scroll__sensor");
  image.forEach((img) => {
    imageObserver.observe(img);
  });
  scrollObserver.observe(scrollSensor);
};

/**
 * Async call to Flickr API to getimages according to tags.
 */
const initGallery = async () => {
  const cacheKey = `${tags.join(",")}_${PAGE_NUMBER}`;
  let imageUrls = [];
  if (localStorage.getItem(cacheKey)) {
    imageUrls = localStorage.getItem(cacheKey).split(",");
  } else {
    try {
      imageUrls = await fetchImagesFromFlickr();
      if (!imageUrls || !imageUrls.length > 0) {
        showError({ message: "No results. Try another tag." });
        return;
      }
    } catch (error) {
      showError(error);
      return; // If error thrown
    }

    localStorage.setItem(cacheKey, imageUrls.join(","));
  }
  renderImages(imageUrls);
};

const renderImages = (imageUrls) => {
  const galleryContainer = document.querySelector(".gallery__image__container");
  const scrollSensor = document.querySelector(".scroll__sensor");
  scrollSensor.classList.toggle("show");

  imageUrls.forEach((url) => {
    galleryContainer.appendChild(createImageElement(url));
  });
  // When asynchronously added all img-elements, add observers to them.
  addObservers();
};

const fetchImagesFromFlickr = async () => {
  return await fetch(
    `${API_URL}${
      tags.length > 0 ? encodeURI(tags.join(",")) : "*"
    }&${PAGE_NUMBER}`
  )
    .then((response) => {
      if (response.status > 299 || response.status < 200) {
        return response.json().then((body) => {
          throw new Error(
            `Error with code: ${response.status}. \n MSG: ${body.message} `
          );
        });
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

/**
 * Renders all the tags used in the query.
 * @param {String[]} tags
 */
const renderSearchTags = () => {
  const tagContainer = document.querySelector(".search__tags__container");
  tagContainer.innerHTML = "";

  tags.forEach((tag, index) => {
    const searchTag = createSearchTag(tag, index, handleDeleteTag);
    tagContainer.appendChild(searchTag);
  });

  const addNewTag = createAddTag(handleAddTag);
  const clearCacheTag = createClearCacheTag(handleClearCache);
  tagContainer.appendChild(addNewTag);
  tagContainer.appendChild(clearCacheTag);
};

//Empties the gallery and refetches the images.
const resetGallery = () => {
  const galleryContainer = document.querySelector(".gallery__image__container");
  galleryContainer.innerHTML = "";
  PAGE_NUMBER = 1;
  initGallery();
  renderSearchTags();
};

/** If fetch returns some error, render errormessage.
 * @param {Response} response
 */
const showError = (response) => {
  const galleryContainer = document.querySelector(".gallery__image__container");
  galleryContainer.innerHTML = "";
  const error = createError(response);
  galleryContainer.appendChild(error);
};

const handleOnLoad = () => {
  PAGE_NUMBER = 1;
  // Firefox doesnt scroll automatically to top on reload
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };
  initGallery();
  renderSearchTags();
};

/**
 * Sets up all required eventlisteners
 */

const setupEventListeners = () => {
  document.addEventListener("load", handleOnLoad());
};
setupEventListeners();
