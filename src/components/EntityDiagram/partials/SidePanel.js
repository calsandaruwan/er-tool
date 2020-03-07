import React, {Component} from 'react';
import {connect} from 'react-redux';
import RelationsList from "./RelationsList";
import TableList from "./TableList";

class SidePanel extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <TableList getSelectedTables={this.props.getSelectedTables}/>
                <RelationsList/>
            </div>
        )
    }
}

export default connect(null, null)(SidePanel)