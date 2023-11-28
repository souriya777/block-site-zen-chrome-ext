function observeVisibleElement(elementToObserve, elementToSwitchClass, theClass, threshold) {
  if (!elementToSwitchClass) {
    return;
  }

  const OBSERVER = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting === true) {
        elementToSwitchClass.classList.add(theClass);
      } else {
        elementToSwitchClass.classList.remove(theClass);
      }
    },
    { threshold: [threshold] },
  );

  OBSERVER.observe(elementToObserve);
}

export { observeVisibleElement };
