
const createImageElement = (url) => {
  const image = document.createElement("img");
  const imageContainer = document.createElement("div");
  image.style.width = "400px"; // Placeholder width is changed when intersection callback is invoked.
  image.style.height = "300px";
  image.setAttribute("data-src", url); //Custom attribute to enable lazy loading.
  image.className = "image";
  imageContainer.appendChild(image);

  return imageContainer;
};

export default createImageElement;
