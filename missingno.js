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
  '.tweet .AdaptiveMedia img',
  '.Gallery-media img.media-image'
];

const callback = (mutations) => {
  mutations.forEach(record => {
    // We're only interested in the nodes that were added by this mutationRecord
    const elements = Array.from(record.addedNodes)
      // We only care about nodes that are also Elements (nodeType 1)
      .filter(node => node.nodeType === 1);

    // Use imgSelectors to create an array of images we can add annotations to
    const targetImgs = [];
    imgSelectors.forEach(selector => {
      elements.forEach(element => {
        // If element is an <img>, we can't use querySelectorAll on it,
        if (element.tagName === 'IMG') {
          // so we just add it directly to targetImgs
          targetImgs.push(element);
        } else {
          Array.from(element.querySelectorAll(selector))
            .forEach(selectedElem => {
              targetImgs.push(selectedElem);
            });
        };
      });
    });
    targetImgs
      // Filter out images without alt text
      .filter(image => image.alt !== '')
      // Filter out emoji images which do have alt text, but we don't want them
      .filter(image => !Array.from(image.classList).includes('Emoji'))
      // Finally add the annotation!
      .forEach(addAnotation);
  });
};

const config = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
};

// We want to target the observer to specific parts of the DOM tree
// So we need more than one observer
const targets = [
  // Main page content container
  document.querySelector('#doc'),
  // Permalink content container
  document.querySelector('#permalink-overlay'),
  // Gallery view
  document.querySelector('.Gallery.with-tweet')
];

targets.forEach(target => {
  const observer = new MutationObserver(callback);
  observer.observe(target, config);
});
