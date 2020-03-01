import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from "redux";

class EntityDiagram extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                Say Hi
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        // givenName: state.path.to.reducer.key
    });
};

function mapDispatchToProps (dispatch) {
    return bindActionCreators({
        //action1,
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityDiagram)