import initStateToggler from '../common/toggle-state';
import initScreenfull from '../common/fullscreen'
import initTriggerResize from '../common/trigger-resize';

export default () => {

    // Toggle state
    initStateToggler();

    // Fullscreen toggler
    initScreenfull();

    // Trigger resize
    initTriggerResize();
}
