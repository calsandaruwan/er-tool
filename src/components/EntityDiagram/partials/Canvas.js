import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import TableNotation from './TableNotaion';
import {appendToActiveDiagramTable} from "../../../actions/entityDiagramActions";

class Canvas extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                canvas: {
                    width: '100%',
                    height: '100%'
                },
                tblNotation: {
                    position: 'absolute',
                    border: 'solid 1px black',
                    zIndex: 1,
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
            <div onDrop={this.onDrop}
                 onDragOver={this.onDragOver}
                 style={this.state.tempStyles.canvas}>
                {this.renderTableNotations()}
            </div>
        )
    }

    onDrop = (e) => {
        e.preventDefault();
        const {lastActiveDrag} = this.props;
        const coordinates = e.target.getBoundingClientRect();
        const tableCoordinates = {
            x: e.pageX - coordinates.left - lastActiveDrag.pointerOffset.x,
            y: e.pageY - coordinates.top - lastActiveDrag.pointerOffset.y,
        };

        const params = {
            coordinates: {
                x: tableCoordinates.x,
                y: tableCoordinates.y,
            },
            ...lastActiveDrag.data
        };

        this.props.appendToActiveDiagramTable(params);
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
                {activeDiagram.tables.map((table, index) => {
                    return <TableNotation table={table}
                                          index={index}
                                          key={index}/>
                })}
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
        appendToActiveDiagramTable
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)