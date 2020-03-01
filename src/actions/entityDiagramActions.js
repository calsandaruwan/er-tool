import {
    RESET_ACTIVE_DRAG,
    SET_ACTIVE_DRAG,
    UPDATE_ACTIVE_DRAG,
} from "../configs/actionTypes/entityDiagramActionTypes";

// update active drag info
export const setActiveDrag = (params) => dispatch => {
    dispatch({
        type: SET_ACTIVE_DRAG,
        payload: params
    })
};

export const updateActiveDrag = (params) => dispatch => {
    dispatch({
        type: UPDATE_ACTIVE_DRAG,
        payload: params
    })
};

// reset active drag to null
export const resetActiveDrag = () => dispatch => {
    dispatch({
        type: RESET_ACTIVE_DRAG,
        payload: null
    })
};