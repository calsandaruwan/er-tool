import React, {Component} from 'react';
import { connect } from 'react-redux';
import HeaderButtons from "./HeaderButtons";

class DefaultLayout extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h3 className="m-0 text-dark">
                                        Er Tool - &nbsp;<small>Version 1.0</small>
                                    </h3>
                                </div>
                                <div className="col-sm-6">
                                    <HeaderButtons/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        // givenName: state.path.to.reducer.key
    });
};

export default connect(mapStateToProps)(DefaultLayout)