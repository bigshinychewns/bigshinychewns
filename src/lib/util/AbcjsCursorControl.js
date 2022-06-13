export default function AbcCursorControl(renderArea) {
  const self = this;
  self.cursor = null;

  self.onStart = () => {
    renderArea.style.scrollBehavior = 'smooth';
    const svg = renderArea.querySelector('svg');
    this.cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.cursor.setAttribute("class", "abcjs-cursor");
    this.cursor.setAttributeNS(null, 'x1', '0');
    this.cursor.setAttributeNS(null, 'y1', '0');
    this.cursor.setAttributeNS(null, 'x2', '0');
    this.cursor.setAttributeNS(null, 'y2', '0');
    svg.appendChild(this.cursor);
  };
  self.beatSubdivisions = 1;
  self.onEvent = (event) => {
    if (event.measureStart && event.left === null) {
      return;
    }
    const lastSelection = renderArea.querySelectorAll('.highlight');
    for (let selection of lastSelection) {
      selection.classList.remove('highlight');
    }

    for (let note of event.elements) {
      for (let element of note) {
        element.classList.add('highlight');
      }
    }

    if (this.cursor) {
      this.cursor.setAttribute('x1', `${event.left - 2}`);
      this.cursor.setAttribute('x2', `${event.left - 2}`);
      this.cursor.setAttribute('y1', `${event.top}`);
      this.cursor.setAttribute('y2', `${event.top + event.height}`);
    }
  };
  self.onFinshed = () => {
    const highlights = renderArea.querySelectorAll('.highlight');
    for (let highlight of highlights) {
      highlight.classList.remove('highlight');
    }
    if (this.cursor) {
      this.cursor.setAttribute("x1", '0');
      this.cursor.setAttribute("x2", '0');
      this.cursor.setAttribute("y1", '0');
      this.cursor.setAttribute("y2", '0');
    }
  };
  self.lineEndAnticipation = 100;
  self.onLineEnd = ({ milliseconds, top, bottom }) => {
    renderArea.scrollTop = top;
  };
}
