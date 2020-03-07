import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";
import {removeRelationshipById} from "../../../actions/entityDiagramActions";

class RelationsList extends Component {
    constructor() {
        super();
        this.state = {
            tempStyles: {
                sidePanel: {
                    height: '267px'
                },
                smallText: {
                    fontsize: '10px'
                }
            }
        }
    }

    render() {
        return (
            <div style={this.state.tempStyles.sidePanel} className="card">
                <div className="card-header">
                    <h4 className="card-title">List of Relationsips</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        {this.renderRelationshipList()}
                    </div>
                </div>
            </div>
        )
    }

    renderRelationshipList = () => {
        const {relationships} = this.props.activeDiagram;

        return relationships.map((relation, index) => {
            return (
                <div className="col-md-12"
                     key={index}>
                    <div style={{minHeight: '15px'}} className="info-box">
                        <i className="btn btn-xs btn-default" onClick={(e) => {this.removeRelationship(relation.id)}}>x</i>
                        &nbsp;
                        <span className="info-box-text">
                            {relation.from.id}
                            <small>&nbsp;to&nbsp;</small>
                            {relation.to.id}
                        </span>
                    </div>
                </div>
            )
        })
    };



    removeRelationship = (id) => {
        this.props.removeRelationshipById({id});
    }
}

const mapStateToProps = state => {
    return ({
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        removeRelationshipById,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RelationsList)