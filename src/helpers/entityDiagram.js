// entity diagram related common constants
export const DRAG_TYPE_TABLE_CREATE = 'DRAG_TYPE_TABLE_CREATE';
export const DRAG_TYPE_TABLE_MOVE = 'DRAG_TYPE_TABLE_MOVE';
export const DRAG_TYPE_TABLE_RELATION_CREATE = 'DRAG_TYPE_TABLE_RELATION_CREATE';

export const RELATIONSHIP_ONE_TO_ONE = 'RELATIONSHIP_ONE_TO_ONE';

export const MARGIN = 10;

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
    const canvasCoordinates = _getBoundsById('canvas');
    const from = _getBoundsById(relationship.from.id);
    const to = _getBoundsById(relationship.to.id);

    return [
        (from.x - canvasCoordinates.left),
        (from.y - canvasCoordinates.top + from.height / 2),
        (to.x - canvasCoordinates.left + to.width),
        (to.y - canvasCoordinates.top + to.height / 2)
    ];
}


export function _getEndPointsByRelationship(relationship) {
    if (!(relationship && relationship.from && relationship.to)) {
        return false
    }
    const canvasCoordinates = _getBoundsById('canvas');
    const from = _getBoundsById(relationship.from.id);
    const to = _getBoundsById(relationship.to.id);

    // determine the side
    let fromX = from.x - 10;
    let toX = to.x + to.width + 10;
    if (from.x < to.x) {
        // FROM is located at the left side of the TO
        // so line should be started from the right side end of FROM
        fromX = from.x + from.width + 10;
        toX = to.x - 10;
    }

    return {
        from: {
            x: Math.floor(fromX - canvasCoordinates.left),
            y: Math.floor(from.y - canvasCoordinates.top + from.height / 2),
        }, to: {
            x: Math.floor(toX - canvasCoordinates.left),
            y: Math.floor(to.y - canvasCoordinates.top + from.height / 2),
        }
    }
}

export function _getParamsForTableNotations(e, lastActiveDrag, options = {}) {
    const corrections = options.corrections ? options.corrections : {x: 0, y: 0};
    const canvasCoordinates = _getBoundsById('canvas');
    const coordinates = {
        x: e.pageX - lastActiveDrag.pointerOffset.x - canvasCoordinates.left + corrections.x,
        y: e.pageY - lastActiveDrag.pointerOffset.y - canvasCoordinates.top + corrections.y,
    };

    return {...lastActiveDrag.data, coordinates}
}

export function _getBoundsById(id) {
    if (id) {
        const el = document.getElementById(id);
        if (el) {
            return el.getBoundingClientRect();
        }
        return null;
    }
    return null;
}

export async function _generateMatrix() {
    return new Promise((resolve, reject) => {
        const canvasBounds = _getBoundsById('canvas');
        let matrix = [];
        for (let row = 0; row < Math.ceil(canvasBounds.height); row++) {
            let rowArray = [];
            for (let col = 0; col < Math.ceil(canvasBounds.width); col++) {
                rowArray.push(0);
            }
            matrix.push(rowArray);
        }
        resolve(matrix);
    });

}

export async function _setNonWalkableAreas(matrix, tables, relationships) {
    return new Promise((resolve, reject) => {
        if (tables && tables.length && relationships && relationships.length) {
            const canvasCoordinates = _getBoundsById('canvas');
            for (let i = 0; i < tables.length; i++) {
                const table = tables[i];
                const tableBounds = _getBoundsById(_generateId([table.db, table.name]));

                const maxX = matrix.width - 1;
                const maxY = matrix.height - 1;

                let horizontalStart = Math.ceil(tableBounds.x - canvasCoordinates.x - MARGIN);
                const horizontalEnd = Math.ceil(tableBounds.x + tableBounds.width - canvasCoordinates.x + MARGIN);
                let verticalStart = Math.ceil(tableBounds.y - canvasCoordinates.y - MARGIN);
                const verticalEnd = Math.ceil(tableBounds.y + tableBounds.height - canvasCoordinates.y + MARGIN);


                // setting upper limit of the table
                for (horizontalStart; horizontalStart <= horizontalEnd; horizontalStart++) {
                    if ((verticalStart <= maxY && verticalStart >= 0) && horizontalStart <= maxX && horizontalStart >= 0) {
                        matrix.setWalkableAt(horizontalStart, verticalStart, false);
                    }
                }

                horizontalStart = Math.ceil(tableBounds.x - canvasCoordinates.x - MARGIN);
                verticalStart = Math.ceil(tableBounds.y - canvasCoordinates.y - MARGIN);

                // setting lower limit of the table
                for (horizontalStart; horizontalStart <= horizontalEnd; horizontalStart++) {
                    if ((verticalEnd <= maxY && verticalEnd >= 0) && (horizontalStart <= maxX && horizontalStart >= 0)) {
                        matrix.setWalkableAt(horizontalStart, verticalEnd, false);
                    }
                }


                horizontalStart = Math.ceil(tableBounds.x - canvasCoordinates.x - MARGIN);
                verticalStart = Math.ceil(tableBounds.y - canvasCoordinates.y - MARGIN);

                // setting left margin of the table
                for (verticalStart; verticalStart <= verticalEnd; verticalStart++) {
                    if ((verticalStart <= maxY && verticalStart >= 0) && (horizontalStart <= maxX && horizontalStart >= 0)) {
                        matrix.setWalkableAt(horizontalStart, verticalStart, false)
                    }
                }

                verticalStart = Math.ceil(tableBounds.y - canvasCoordinates.y - MARGIN);
                // setting right margin of the table
                for (verticalStart; verticalStart <= verticalEnd; verticalStart++) {
                    if ((verticalStart <= maxY && verticalStart >= 0) && ((horizontalEnd) <= maxX && horizontalEnd >= 0)) {
                        matrix.setWalkableAt(horizontalEnd - MARGIN, verticalStart, false)
                    }
                }
            }

        }
        resolve(matrix);
    });
}