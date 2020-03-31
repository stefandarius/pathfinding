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

        const startCopy = [floor(rows/2), floor(cols/4)];
        const targetCopy = [floor(rows/2), floor(3*cols/4)];
        let copy = Array.from({length: rows}, () =>
            Array.from({length: cols}, () => null));
        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < copy[i].length; j++) {
                copy[i][j] = {
                    x: i,
                    y: j,
                    visited: false,
                    path: false,
                    near: false,
                    blocked: false,
                    weight: 1,
                    start: false,
                    target: false
                };
            }
        }
        copy[startCopy[0]][startCopy[1]].start = true;
        copy[targetCopy[0]][targetCopy[1]].target = true;
        setTarget(targetCopy);
        setMatrix(copy);
        setStart(startCopy);
    }, []);

    const onHoverHandler = (i, j) => {
        if(mouseDown) {
            const copy = [...matrix];
            if (!copy[i][j].start && !copy[i][j].target && !startSelected && !targetSelected) {
                copy[i][j].blocked = !copy[i][j].blocked;
                setMatrix(copy);
            }
        }
    };

    const onClickHandler = (e, i, j) => {
        e.preventDefault();
        const copy = [...matrix];
        if (!copy[i][j].start && !copy[i][j].target) {
            copy[i][j].blocked = !copy[i][j].blocked;
        } else if (copy[i][j].start) {
            setStartSelected(true);
            copy[i][j].start = false;
        } else if (copy[i][j].target) {
            setTargetSelected(true);
            copy[i][j].target = false;
        }
        setMatrix(copy);
    };

    const onReleasedHandler = (i, j) => {
        const copy = [...matrix];
        if(startSelected) {
            if(copy[i][j].target) {
                copy[start[0]][start[1]].start = true;
            } else {
                copy[i][j].blocked = false;
                copy[i][j].start = true;
                setStart([i,j]);
            }
            setStartSelected(false);
        }
        if(targetSelected) {
            if(copy[i][j].start) {
                copy[target[0]][target[1]].target = true;
            } else {
                copy[i][j].blocked = false;
                copy[i][j].target = true;
                setTarget([i,j]);
            }
            setTargetSelected(false);
        }
        setMatrix(copy);
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