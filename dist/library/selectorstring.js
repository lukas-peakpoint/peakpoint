// library/selectorstring.ts
function getSelectorStringForError(element) {
  return `${element.tagName}${element.id ? "#" + element.id : ""}${element.className ? "." + element.className.replace(" ", ".") : ""}`;
}
export {
  getSelectorStringForError as default
};
