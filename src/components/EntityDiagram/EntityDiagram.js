import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import Canvas from "./partials/Canvas";
import SidePanel from "./partials/SidePanel";

class EntityDiagram extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                canvas: {
                    display: 'inline-block',
                    width: '70%',
                    height: '550px',
                    border: 'solid 1px black',
                    position:'absolute',
                    left: '0px',
                },
                sidePanel: {
                    display: 'inline-flex',
                    width: '29%',
                    height: '550px',
                    border: 'solid 1px black',
                    position:'absolute',
                    right: '0px',
                }
            }
        }
    }

    render() {
        return (
            <div id={this.props.editorId}>
                <div id={'edTitle'}>
                    <h3>{this.props.title}</h3>
                </div>
                <div id={'edCanvas'} style={this.state.tempStyles.canvas}>
                    <Canvas/>
                </div>
                <div id={'edSidePanel'} style={this.state.tempStyles.sidePanel}>
                    <SidePanel getSelectedTables={this.getSelectedTables}/>
                </div>
            </div>
        )
    }

    // get a list of tables that are already selected
    getSelectedTables = () => {
        if (this.props.diagram
            && this.props.diagram.meta
            && this.props.diagram.meta.tables
            && this.props.diagram.meta.tables.length) {
            return this.props.diagram.meta.tables;
        }
        return [];
    }
}

const mapStateToProps = state => {
    return ({
        diagram: state.entityDiagram.activeDiagram
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //action1,
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityDiagram)

EntityDiagram.defaultProps = {
    editorId: 'editor1',
    title: 'Entity Diagram Tool - Version 1.0'
};