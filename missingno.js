// Add an anotation as a sibling to an image element
const addAnotation = (image) => {
  // Create an element to display the alt text
  const div = document.createElement('div');
  div.classList.add('missingno-annotation');
  div.innerHTML = image.alt;
  div.title = image.alt;
  image.parentElement.appendChild(div);
}

// What elements are we looking for? Special images
const imgSelectors = [
  '.tweet .AdaptiveMedia img'
];


const observer = new MutationObserver(mutations => {
  mutations.forEach(() => addAnotations());
});

const config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};

observer.observe(document.body, config);
