import {
    APPEND_RELATIONSHIP_TO_ACTIVE_DIAGRAM,
    APPEND_TABLE_TO_ACTIVE_DIAGRAM,
    REMOVE_RELATIONSHIP_BY_ID,
    REMOVE_RELATIONSHIP_BY_TABLES,
    REMOVE_TABLE_FROM_ACTIVE_DIAGRAM,
    RESET_ACTIVE_DRAG,
    SET_ACTIVE_DRAG,
    UPDATE_ACTIVE_DRAG,
    UPDATE_TABLE_OF_ACTIVE_DIAGRAM,
} from "../configs/actionTypes/entityDiagramActionTypes";



// ----- drag drop related -----
// -----------------------------

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



// ----- active diagram related -----
// ----------------------------------

// add new table in to the active diagram object
export const appendToActiveDiagramTable = (params) => dispatch => {
    dispatch({
        type: APPEND_TABLE_TO_ACTIVE_DIAGRAM,
        payload: params
    })
};

// update a table object from the active diagram object
export const updateActiveDiagramTable = (params) => dispatch => {
    dispatch({
        type: UPDATE_TABLE_OF_ACTIVE_DIAGRAM,
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

// add new table in to the active diagram object
export const appendToActiveDiagramRelationship = (params) => dispatch => {
    dispatch({
        type: APPEND_RELATIONSHIP_TO_ACTIVE_DIAGRAM,
        payload: params
    })
};


// ----- relationships related ------
// ----------------------------------

// remove a relationship by id
export const removeRelationshipById = (params) => dispatch => {
    dispatch({
        type: REMOVE_RELATIONSHIP_BY_ID,
        payload: params
    })
};

// remove a relationship by tables
export const removeRelationshipByTables = (params) => dispatch => {
    dispatch({
        type: REMOVE_RELATIONSHIP_BY_TABLES,
        payload: params
    })
};