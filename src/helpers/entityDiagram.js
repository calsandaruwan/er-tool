// entity diagram related common constants
export const DRAG_TYPE_TABLE_CREATE = 'DRAG_TYPE_TABLE_CREATE';
export const DRAG_TYPE_TABLE_MOVE = 'DRAG_TYPE_TABLE_MOVE';
export const DRAG_TYPE_TABLE_RELATION_CREATE = 'DRAG_TYPE_TABLE_RELATION_CREATE';

export const RELATIONSHIP_ONE_TO_ONE = 'RELATIONSHIP_ONE_TO_ONE';

// entity diagram related helper functions

// start dragging
export function _onDragStart(dragParams) {
    const {e} = dragParams;
    if (!e) {
        return false;
    }
    const coordinates = e.target.getBoundingClientRect();
    const pointerOffset = {
        x: e.clientX - coordinates.left,
        y: e.clientY - coordinates.top
    };
    // const pointerOffset = _getCoordinatesForTableNotations(e, dragParams.lastActiveDrag);

    const params = {
        type: dragParams.type,
        signature: dragParams.signature,
        data: dragParams.data,
        coordinates,
        pointerOffset,
        dragging: true,
    };
    dragParams.callback(params)
}


// end of dragging
export function _onDragEnd(dragParams) {
    const params = {
        dragging: false,
    };
    dragParams.callback(params);
}


// get default relationship object
export function _getDefaultRelationshipObj(obj) {
    const fromId = _generateId([obj.from.table.name, obj.from.column.field]);
    const toId = _generateId([obj.to.table.name, obj.to.column.field]);
    return {
        id: _generateId([fromId, toId], true),
        relationship: RELATIONSHIP_ONE_TO_ONE,
        from: {
            id: fromId,
            table: obj.from.table.name,
            field: obj.from.column.field,
        },
        to: {
            id: toId,
            table: obj.to.table.name,
            field: obj.to.column.field,
        }
    }
}

export function _generateId(params, sort = false) {
    const glue = ':';
    if (sort) {
        params.sort();
    }
    return params.join(glue);
}

export function _getPathByRelationShip(relationship) {
    if (!(relationship && relationship.from && relationship.to)) {
        return false
    }
    const canvasCoordinates = document.getElementById('canvas').getBoundingClientRect();
    const from = document.getElementById(relationship.from.id).getBoundingClientRect();
    const to = document.getElementById(relationship.to.id).getBoundingClientRect();
    return [
        (from.x - canvasCoordinates.left),
        (from.y - canvasCoordinates.top+ from.height / 2),
        (to.x  - canvasCoordinates.left + to.width),
        (to.y - canvasCoordinates.top + to.height / 2)
    ];
}

export function _getParamsForTableNotations(e, lastActiveDrag, options = {}) {
    const corrections = options.corrections ? options.corrections : {x: 0, y: 0};
    const canvasCoordinates = document.getElementById('canvas').getBoundingClientRect();
    const coordinates = {
        x: e.pageX - lastActiveDrag.pointerOffset.x - canvasCoordinates.left + corrections.x,
        y: e.pageY - lastActiveDrag.pointerOffset.y - canvasCoordinates.top + corrections.y,
    };

    return {...lastActiveDrag.data, coordinates}
}