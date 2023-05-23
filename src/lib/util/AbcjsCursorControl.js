export default function AbcCursorControl(renderArea) {
	const self = this;
	self.cursor = null;

	self.onStart = () => {
		renderArea.style.scrollBehavior = 'smooth';
		const svg = renderArea.querySelector('svg');
		if (self.cursor) {
			self.cursor.parentNode.removeChild(self.cursor);
			self.cursor = null;
		}
		self.cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
		self.cursor.setAttribute("class", "abcjs-cursor");
		self.cursor.setAttributeNS(null, 'x1', '0');
		self.cursor.setAttributeNS(null, 'y1', '0');
		self.cursor.setAttributeNS(null, 'x2', '0');
		self.cursor.setAttributeNS(null, 'y2', '0');
		svg.appendChild(self.cursor);
	};
	self.beatSubdivisions = 2;
	self.onEvent = (event) => {
		if (event.measureStart && event.left === null) {
			// return;
		}
		const lastSelection = renderArea.querySelectorAll('.highlight');
		for (let selection of lastSelection) {
			selection.classList.remove('highlight');
		}

		for (let note of event.elements) {
			for (let element of note) {
				// This seems to have stopped working for tabs, manually find tab stuff:
				const selector = Array.from(element.classList).map(c => `.${c}`).join('');
				const matchingElems = renderArea.querySelectorAll(selector);
				for (let matchingElem of matchingElems) {
					matchingElem.classList.add('highlight');
				}
			}
		}

		if (self.cursor) {
			self.cursor.setAttribute('x1', `${event.left - 2}`);
			self.cursor.setAttribute('x2', `${event.left - 2}`);
			self.cursor.setAttribute('y1', `${event.top}`);
			self.cursor.setAttribute('y2', `${event.top + event.height}`);
		}
	};
	self.onFinshed = () => {
		const highlights = renderArea.querySelectorAll('.highlight');
		for (let highlight of highlights) {
			highlight.classList.remove('highlight');
		}
		if (self.cursor) {
			self.cursor.parentNode.removeChild(self.cursor);
			self.cursor = null;
		}
	};
	self.lineEndAnticipation = 100;
	self.onLineEnd = ({ milliseconds, top, bottom }) => {
		renderArea.scrollTop = top;
	};
}
