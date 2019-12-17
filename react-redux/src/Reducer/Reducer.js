const INCREMENT = "INCREMENT";

export const incrementAction = () => ({
    type: INCREMENT,
});

export const initialState = {
    counter: 0
}

export const reducer = (state, action) => {
    switch(action.type) {
        case INCREMENT:
            return { ...state, counter: state.counter + 1 }
        default:
            return state;
    }
}