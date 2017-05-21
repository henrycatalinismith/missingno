const selector = '.tweet .content .AdaptiveMedia img';
const images = document.querySelectorAll(selector)

Array.from(images).map(image => {
  const div = document.createElement('div');
  div.classList.add('missingno-annotation');
  div.innerHTML = image.alt;
  div.title = image.alt;

  image.parentElement.appendChild(div);
})
