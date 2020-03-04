import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {
    removeToActiveDiagramTable,
    setActiveDrag,
    updateActiveDrag
} from "../../../actions/entityDiagramActions";
import {
    _onDragEnd,
    _onDragStart,
    DRAG_TYPE_TABLE_MOVE
} from "../../../helpers/entityDiagram";
import TableRowNotation from "./TableRowNotation";

class TableNotation extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const style = this.reComputeStyles();
        return (
            <div draggable
                 onDragStart={(e) => this.onDragStart(e, this.props.table)}
                 onDragEnd={this.onDragEnd}
                 key={this.props.table.name}
                 style={style}
                 className="card">
                <div className="card-header">
                    <h3 className="card-title">{this.props.table.name}</h3>

                    <div className="card-tools">
                        <button type="button" className="btn btn-tool" onClick={this.onDeleteTableNotation}
                                data-card-widget="collapse">
                            <i className="fas fa-minus">x</i>
                        </button>
                    </div>
                </div>
                <div className="card-body p-0">
                    <ul className="nav nav-pills flex-column">
                        {
                            this.props.table.fields.map((column, index) => {
                                return (
                                    <TableRowNotation key={index}
                                                      table={this.props.table}
                                                      column={column}
                                                      index={index}/>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }

    reComputeStyles = () => {
        const zIndex = this.props.index ? 1000 + this.props.index : 1000;
        const left = this.props.table && this.props.table.coordinates && this.props.table.coordinates.x
            ? this.props.table.coordinates.x + 'px'
            : '0px';
        const top = this.props.table && this.props.table.coordinates && this.props.table.coordinates.y
            ? this.props.table.coordinates.y + 'px'
            : '0px';

        return {
            display: 'block',
            position: 'absolute',
            minWidth: '200px',
            left,
            top,
            zIndex
        };
    };

    onDeleteTableNotation = () => {
        this.props.removeToActiveDiagramTable({name: this.props.table.name});
    };

    onDragStart = (e, data) => {
        const params = {
            e,
            type: DRAG_TYPE_TABLE_MOVE,
            signature: data.name,
            data,
            lastActiveDrag: this.props.lastActiveDrag,
            callback: (p) => this.props.setActiveDrag(p)
        };
        _onDragStart(params);
    };

    onDragEnd = () => {
        _onDragEnd({
            callback: (p) => this.props.updateActiveDrag(p)
        });
    }
}

const mapStateToProps = state => {
    return ({
        lastActiveDrag: state.entityDiagram.lastActiveDrag,
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeToActiveDiagramTable,
        setActiveDrag,
        updateActiveDrag,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableNotation)