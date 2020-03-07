import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {
    appendToActiveDiagramRelationship,
    setActiveDrag,
    updateActiveDrag
} from "../../../actions/entityDiagramActions";
import {
    _generateId,
    _getDefaultRelationshipObj,
    _onDragEnd,
    _onDragStart,
    DRAG_TYPE_TABLE_RELATION_CREATE
} from "../../../helpers/entityDiagram";

class TableRowNotation extends Component {

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <li draggable
                id={_generateId([this.props.table.name, this.props.column.field])}
                className="nav-item active"
                onDragStart={(e) => this.onDragStart(e, {
                    column: this.props.column,
                    table: this.props.table,
                })}
                onDragEnd={this.onDragEnd}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}>
                <div className="btn btn-block text-left">
                    {this.props.column.field}
                    <small className="text-bold text-green">
                        {this.props.column.key ? ' (' + this.props.column.key + ') ' : null}
                    </small>
                    <small className="float-right">
                        {this.props.column.type}
                    </small>
                </div>
            </li>
        )
    }

    onDragStart = (e, data) => {
        e.stopPropagation();
        const params = {
            e,
            type: DRAG_TYPE_TABLE_RELATION_CREATE,
            signature: data.name,
            data,
            callback: (p) => this.props.setActiveDrag(p)
        };
        _onDragStart(params);
    };

    onDragEnd = () => {
        _onDragEnd({
            callback: (p) => this.props.updateActiveDrag(p)
        });
    };

    onDrop = (e) => {
        e.preventDefault();
        const {lastActiveDrag} = this.props;
        // if relation ship exists, return false
        //todo

        if (lastActiveDrag.type !== DRAG_TYPE_TABLE_RELATION_CREATE) {
            return false;
        }
        const relationShip = _getDefaultRelationshipObj({
            from: lastActiveDrag.data,
            to: {
                table: this.props.table,
                column: this.props.column
            }
        });
        this.props.appendToActiveDiagramRelationship(relationShip);
    };

    onDragOver = (e) => {
        e.preventDefault();
    }
}

const mapStateToProps = state => {
    return ({
        lastActiveDrag: state.entityDiagram.lastActiveDrag,
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveDrag,
        updateActiveDrag,
        appendToActiveDiagramRelationship
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRowNotation)