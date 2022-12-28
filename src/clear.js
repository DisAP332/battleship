function clearGameWrapper(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export { clearGameWrapper };
