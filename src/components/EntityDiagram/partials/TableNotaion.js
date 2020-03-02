import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {removeToActiveDiagramTable} from "../../../actions/entityDiagramActions";

class TableNotation extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const style = this.reComputeStyles();
        return (
            <div key={this.props.table.name} style={style}
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
                                    <li key={index} className="nav-item active">
                                        <div className="btn btn-block text-left">
                                            <i className="fas fa-inbox"></i> {column.field}
                                            <span
                                                className="badge bg-primary float-right">{index}</span>
                                        </div>
                                    </li>
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
}

const mapStateToProps = state => {
    return ({
        // givenName: state.path.to.reducer.key
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeToActiveDiagramTable
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableNotation)