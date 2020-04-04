import React, {useContext, useEffect, useState} from 'react';
import Node from "./node/Node";
import classes from './Matrix.module.css';
import {floor} from "lodash";
import AppContext from "../../context/Context";

const Matrix = ({rows, cols}) => {

    const [mouseDown, setMouseDown] = useState(false);
    const [startSelected, setStartSelected] = useState(false);
    const [targetSelected, setTargetSelected] = useState(false);
    const {value1, value2, value3} = useContext(AppContext);
    const [matrix, setMatrix] = value1;
    const [start, setStart] = value2;
    const [target, setTarget] = value3;

    useEffect(() => {

        // const i = [floor(rows/2), floor(cols/4)];
        // const j = [floor(rows/2), floor(3*cols/4)];

        const i = [Math.floor(Math.random() * 25), Math.floor(Math.random() * 10)];
        const j = [Math.floor(Math.random() * 25), Math.floor(Math.random() * 10) + 40];
        let copy = Array.from({length: rows}, () =>
            Array.from({length: cols}, () => null));
        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < copy[i].length; j++) {
                copy[i][j] = {
                    x: i,
                    y: j,
                    visited: false,
                    path: false,
                    blocked: Math.random() < 0.2,
                    weight: 1,
                    start: false,
                    target: false
                };
            }
        }
        copy[i[0]][i[1]].start = true;
        copy[j[0]][j[1]].target = true;
        setTarget(copy[j[0]][j[1]]);
        copy[j[0]][j[1]].blocked = false;
        setStart(copy[i[0]][i[1]]);
        copy[i[0]][i[1]].blocked = false;
        setMatrix(copy);
    }, []);

    const onHoverHandler = (i, j) => {
        if(mouseDown) {
            const copy = JSON.parse(JSON.stringify(matrix));
            if (!copy[i][j].start && !copy[i][j].target && !startSelected && !targetSelected) {
                copy[i][j].blocked = !copy[i][j].blocked;
            } else if (startSelected) {
                if(!copy[i][j].target) {
                    copy[start.x][start.y].start = false;
                    copy[i][j].start = true;
                    setStart(copy[i][j]);
                }
            } else if(targetSelected) {
                if(!copy[i][j].start) {
                    copy[target.x][target.y].target = false;
                    copy[i][j].target = true;
                    setTarget(copy[i][j]);
                }
            }
            setMatrix(copy);
        }
    };

    const onClickHandler = (e, i, j) => {
        e.preventDefault();
        const copy = JSON.parse(JSON.stringify(matrix));
        if (!copy[i][j].start && !copy[i][j].target) {
            copy[i][j].blocked = !copy[i][j].blocked;
            setMatrix(copy);
        } else if (copy[i][j].start) {
            setStartSelected(true);
            //copy[i][j].start = false;
        } else if (copy[i][j].target) {
            setTargetSelected(true);
            //copy[i][j].target = false;
        }
    };

    const onReleasedHandler = (i, j) => {
        const copy = JSON.parse(JSON.stringify(matrix));
        if(startSelected) {
            setStartSelected(false);
            copy[i][j].blocked = false;
            setMatrix(copy);
        } else if(targetSelected) {
            setTargetSelected(false);
            copy[i][j].blocked = false;
            setMatrix(copy);
        }
    };

    return (
        <div className={classes.Matrix}
             onMouseUp={() => setMouseDown(false)}
             onMouseDown={() => setMouseDown(true)}
        >
            {matrix.map((row, rowIndex) => (
                <div key={rowIndex} className={classes.row}>
                    {row.map((column, columnIndex) => (
                        <div className={classes.column} key={columnIndex}>
                            <Node
                                x={rowIndex} y={columnIndex}
                                {...matrix[rowIndex][columnIndex]}
                                hovered={() => onHoverHandler(rowIndex, columnIndex)}
                                clicked={(event) => onClickHandler(event, rowIndex, columnIndex)}
                                released={() => onReleasedHandler(rowIndex, columnIndex)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Matrix;