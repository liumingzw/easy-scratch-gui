import VM from 'easy-scratch-vm';
import storage from '../lib/storage';
import {SVGRenderer as V2SVGAdapter} from 'scratch-svg-renderer';
import {BitmapAdapter as V2BitmapAdapter} from 'scratch-svg-renderer';
import AudioEngine from 'scratch-audio';
import {INIT_VM} from './actionTypes.js';

const INITIAL_STATE = {
    vm: null,
};

export const actions = {
    initVm: () => {
        return {
            type: INIT_VM
        };
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INIT_VM:
            console.log("init vm ");
            /**
             * Init stuff about vm
             * TODO: attach renderer in Stage.jsx
             * this.renderer = new Renderer(this.canvas.current);
             * this.props.vm.attachRenderer(this.renderer);
             */
            const vm = new VM();
            vm.attachStorage(storage);
            storage.addOfficialScratchWebStores()

            // To be compatible with scratch2, so the svg and bitmap of scratch2 are available for scratch3
            vm.attachV2SVGAdapter(new V2SVGAdapter());
            vm.attachV2BitmapAdapter(new V2BitmapAdapter());

            const audioEngine = new AudioEngine();
            vm.attachAudioEngine(audioEngine);
            vm.setCompatibilityMode(true);

            vm.start();

            return Object.assign({}, state, {vm});
        default:
            return state;
    }
}
