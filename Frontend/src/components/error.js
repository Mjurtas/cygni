const createError = (err) => {
  const scrollSensor = document.querySelector(".scroll__sensor");
  scrollSensor.classList.remove("show"); // Hide scrollsensor if error;

  const errorContainer = document.createElement("div");
  const header = document.createElement("h1");
  const msg = document.createElement("h6");

  errorContainer.className = "error__container";

  header.className = "error__header";
  header.textContent = "Nope.";

  msg.className = "error__message";

  msg.textContent = err.message;

  errorContainer.appendChild(header);
  errorContainer.appendChild(msg);

  return errorContainer;
};

export default createError;
