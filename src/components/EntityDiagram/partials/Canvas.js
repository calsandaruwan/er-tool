import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

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
        this.setState({tableCoordinates});
    };

    onDragOver = (e) => {
        e.preventDefault();
    };

    renderTableNotations = () => {
        let tblNotation = Object.assign({}, this.state.tempStyles.tblNotation);
        tblNotation.left = this.state.tableCoordinates.x;
        tblNotation.top = this.state.tableCoordinates.y;

        return (
            <div style={tblNotation}>
                hey there
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        lastActiveDrag: state.entityDiagram.lastActiveDrag,
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //action1,
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)