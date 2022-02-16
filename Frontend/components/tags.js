const createSearchTag = (tag, index, onDelete) => {
  const searchTag = document.createElement("button");
  const deleteIcon = document.createElement("i");
  const title = document.createElement("p");

  deleteIcon.className = "bi bi-x";
  searchTag.className = "button__basic search__tag";
  title.textContent += tag.replace("_", " ");

  searchTag.appendChild(title);
  searchTag.appendChild(deleteIcon);

  searchTag.addEventListener("click", (event) => {
    searchTag.style.display = "none";
    onDelete(index);
  });

  return searchTag;
};

const createAddTag = (onSubmit) => {
  const addNewTag = document.createElement("div");
  const tagIcon = document.createElement("i");
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Add tag..";
  input.className = "add__new__tag__input";

  tagIcon.className = "bi bi-tag";
  addNewTag.className = "button__basic search__tag add__new__tag";
  addNewTag.appendChild(tagIcon);
  addNewTag.appendChild(input);
  input.addEventListener(
    "blur",
    (event) => event.target.value.length > 0 && onSubmit(event.target.value)
  );

  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.target.value.length > 0 && onSubmit(event.target.value);
    }
  });

  return addNewTag;
};

export { createSearchTag, createAddTag };
