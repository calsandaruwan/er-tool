import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    _generateMatrix,
    _getEndPointsByRelationship,
    _setNonWalkableAreas
} from "../../../helpers/entityDiagram";
const PF = require('pathfinding');

class Relationships extends Component {
    constructor() {
        super();
        this.state = {
            paths: []
        }
    }

    componentDidMount() {
        this.setPaths();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.activeDiagram !== prevProps.activeDiagram) {
            this.setPaths();
        }
    }

    render() {
        return (
            <svg style={{position: 'absolute', width: '100%', height: '100%', zIndex: 900}}>
                {
                    this.state.paths.map((relationship, index) => {
                        if (relationship && relationship.length) {
                            return relationship.map((coordinates, index) => {
                                const nextCoordinate = relationship[index + 1];
                                if (nextCoordinate) {
                                    return (
                                        <g key={index}>
                                            {
                                                relationship.length - 2 === index
                                                    ?
                                                    <defs>
                                                        <marker id={"triangle" + index}
                                                                viewBox="0 0 10 10"
                                                                refX="1"
                                                                refY="5"
                                                                markerUnits="strokeWidth"
                                                                markerWidth="10"
                                                                markerHeight="10"
                                                                orient="auto">
                                                            <path d="M 0 0 L 10 5 L 0 10 z" fill='rgb(0,255,0)'/>
                                                        </marker>
                                                    </defs>
                                                    : null
                                            }
                                            <line x1={coordinates[0]}
                                                  y1={coordinates[1]}
                                                  x2={nextCoordinate[0]}
                                                  y2={nextCoordinate[1]}
                                                  style={{stroke: 'rgb(0,255,0)', strokeWidth: '1'}}
                                                  marker-end={"url(#triangle" + index + ")"}/>
                                        </g>
                                    )
                                }
                                return null;
                            })
                        }
                        return null;
                    })
                }
            </svg>
        )
    }

    setPaths = () => {
        _generateMatrix()
            .then((matrix) => {
                let grid = new PF.Grid(matrix);

                // setting paths
                const {tables, relationships} = this.props.activeDiagram;
                _setNonWalkableAreas(grid, tables, relationships)
                    .then((mappedGrid) => {
                        const finder = new PF.BiAStarFinder({
                            allowDiagonal: false,
                            heuristic: PF.Heuristic.manhattan
                        });

                        let paths = [];
                        for (let i = 0; i < this.props.activeDiagram.relationships.length; i++) {
                            const relationship = this.props.activeDiagram.relationships[i];
                            const coordinates = _getEndPointsByRelationship(relationship);
                            const newGrid = mappedGrid.clone();
                            let path = finder.findPath(coordinates.from.x,
                                coordinates.from.y,
                                coordinates.to.x,
                                coordinates.to.y,
                                newGrid);

                            const newPath = PF.Util.smoothenPath(newGrid, path);
                            paths.push(newPath);

                        }
                        this.setState({paths});
                    });
            });
    };
}

const mapStateToProps = state => {
    return ({
        activeDiagram: state.entityDiagram.activeDiagram,
    });
};

export default connect(mapStateToProps)(Relationships)