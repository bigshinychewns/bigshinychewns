import ABCjs from 'abcjs';
import audioContextStore from '$lib/util/audioContextStore';
import { writable } from 'svelte/store';
import {
	action,
	createMachine,
	invoke,
	state,
	state as final,
	interpret,
	transition
} from '$lib/util/robot3';

/**
 * @callback FsmUpdater
 * @param {any} newFsm
 */

/**
 * @callback DestroyFunction
 */

/**
 * @param {HTMLElement} element
 * @param {object} options
 * @param {string} options.abc
 * @param {FsmUpdater} options.updateFsm
 * @param {number} options.qpm
 * @param {boolean} options.expanded
 * @param {string} options.controlsSelector
 * @returns {{update: FsmUpdater, destroy: DestroyFunction}}
 */
export default function abcjsCanvas (element, options) {
	let synth = null;
	let synthControl = null;
	let abcObj = null;
	let cursor = null;
	let timer = null;
	let unsubscribe = () => {};

	const initializeSynth = async (element, abcObj, audioContext, options) => {
		if (ABCjs.synth.supportsAudio()) {
			const audioParams = {
				audioContext: audioContext,
				visualObj: abcObj,
				// options: {
				// 	onEnded: () => { console.log('Playback has stopped??') }
				// }
			};

			synth = new ABCjs.synth.CreateSynth();
			await synth.init(audioParams);

			// **************Timing Callbacks**************
			const svg = element.querySelector('svg');
			if (cursor) {
				cursor.parentNode.removeChild(cursor);
				cursor = null;
			}
			cursor = document.createElementNS("http://www.w3.org/2000/svg", "line");
			cursor.setAttribute("class", "abcjs-cursor");
			cursor.setAttributeNS(null, 'x1', '0');
			cursor.setAttributeNS(null, 'y1', '0');
			cursor.setAttributeNS(null, 'x2', '0');
			cursor.setAttributeNS(null, 'y2', '0');
			svg.appendChild(cursor);

			const eventCallback = (event) => {
				// console.log('event:', event);
				if (event.left === null) {
					return;
				}
				const lastSelection = element.querySelectorAll('.highlight');
				for (let selection of lastSelection) {
					selection.classList.remove('highlight');
				}

				for (let note of event.elements) {
					for (let elem of note) {
						// This seems to have stopped working for tabs, manually find tab stuff:
						const selector = Array.from(elem.classList).map(c => `.${c}`).join('');
						const matchingElems = element.querySelectorAll(selector);
						for (let matchingElem of matchingElems) {
							matchingElem.classList.add('highlight');
						}
					}
				}

				if (cursor) {
					cursor.setAttribute('x1', `${event.left - 2}`);
					cursor.setAttribute('x2', `${event.left - 2}`);
					cursor.setAttribute('y1', `${event.top}`);
					cursor.setAttribute('y2', `${event.top + event.height}`);
				}
			}

			const rewind = () => {
				cursor.setAttributeNS(null, 'x1', '0');
				cursor.setAttributeNS(null, 'y1', '0');
				cursor.setAttributeNS(null, 'x2', '0');
				cursor.setAttributeNS(null, 'y2', '0');
				const highlighted = element.querySelectorAll('.highlight');
				for (let selection of highlighted) {
					selection.classList.remove('highlight');
				}

				element.scroll({top:0,behavior:'smooth'})
			}

			const timingParams = {
				beatSubdivisions: 2,
				beatCallback: () => {},
				eventCallback: eventCallback,
				lineEndCallback: ({ top }) => element.scrollTop = top,
				lineEndAnticipation: 100
			}

			const timingCallbacks = new ABCjs.TimingCallbacks(abcObj, timingParams);
			timer = {
				rewind,
				...timingCallbacks
			};

			if (options.expanded) {
				synthControl = new ABCjs.synth.SynthController();
				synthControl.load(options.controlsSelector, null, {
					displayLoop: false,
					displayRestart: false,
					displayPlay: false,
					displayProgress: false,
					displayWarp: false
				});
				synthControl.setTune(
					abcObj,
					false,
					{ qpm: options.qpm }
					// {program: 106/* a number representing a midi instrument? */} //https://en.wikipedia.org/wiki/General_MIDI
				);
			}
		}
	};

	const createFsm = async (element, options) => {
		let audioContext;

		const unsubscribe = audioContextStore.subscribe(
			newContext => audioContext = newContext
		);

		const initialize = async () => {
			abcObj = await visuallyRenderAbc(
				element,
				{ ...defaultOptions, ...options }
			);

			await initializeSynth(
				element, abcObj, audioContext, options
			);
		};

		const activateAudio = async () => {
			await audioContext.resume();
			await synth.prime();
			synthControl.play();
			timer.start();
		};

		const playAudio = async () => {
			synthControl.play();
			timer.start();
		};

		const pauseAudio = async () => {
			synthControl.pause();
			timer.pause();
		};

		const rewindAudio = async () => {
			synthControl.restart();
			timer.stop();
			timer.rewind();
		};

		const rewindTransition = transition(
			'rewind',
			'audioStopped',
			action(rewindAudio)
		);

		const playTransition = transition(
			'play',
			'audioPlaying',
			action(playAudio)
		);

		const pauseTransition = transition(
			'pause',
			'audioPaused',
			action(pauseAudio)
		);

		const machine = createMachine({
			initial: invoke(
				initialize,
				transition('done', 'audioUnactivated')
			),
			audioUnactivated: state(
				transition('play', 'activatingAudio')
			),
			activatingAudio: invoke(
				activateAudio,
				transition('done', 'audioPlaying')
			),
			audioPlaying: state(
				pauseTransition,
				rewindTransition
			),
			audioPaused: state(
				playTransition,
				rewindTransition
			),
			audioStopped: state(
				playTransition,
				transition('finsh', 'end')
			),
			end: final()
		});

		const {subscribe, set} = writable(
			interpret(machine, service => set(service), {})
		);

		return { subscribe, unsubscribe };
	};

	const defaultOptions = {
		expanded: false,
		abc: '',
		updateControls: (x) => { },
		controlsSelector: '.fake-controls'
	};

	const visuallyRenderAbc = async (element, { abc, expanded, qpm }) => {
		// const positionInfo = element.parentNode.getBoundingClientRect();
		// const elementWidth = Math.round(positionInfo.width)
		// console.log('element:', positionInfo);

		/** @type {ABCjs.AbcVisualParams} */
		let abcRenderOptions = {
			responsive: 'resize',
			// staffwidth: window.innerWidth,
			// wrap: {
			// 	minSpacing: 1.8,
			// 	maxSpacing: 2.7,
			// 	preferredMeasuresPerLine: 4
			// }
		};
		if (expanded) {
			/** @ts-ignore : looks like ABCjs doesn't have .tablature in types */
			abcRenderOptions.tablature = [{ instrument: 'violin' }];
			abcRenderOptions.add_classes = true;
		}
		console.log('abcRenderOptions:', abcRenderOptions);
		let abcWithTempo = abc;
		if (abc.indexOf('Q:') === -1) {
			abcWithTempo = abc.replace(
				'K:', `Q: 1/2=${qpm}\r\nK:`
			);
		}
		element.replaceChildren();
		console.log('rendering abc...', abcWithTempo);
		const abcObj = ABCjs.renderAbc(element, abcWithTempo, abcRenderOptions)[0];

		// cleanup some styling after rendering
		element.style.removeProperty('padding-bottom');
		element.style.removeProperty('overflow');
		const textElms = element.querySelectorAll(
			`text[font-family*='Times New Roman']`
		);

		Array.from(textElms).forEach((elm) => {
			elm.style.fontFamily = 'Copse';
		});

		return abcObj;
	};

	createFsm(element, options).then(
		fsm => {
			unsubscribe = fsm.unsubscribe;
			options.updateFsm(fsm);
		}
	);

	return {
		update: (options) => {
			createFsm(element, options).then(
				updatedFsm => {
					unsubscribe = updatedFsm.unsubscribe;
					options.updateFsm(updatedFsm);
				}
			)
		},
		destroy() {
			unsubscribe();
		}
	};
};
