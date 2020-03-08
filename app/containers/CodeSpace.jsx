import React from 'react';
import ScratchBlocks from 'easy-scratch-blocks';
import makeToolboxXML from '../lib/make-toolbox-xml';
import connect from "react-redux/es/connect/connect";

const BLOCKS_DEFAULT_OPTIONS = {
    media: 'static/blocks-media/',
    zoom: {
        controls: false,
        wheel: false,
        startScale: 0.675
    },
    grid: {
        spacing: 40,
        length: 2,
        colour: '#ddd'
    },
    colours: {
        workspace: '#F9F9F9',
        flyout: '#F9F9F9',
        toolbox: '#FFFFFF',
        toolboxSelected: '#E9EEF2',
        scrollbar: '#CECDCE',
        scrollbarHover: '#CECDCE',
        insertionMarker: '#000000',
        insertionMarkerOpacity: 0.2,
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
    },
    comments: true,
    collapse: false,
    sounds: false
};

class CodeSpace extends React.Component {
    constructor(props) {
        super(props);
        this.blocks = React.createRef();
        this.workspace = null;
        this.flyoutWorkspace = null;
    }

    componentDidMount() {
        const toolbox = makeToolboxXML(false);
        const workspaceConfig = Object.assign(
            {},
            BLOCKS_DEFAULT_OPTIONS,
            {toolbox: toolbox}
        );

        this.workspace = ScratchBlocks.inject(this.blocks.current, workspaceConfig);
        this.attachVM();
    }

    componentWillUnmount() {
        this.detachVM();
        this.workspace.dispose();
    }

    attachVM = () => {
        // Let vm listen the events from workspace, to maintain AST（blocks）of editingTarget
        this.workspace.addChangeListener(this.props.vm.blockListener);
        this.flyoutWorkspace = this.workspace.getFlyout().getWorkspace();
        this.flyoutWorkspace.addChangeListener(this.props.vm.flyoutBlockListener);
        this.flyoutWorkspace.addChangeListener(this.props.vm.monitorBlockListener);

        // When script running, yellow border appear
        // When stopped, yellow border disappear
        this.props.vm.addListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.addListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);

        this.props.vm.addListener('workspaceUpdate', this.onWorkspaceUpdate);
    };

    detachVM = () => {
        this.props.vm.removeListener('SCRIPT_GLOW_ON', this.onScriptGlowOn);
        this.props.vm.removeListener('SCRIPT_GLOW_OFF', this.onScriptGlowOff);

        this.props.vm.removeListener('workspaceUpdate', this.onWorkspaceUpdate);
    };

    onScriptGlowOn = (data) => {
        this.workspace.glowStack(data.id, true);
    };

    onScriptGlowOff = (data) => {
        this.workspace.glowStack(data.id, false);
    };

    // this.workspace.updateToolbox(toolboxXML);
    onWorkspaceUpdate = (data) => {
        // When we change sprites, update the toolbox to have the new sprite's blocks
        const toolboxXML = this.getToolboxXML();
        this.workspace.updateToolbox(toolboxXML);

        const dom = ScratchBlocks.Xml.textToDom(data.xml);
        ScratchBlocks.Xml.clearWorkspaceAndLoadFromXml(dom, this.workspace);
    };

    getToolboxXML = () => {
        // Use try/catch because this requires digging pretty deep into the VM
        // Code inside intentionally ignores several error situations (no stage, etc.)
        // Because they would get caught by this try/catch
        try {
            let {editingTarget: target, runtime} = this.props.vm;
            const stage = runtime.getTargetForStage();
            if (!target) target = stage; // If no editingTarget, use the stage

            const stageCostumes = stage.getCostumes();
            const targetCostumes = target.getCostumes();
            const targetSounds = target.getSounds();
            const dynamicBlocksXML = this.props.vm.runtime.getBlocksXML();
            return makeToolboxXML(target.isStage, target.id, dynamicBlocksXML,
                targetCostumes[0].name,
                stageCostumes[0].name,
                targetSounds.length > 0 ? targetSounds[0].name : ''
            );
        } catch {
            return null;
        }
    };

    render() {
        return (
            <div style={{width: "100%", height: "100%"}} ref={this.blocks}>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {vm} = state.vm;
    return {
        vm
    };
};

export default connect(mapStateToProps, null)(CodeSpace);

