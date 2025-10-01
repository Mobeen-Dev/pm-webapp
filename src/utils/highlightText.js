// utils/highlightText.js or highlightText.ts if using TypeScript

export function highlightText(searchTerm) {
  if (!searchTerm) return;

  const walkDOM = (node) => {
    if (node.nodeType === 3) {
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      if (regex.test(node.nodeValue)) {
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(regex, '<mark>$1</mark>');
        node.parentNode.replaceChild(span, node);
      }
    } else if (
      node.nodeType === 1 &&
      node.tagName !== 'SCRIPT' &&
      node.tagName !== 'STYLE' &&
      !node.classList.contains('no-highlight')
    ) {
      Array.from(node.childNodes).forEach(walkDOM);
    }
  };

  // Optional: remove previous highlights first
  document.querySelectorAll('mark').forEach((el) => {
    const parent = el.parentNode;
    parent.replaceChild(document.createTextNode(el.textContent), el);
    parent.normalize();
  });

  walkDOM(document.body);
  console.log("QOOQ")
}
