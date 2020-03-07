import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import htmlToImage from 'html-to-image'

class HeaderButtons extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        const defaultClassNames = "btn btn-primary ";
        return (
            <div className="btn-group float-right">
                <button type="button"
                        onClick={this.capture}
                        className={ this.isActive() ? defaultClassNames : defaultClassNames + 'disabled'}>
                    Capture
                </button>
                <button type="button"
                        onClick={this.save}
                        className={ this.isActive() ? defaultClassNames : defaultClassNames + 'disabled'}>
                    Save
                </button>
            </div>
        )
    }

    isActive = () => {
        if (this.props.activeDiagram && this.props.activeDiagram.tables && this.props.activeDiagram.tables.length) {
            return true
        }
        return false;
    };

    capture = () => {
        const self = this;
        htmlToImage
            .toJpeg(document.getElementById('canvas'), { quality: 0.95 })
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = self.props.activeDiagram.name+'.jpeg';
                link.href = dataUrl;
                link.click();
            });
        // const div = document.getElementbyid('canvas');
        // html2canvas(div, {
        //     onrendered: function(canvas) {
        //         theCanvas = canvas;
        //         // document.body.appendChild(canvas);
        //         // Convert and download as image
        //         Canvas2Image.saveAsPNG(canvas);
        //         // $("#img-out").append(canvas);
        //         // Clean up
        //         //document.body.removeChild(canvas);
        //     }
        // });
    };

    save = () => {
        console.info('Following object can be saved in to a db. It contains all the active tables and relationships');
        console.info('The same object can be used as a prop to regenerate the current diagram');
        console.log({activeDiagram: this.props.activeDiagram})
    };
}

const mapStateToProps = state => {
    return ({
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //action1,
        //action2,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtons)