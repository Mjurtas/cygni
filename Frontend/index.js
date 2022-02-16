import useIntersectionObserver from "./useIntersectionObserver.js";
import createImageElement from "./components/image.js";
import { createSearchTag, createAddTag } from "./components/tags.js";
import createError from "./components/error.js";

let tags = ["star_wars"];
let PAGE_NUMBER = 1;

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
    if (entry.isIntersecting) {
      // Fetch next page
      PAGE_NUMBER++;
      getImages();
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

const imageObserver = useIntersectionObserver(handleImageIntersection, {
  threshold: 0.2,
  rootMargin: "100px",
});

const scrollObserver = useIntersectionObserver(handleScrollIntersection, {
  rootMargin: "200px",
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
const getImages = async () => {
  const galleryContainer = document.querySelector(".container");
  const scrollSensor = document.querySelector(".scroll__sensor");
  scrollSensor.classList.toggle("show");

  await fetch(
    `http://localhost:3000/` +
      new URLSearchParams({
        tags: tags.length > 0 ? encodeURI(tags.join(",")) : "*",
        page: PAGE_NUMBER,
      }).toString()
  )
    .then((response) => {
      if (!response.ok) {
        showError(response);
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((url) => {
        galleryContainer.appendChild(createImageElement(url));
      });
      // When asynchronously added all img-elements, add observers to them.
      addObservers();
    })
    .catch((err) => {
      console.log(err);
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
  tagContainer.appendChild(addNewTag);
};

//Empties the gallery and refetches the images.
const resetGallery = () => {
  const galleryContainer = document.querySelector(".container");
  galleryContainer.innerHTML = "";
  getImages();
  renderSearchTags();
};

/** If server doesnt respond, render errormessage.
 * @param {Response} response
 */
const showError = (response) => {
  const galleryContainer = document.querySelector(".container");
  galleryContainer.innerHTML = "";

  const error = createError(response);

  galleryContainer.appendChild(error);
};



const handleOnLoad = () => {
  PAGE_NUMBER = 1;

  // Firefox doesnt scroll automatically to top on reload
  document.location = "#";
  getImages();
  renderSearchTags();
};

/**
 * Sets up all required eventlisteners
 */
 const setupEventListeners = () => {
  document.addEventListener("load", handleOnLoad());
};
setupEventListeners();
