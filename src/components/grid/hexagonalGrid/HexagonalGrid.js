import React from 'react';
import HexagonGrid from "react-hexagon-grid";
import times from 'lodash/times';
import classes from './HexagonalGrid.module.css';

const HexagonalGrid = () => {

    const hexagons = times(513, id => id);

    const getHexProps = (hexagon) => {
        return {
            style: {
                fill: 'white',
                stroke: 'black'
            },
            onClick: () => alert(`Hexagon n.${hexagon} has been clicked`)
        };
    };

    const renderHexagonContent = (hexagon) => {
        return (
            <text
                x="50%"
                y="50%"
                fontSize={100}
                fontWeight="lighter"
                style={{fill: 'black'}}
                textAnchor="middle"
            >
                {hexagon}
            </text>
        );
    };

    return (
        <div className={classes.HexagonalGrid}>
            <HexagonGrid
                gridWidth={1400}
                gridHeight={650}
                hexagons={hexagons}
                hexProps={getHexProps}
                renderHexagonContent={renderHexagonContent}
            />
        </div>
    );
};

export default HexagonalGrid;