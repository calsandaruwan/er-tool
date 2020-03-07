import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {
    resetActiveDrag,
    setActiveDrag,
    updateActiveDrag
} from "../../../actions/entityDiagramActions";
import {
    _onDragEnd,
    _onDragStart,
    DRAG_TYPE_TABLE_CREATE
} from "../../../helpers/entityDiagram";

class TableList extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                sidePanel: {
                    height: '267px'
                },
                row: {
                    boxShadow: '0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)',
                    cursor: 'move',
                    borderRadius: '.25rem',
                    padding: '10px',
                    marginBottom: '5px'
                }
            }
        }
    }

    render() {
        return (
            <div style={this.state.tempStyles.sidePanel} className="card">
                <div className="card-header">
                    <h4 className="card-title">List of tables</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.renderTablesList()}
                    </div>
                </div>
            </div>
        )
    }

    renderTablesList = () => {
        const tables = this.getAvailableTables();

        return tables.map((table, index) => {
            return (
                <div draggable
                     onDragStart={(e) => this.onDragStart(e, table)}
                     onDragEnd={this.onDragEnd}
                     className="col-md-12"
                     key={index}>
                    <div style={{minHeight: '15px', cursor: 'move',}} className="info-box">
                        <i className="far fa-table"></i>
                        <span className="info-box-text">{table.name}</span>
                    </div>
                </div>
            )
        })
    };

    getAvailableTables = () => {
        const selectedTables = this.props.getSelectedTables();
        const {tables} = this.props;

        if (tables && tables.length) {
            if (!selectedTables.length) {
                return tables;
            }

            return tables.filter(table => {
                for (let i = 0; i < selectedTables.length; i++) {
                    if (table.name === selectedTables[i].name) {
                        return false;
                    }
                }
                return true;
            })
        }

        return [];
    };

    onDragStart = (e, data) => {
        const params = {
            e,
            type: DRAG_TYPE_TABLE_CREATE,
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
}

const mapStateToProps = state => {
    return ({
        tables: state.entityDiagram.tables,
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        resetActiveDrag,
        updateActiveDrag,
        setActiveDrag,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableList)