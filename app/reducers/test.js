const TEST = 'TEST';

const INITIAL_STATE = {
    clickCount: 0
};

export const actions = {
    countPlus: () => {
        return {
            type: TEST
        };
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TEST:
            let {clickCount} = state;
            ++clickCount;
            return Object.assign({}, state, {clickCount});
        default:
            return state;
    }
}
