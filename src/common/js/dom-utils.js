const HTML_ELEMENT = document.getElementsByTagName('html')[0];

function noScroll(classname = 'no--scroll') {
  HTML_ELEMENT.classList.add(classname);
}

function scroll(classname = 'no--scroll') {
  HTML_ELEMENT.classList.remove(classname);
}

export { noScroll, scroll };
