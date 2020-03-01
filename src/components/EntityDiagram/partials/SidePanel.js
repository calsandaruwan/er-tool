import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {
    resetActiveDrag,
    setActiveDrag,
    updateActiveDrag,
} from "../../../actions/entityDiagramActions";

class SidePanel extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                tableRow: {
                    width: '100%',
                    border: 'solid 1px black',
                    paddingBottom: '5px',
                    marginBottom: '3px',
                },
                rowParent: {
                    width:'100%'
                }
            }
        }
    }

    render() {
        return (
            <div style={this.state.tempStyles.rowParent}>
                {this.renderTablesList()}
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
                     style={this.state.tempStyles.tableRow}
                     key={index}>
                    {table.name}
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

    onDragStart = (e, table) => {
        const coordinates = e.target.getBoundingClientRect();
        const pointerOffset = {
            x: (e.pageX - coordinates.left),
            y: (e.pageY - coordinates.top)
        };

        const params = {
            type: 'table',
            signature: table.name,
            coordinates,
            pointerOffset,
            dragging: true,
        };
        this.props.setActiveDrag(params)
    };

    onDragEnd = (e) => {
        const params = {
            dragging: false,
        };
        this.props.updateActiveDrag(params);
    }
}

const mapStateToProps = state => {
    return ({
        tables: state.entityDiagram.tables
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveDrag,
        resetActiveDrag,
        updateActiveDrag,
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel)