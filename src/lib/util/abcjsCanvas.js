{/* <div use:foo={bar}></div> */ }
import ABCjs from 'abcjs';
import AbcCursorControl from '$lib/util/AbcjsCursorControl';
import audioContextStore from '$lib/util/audioContextStore';
import { get } from 'svelte/store';

// let synth = {
// 	prime: () => { },
// };

// let synthControl = {
// 	load: (x, y, z) => { },
// 	disable: (x) => { },
// 	play: () => { },
// 	pause: () => { },
// 	restart: () => { },
// };

const abcjsCanvas = (node, parameters) => {
	console.log('abcjsCanvas', node, parameters);
	let {
		expanded = false,
		abc = '',
		halfNoteTempo = 90,
		updateControls = (x) => { },
		controlsSelector = '.fake-controls'
	} = parameters;

	let audioContext;

	const unsubscribe = audioContextStore.subscribe(
		newContext => audioContext = newContext
	);

	const renderAbc = (parameters) => {
		console.log('renderAbc', node, parameters);
		let { abc, expanded } = parameters;
		let abcRenderOptions = { responsive: 'resize' };
		if (expanded) {
			abcRenderOptions.tablature = [{ instrument: 'violin' }];
			abcRenderOptions.add_classes = true;
		}

		// synthControl.disable(true);
		let abcWithTempo = abc;
		if (abc.indexOf('Q:') === -1) {
			abcWithTempo = abc.replace(
				'K:', `Q: 1/2=${parameters.halfNoteTempo}\r\nK:`
			)
		}
		console.log('replace teh children of thise node ', node);
		node.replaceChildren();
		const abcObj = ABCjs.renderAbc(node, abcWithTempo, abcRenderOptions)[0];

		// cleanup some styling after rendering
		node.style.removeProperty('padding-bottom');
		node.style.removeProperty('overflow');
		const textElms = node.querySelectorAll(
			`text[font-family*='Times New Roman']`
		);

		Array.from(textElms).forEach((elm) => {
			elm.style.fontFamily = 'Copse';
		});

		return abcObj;
	}

	const setupSynthControl = (parameters) => {
		console.log('setupSynthControl', parameters);
		const cursorControl = new AbcCursorControl(node);
		const synthControl = new ABCjs.synth.SynthController();
		synthControl.load(parameters.controlsSelector, cursorControl, {
			displayLoop: false,
			displayRestart: false,
			displayPlay: false,
			displayProgress: false,
			displayWarp: false
		});
		return synthControl
	}

	const setupAudio = async (abcObj, parameters) => {
		console.log('setupAudio', parameters);
		if (ABCjs.synth.supportsAudio()) {
			const audioParams = {
				audioContext: audioContext,
				visualObj: abcObj
			};
			const synth = new ABCjs.synth.CreateSynth();
			let initializedSynth = synth.init(audioParams);
			let synthControl;
			if (parameters.expanded) {
				synthControl = setupSynthControl(parameters)
				initializedSynth = initializedSynth
					.then(() => synthControl.setTune(abcObj, true))
			}

			await initializedSynth
				.then(synth.prime)
				.catch(console.warn)
				.finally(() => {
					return true;
				});
			return { synth, synthControl }
		}
	};

	let audioReady;

	const exportControlFunctions = (abcObj, parameters) => {
		console.log('exportControlFunctions', parameters);
		let synth, synthControl, updatedControls;
		parameters.updateControls({
			play: async () => {
				audioReady = setupAudio(abcObj, parameters);
				const audioStuff = await audioReady;
				synth = audioStuff.synth;
				synthControl = audioStuff.synthControl;
				if (parameters.expanded) {
					updatedControls = {
						play: synthControl.play,
						pause: synthControl.pause,
						rewind: synthControl.restart
					}
				} else {
					updatedControls = {
						play: synth.start,
						pause: synth.stop
					};
				}
				parameters.updateControls(updatedControls)
				parameters.expanded ? synthControl.play() : synth.start();
			}
		})
	};

	// 	parameters.updateControls({
	// 		play: async () => {
	// 			// if (audioNeedsSetup) {
	// 				console.log('audio needed setup');
	// 				const audioReady = await setupAudio(abcObj, parameters);
	// 				synth = audioReady.synth;
	// 				synthControl = audioReady.synthControl;
	// 				let additionalControls = {
	// 					pause: () => parameters.expanded ? synthControl.pause : synth.stop
	// 				};
	// 				if (parameters.expanded) {
	// 					additionalControls.rewind = synthControl.restart;
	// 				}
	// 				parameters.updateControls(additionalControls);
	// 			// }
	// 			// parameters.expanded ? synthControl.play() : synth.start()
	// 			if (parameters.expanded) {
	// 				console.log('playing synthcontrol', synthControl);
	// 				synthControl.play();
	// 			} else {
	// 				console.log('playing synth', synth);
	// 				synth.start();
	// 			}
	// 		}
	// 	});
	// }

	let abcObj = renderAbc(parameters);
	exportControlFunctions(abcObj, parameters);

	return {
		update(parameters) {
			console.log('abcjsCanvas update', parameters);
			let abcObj = renderAbc(parameters);
			exportControlFunctions(abcObj, parameters);
		},
		destroy() {
			console.log('abcjsCanvas destroy');
			unsubscribe();
		}
	};
};

export default abcjsCanvas;
