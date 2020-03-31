import React, {useContext, useEffect, useState} from 'react';
import classes from './Header.module.css'
import AppContext from "../../../context/Context";
import {floor} from "lodash";

const Header = () => {

    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);

    const {value1, value2, value3} = useContext(AppContext);
    const [matrix, setMatrix] = value1;
    const [start, setStart] = value2;
    const [target, setTarget] = value3;

    useEffect(() => {
        const copy = [...matrix];
        astar(copy, start, target);
    }, [matrix]);

    const astar = (copy, start, target) => {

    };

    const neighbours = (matrix, node) => {
        const ret = [];
        let x = node.x;
        let y = node.y;
        //West
        if (matrix[x - 1] && matrix[x - 1][y] && !matrix[x-1][y].blocked) {
            ret.push(matrix[x - 1][y]);
        }
        // East
        if (matrix[x + 1] && matrix[x + 1][y] && !matrix[x + 1][y].blocked) {
            ret.push(matrix[x + 1][y]);
        }
        // South
        if (matrix[x] && matrix[x][y - 1] && !matrix[x][y - 1].blocked) {
            ret.push(matrix[x][y - 1]);
        }
        // North
        if (matrix[x] && matrix[x][y + 1] && !matrix[x][y + 1].blocked) {
            ret.push(matrix[x][y + 1]);
        }
        return ret;
    };

    const heuristic = (node1, node2) => Math.abs(node2.x - node1.x) + Math.abs(node2.y - node1.y);

    const onClickHandler = () => {
        let copy = [...matrix];
        const length = copy.length;
        const length2 = copy[0].length;
        for (let i = 0; i < copy.length; i++) {
            for (let j = 0; j < copy[i].length; j++) {
                copy[i][j] = {
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
        copy[floor(length/2)][floor(length2/4)].start = true;
        copy[floor(length/2)][floor(3*length2/4)].target = true;
        setMatrix(copy);
    };

    return (
       <div className={classes.Header}>
           <span className={classes.inline}><h3>Path finder</h3></span>
           <span className={classes.inline}><button className={classes.Button}>VISUALIZE A*</button></span>
           <span className={classes.inline}>
               <button className={classes.Button} onClick={onClickHandler}>CLEAR GRID</button></span>
       </div>
    );
};


export default Header;