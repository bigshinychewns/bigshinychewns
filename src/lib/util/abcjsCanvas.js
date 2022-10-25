import ABCjs from 'abcjs';
import AbcCursorControl from '$lib/util/AbcjsCursorControl';
import audioContextStore from '$lib/util/audioContextStore';

const defaultOptions = {
	expanded: false,
	abc: '',
	halfNoteTempo: 90,
	updateControls: (x) => { },
	controlsSelector: '.fake-controls'
};

const abcjsCanvas = (node, options) => {
	const optionsWithDefaults = {...defaultOptions, ...options}

	let audioContext;

	const unsubscribe = audioContextStore.subscribe(
		newContext => audioContext = newContext
	);

	const renderAbc = (options) => {
		let { abc, expanded } = options;
		let abcRenderOptions = { responsive: 'resize' };
		if (expanded) {
			abcRenderOptions.tablature = [{ instrument: 'violin' }];
			abcRenderOptions.add_classes = true;
		}

		let abcWithTempo = abc;
		if (abc.indexOf('Q:') === -1) {
			abcWithTempo = abc.replace(
				'K:', `Q: 1/2=${options.halfNoteTempo}\r\nK:`
			)
		}
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

	const setupSynthControl = (options) => {
		const cursorControl = new AbcCursorControl(node);
		const synthControl = new ABCjs.synth.SynthController();
		synthControl.load(options.controlsSelector, cursorControl, {
			displayLoop: false,
			displayRestart: false,
			displayPlay: false,
			displayProgress: false,
			displayWarp: false
		});
		return synthControl
	}

	const setupAudio = async (abcObj, options) => {
		if (ABCjs.synth.supportsAudio()) {
			const audioParams = {
				audioContext: audioContext,
				visualObj: abcObj
			};
			const synth = new ABCjs.synth.CreateSynth();
			let initializedSynth = synth.init(audioParams);
			let synthControl;
			if (options.expanded) {
				synthControl = setupSynthControl(options)
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

	const exportControlFunctions = (abcObj, options) => {
		let synth, synthControl, updatedControls;
		const setupAndAction = async () => {
			audioReady = setupAudio(abcObj, options);
			const audioStuff = await audioReady;
			synth = audioStuff.synth;
			synthControl = audioStuff.synthControl;
			if (options.expanded) {
				updatedControls = {
					play: synthControl.play,
					pause: synthControl.pause,
					rewind: synthControl.restart,
					toggleLoop: synthControl.toggleLoop,
				}
			} else {
				updatedControls = {
					play: synth.start,
					pause: synth.stopj,
				};
			}
			options.updateControls(updatedControls);
		}

		let newControls = {
			play: async () => {
				await setupAndAction();
				!options.expanded ? synth.start() : synthControl.play();
			},
			pause: async () => {
				await setupAndAction();
				!options.expanded ? synth.stop() : synthControl.pause();
			}
		};

		if (options.expanded) {
			newControls.rewind = async () => {
				await setupAndAction();
				synthControl.restart();
			}
			newControls.toggleLoop = async () => {
				await setupAndAction();
				synthControl.toggleLoop();
			}
		}
		options.updateControls(newControls);
	};

	let abcObj = renderAbc(optionsWithDefaults);
	exportControlFunctions(abcObj, optionsWithDefaults);

	return {
		update(options) {
			let abcObj = renderAbc({...defaultOptions, ...options});
			exportControlFunctions(abcObj, options);
		},
		destroy() {
			unsubscribe();
		}
	};
};

export default abcjsCanvas;
