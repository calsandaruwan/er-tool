import {
    APPEND_TABLE_TO_ACTIVE_DIAGRAM,
    REMOVE_TABLE_FROM_ACTIVE_DIAGRAM,
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

// update active drag object
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

// add new table in to the active diagram object
export const appendToActiveDiagramTable = (params) => dispatch => {
    dispatch({
        type: APPEND_TABLE_TO_ACTIVE_DIAGRAM,
        payload: params
    })
};


// remove a table object from the active diagram object
export const removeToActiveDiagramTable = (params) => dispatch => {
    dispatch({
        type: REMOVE_TABLE_FROM_ACTIVE_DIAGRAM,
        payload: params
    })
};