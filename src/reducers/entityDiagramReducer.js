import {
    APPEND_RELATIONSHIP_TO_ACTIVE_DIAGRAM,
    APPEND_TABLE_TO_ACTIVE_DIAGRAM,
    REMOVE_RELATIONSHIP_FROM_ACTIVE_DIAGRAM,
    REMOVE_TABLE_FROM_ACTIVE_DIAGRAM,
    RESET_ACTIVE_DRAG,
    SET_ACTIVE_DRAG,
    UPDATE_ACTIVE_DRAG,
    UPDATE_TABLE_OF_ACTIVE_DIAGRAM,
} from "../configs/actionTypes/entityDiagramActionTypes";

const initialState = {
    // currently saved or editing  diagrams
    diagrams: [
        {
            id: 'diagram 1',
            name: 'sample diagram 1',
        }, {
            id: 'diagram 2',
            name: 'sample diagram 2',
        }, {
            id: 'diagram 3',
            name: 'sample diagram 3',
        }
    ],

    // diagram that is being edited
    activeDiagram: {
        id: 'diagram 1',
        name: 'sample diagram',
        relationships: [],
        tables: []
    },

    // these are the table info that are loaded from the back end
    tables: [
        {
            name: 'apartment',
            db: 'db1',
            fields: [
                {
                    "field": "id",
                    "type": "int(11)",
                    "null": "NO",
                    "key": "PRI",
                    "extra": "auto_increment",
                },
                {
                    "field": "name",
                    "type": "varchar(100)",
                    "null": "NO",
                },
                {
                    "field": "address",
                    "type": "varchar(255)",
                    "null": "YES",
                },
                {
                    "field": "type_id",
                    "type": "int(11)",
                    "null": "YES",
                },
                {
                    "field": "map_url",
                    "type": "varchar(100)",
                    "null": "YES",
                },
                {
                    "field": "created_at",
                    "type": "timestamp",
                    "null": "YES",
                    "extra": "on update CURRENT_TIMESTAMP"
                },
                {
                    "field": "updated_at",
                    "type": "timestamp",
                    "null": "YES",
                    "extra": "on update CURRENT_TIMESTAMP"
                },
                {
                    "field": "deleted_at",
                    "type": "timestamp",
                    "null": "YES",
                    "extra": "on update CURRENT_TIMESTAMP"
                }
            ]
        },
        {
            name: 'apartment_options',
            db: 'db1',
            fields: [
                {
                    "field": "id",
                    "type": "int(11)",
                    "null": "NO",
                    "key": "PRI",
                    "extra": "auto_increment"
                },
                {
                    "field": "apartment_id",
                    "type": "int(11)",
                    "null": "NO",
                    "key": "",
                    "extra": ""
                },
                {
                    "field": "option_id",
                    "type": "int(11)",
                    "null": "NO",
                    "key": "MUL",
                    "extra": ""
                }
            ]
        },
        {
            name: 'options',
            db: 'db1',
            fields: [
                {
                    "field": "id",
                    "type": "int(11)",
                    "null": "NO",
                    "key": "PRI",
                    "extra": "auto_increment"
                },
                {
                    "field": "name",
                    "type": "varchar(100)",
                    "null": "NO",
                },
                {
                    "field": "description",
                    "type": "tinytext",
                    "null": "NO",
                },
                {
                    "field": "created_at",
                    "type": "timestamp",
                    "null": "YES",
                },
                {
                    "field": "updated_at",
                    "type": "timestamp",
                    "null": "YES",
                },
                {
                    "field": "deleted_at",
                    "type": "timestamp",
                    "null": "YES",
                }
            ]
        }
    ],

    // active drag data
    lastActiveDrag: {
        type: null,
        signature: null,
        coordinates: null,
        dragging: true,
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_ACTIVE_DRAG:
            return {
                ...state,
                lastActiveDrag: action.payload
            };

        case UPDATE_ACTIVE_DRAG:
            return {
                ...state,
                lastActiveDrag: {
                    ...state.lastActiveDrag,
                    ...action.payload
                }
            };

        case RESET_ACTIVE_DRAG:
            return {
                ...state,
                lastActiveDrag: {
                    ...state.lastActiveDrag,
                    dragging: false
                }
            };

        case APPEND_TABLE_TO_ACTIVE_DIAGRAM:
            return {
                ...state,
                activeDiagram: {
                    ...state.activeDiagram,
                    tables: [
                        ...state.activeDiagram.tables,
                        action.payload
                    ]
                }
            };

        case UPDATE_TABLE_OF_ACTIVE_DIAGRAM:
            return {
                ...state,
                activeDiagram: {
                    ...state.activeDiagram,
                    tables: state.activeDiagram.tables.map(table => {
                        if(table.name === action.payload.name) {
                            return action.payload;
                        }
                        return table;
                    })
                }
            };

        case REMOVE_TABLE_FROM_ACTIVE_DIAGRAM:
            return {
                ...state,
                activeDiagram: {
                    ...state.activeDiagram,
                    tables: state.activeDiagram.tables.filter(table => table.name !== action.payload.name)
                }
            };



        case APPEND_RELATIONSHIP_TO_ACTIVE_DIAGRAM:
            return {
                ...state,
                activeDiagram: {
                    ...state.activeDiagram,
                    relationships: [
                        ...state.activeDiagram.relationships,
                        action.payload
                    ]
                }
            };


           case REMOVE_RELATIONSHIP_FROM_ACTIVE_DIAGRAM:
            return {
                ...state,
                activeDiagram: {
                    ...state.activeDiagram,
                    relationships: state.activeDiagram.relationships.filter(relationship => relationship.id !== action.payload.id)
                }
            };

        // returning default state
        default:
            return state;
    }
}