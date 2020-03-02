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
                    position: 'absolute',
                    left: '0px',
                },
                sidePanel: {
                    display: 'inline-flex',
                    width: '29%',
                    height: '550px',
                    border: 'solid 1px black',
                    position: 'absolute',
                    right: '0px',
                }
            }
        }
    }

    render() {
        return (
            <div id={this.props.editorId} className="row">
                <div className="col-lg-9">
                    <div ref={ref => this.ref = ref} style={{height: '550px'}} className="card">
                        <div className="card-body">
                            <Canvas/>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3">
                    <SidePanel getSelectedTables={this.getSelectedTables}/>
                </div>
            </div>
        )
    }

    // get a list of tables that are already selected
    getSelectedTables = () => {
        if (this.props.diagram
            && this.props.diagram.tables
            && this.props.diagram.tables.length) {
            return this.props.diagram.tables;
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