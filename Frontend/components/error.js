const createError = (response) => {
  const errorContainer = document.createElement("div");
  const header = document.createElement("h1");
  const msg = document.createElement("h6");

  errorContainer.className = "error__container";

  header.className = "error__header";
  header.textContent = "Nope.";

  msg.className = "error__message";

  msg.textContent = `An error of ${
    response && response.status ? response.status : "with an unknown code"
  } was thrown`;

  errorContainer.appendChild(header);
  errorContainer.appendChild(msg);

  return errorContainer;
};

export default createError;
