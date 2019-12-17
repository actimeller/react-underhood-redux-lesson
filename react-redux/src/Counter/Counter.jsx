import React from 'react';
import connect from '../Connect/Connect';
import { incrementAction } from '../Reducer/Reducer';

function Counter(props) {
    return (
        <>
        <div>
            Counter: {props.counter}
        </div>

        <button onClick={props.increment}>increment counter</button>
        </>
    );
}

export default connect(
    (state) => ({ counter: state.counter }),
    (dispatch) => ({ increment: () => { dispatch(incrementAction()) } })
)(Counter)