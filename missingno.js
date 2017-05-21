const addAnotations = () => {
  const selector = '.tweet .AdaptiveMedia img';
  const images = document.querySelectorAll(selector)

  Array.from(images)
    .filter(image => !image.getAttribute('data-missingno-annotated'))
    .map(image => {
      image.setAttribute('data-missingno-annotated', true);

      if (image.alt === '') {
        return;
      }

      const div = document.createElement('div');
      div.classList.add('missingno-annotation');
      div.innerHTML = image.alt;
      div.title = image.alt;
      image.parentElement.appendChild(div);
    });
}

const observer = new MutationObserver(mutations => {
  mutations.forEach(() => addAnotations());
});

const config = {
  attributes: true,
  childList: true,
  characterData: false,
  subtree: true,
};

observer.observe(document.body, config);
