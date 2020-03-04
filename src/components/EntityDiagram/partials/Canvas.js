import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TableNotation from './TableNotaion';
import {
    appendToActiveDiagramTable,
    updateActiveDiagramTable
} from "../../../actions/entityDiagramActions";
import {
    _getParamsForTableNotations,
    _getPathByRelationShip,
    DRAG_TYPE_TABLE_CREATE,
    DRAG_TYPE_TABLE_MOVE
} from "../../../helpers/entityDiagram";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                canvas: {
                    width: '100%',
                    height: '100%'
                }
            },
            tableCoordinates: {
                x: 0,
                y: 0
            }
        }
    }

    render() {
        return (
            <div id="canvas" onDrop={this.onDrop}
                 onDragOver={this.onDragOver}
                 style={this.state.tempStyles.canvas}>
                {this.renderTableNotations()}
            </div>
        )
    }

    onDrop = (e) => {
        e.preventDefault();
        const {lastActiveDrag} = this.props;

        if (lastActiveDrag.type === DRAG_TYPE_TABLE_CREATE) {
            let corrections = {x: 27.5, y: 20};
            let params = _getParamsForTableNotations(e, lastActiveDrag, {corrections});
            this.handleTableDropOnCanvas(params);
            return false;
        } else if (lastActiveDrag.type === DRAG_TYPE_TABLE_MOVE) {
            let corrections = {x:22.5,y:22.5};
            let params = _getParamsForTableNotations(e, lastActiveDrag, {corrections});
            this.handleTableMoveOnCanvas(params);
            return false;
        }
        return false;
    };


    handleTableDropOnCanvas = (params) => {
        this.props.appendToActiveDiagramTable(params);
    };

    handleTableMoveOnCanvas = (params) => {
        this.props.updateActiveDiagramTable(params);
    };

    onDragOver = (e) => {
        e.preventDefault();
    };

    renderTableNotations = () => {
        const {activeDiagram} = this.props;
        if (!(activeDiagram && activeDiagram.tables && activeDiagram.tables.length)) {
            return null;
        }

        return (
            <div id="diagram-wrapper">
                {
                    activeDiagram.tables.map((table, index) => {
                        return <TableNotation table={table}
                                              index={index}
                                              key={index}/>
                    })
                }
                <svg style={{position:'absolute', width: '100%', height:'100%', zIndex:900}}>
                    {
                        activeDiagram.relationships.map((relationship, index) => {
                            const coordinates = _getPathByRelationShip(relationship);
                            return <line x1={coordinates[0]}
                                         y1={coordinates[1]}
                                         x2={coordinates[2]}
                                         y2={coordinates[3]}
                                         style={{stroke:'rgb(0,0,0)',strokeWidth:'1'}} />
                        })
                    }
                </svg>
            </div>
        )
    };
}

const mapStateToProps = state => {
    return ({
        lastActiveDrag: state.entityDiagram.lastActiveDrag,
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        appendToActiveDiagramTable,
        updateActiveDiagramTable,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)