import React, {useContext, useEffect, useState} from 'react';
import classes from './Header.module.css'
import AppContext from "../../../context/Context";
import {floor} from "lodash";

const Header = () => {

    const Heap = require('heap');

    const [visited, setVisited] = useState([]);
    const [path, setPath] = useState([]);
    const [visualizing, setVisualizing] = useState(false);

    const {value1, value2, value3} = useContext(AppContext);
    const [matrix, setMatrix] = value1;
    const [start, setStart] = value2;
    const [target, setTarget] = value3;

    useEffect(() => {
        if (start && target && matrix) {
            setPath([]);
            setVisited([]);
            const copy = JSON.parse(JSON.stringify(matrix));
            setPath(astar(copy, start, target));
        }
    }, [start, target, matrix]);


    const astar = (grid, start, target) => {

        let openList = new Heap(function (nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        });

        start.f = 0;
        start.g = 0;

        openList.push(start);
        start.opened = true;

        while (!openList.empty()) {
            let node = openList.pop();
            node.closed = true;

            if (node.x === target.x && node.y === target.y) {
                return traceBack(node);
            }

            let neighbors = neighbours(grid, node);
            for (let neighbor of neighbors) {
                if (neighbor.closed) continue;

                let ng = node.g + neighbor.weight;
                if (!neighbor.opened || ng < neighbor.g) {
                    neighbor.g = ng;
                    neighbor.h = neighbor.h || heuristic(neighbor, target);
                    neighbor.f = neighbor.g + neighbor.h;
                    neighbor.parent = node;

                    if (!neighbor.opened) {
                        openList.push(neighbor);
                        visited.push(node);
                        neighbor.opened = true;
                    } else {
                        openList.updateItem(neighbor);
                        setVisited([...visited, node]);
                    }
                }
            }
        }
        return [];
    };

    const traceBack = (node) => {
        const path = [node];
        while (node.parent) {
            node = node.parent;
            path.unshift(node);
        }
        return path;
    };

    const neighbours = (matrix, node) => {
        const ret = [];
        let x = node.x;
        let y = node.y;
        //West
        if (matrix[x - 1] && matrix[x - 1][y] && !matrix[x - 1][y].blocked) {
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
        setVisualizing(false);
        setPath([]);
        setVisited([]);
        const copy = JSON.parse(JSON.stringify(matrix));
        for (let row of copy) {
            for (let node of row) {
                node.blocked = false;
                node.path = false;
                node.visited = false;
                node.closed = false;
                node.opened = false;
            }
        }
        setMatrix(copy);
    };

    const onVisualize = () => {
        setVisualizing(true);
        const copy = JSON.parse(JSON.stringify(matrix));
        for (let node of visited) {
            copy[node.x][node.y].visited = true;
            setMatrix(copy);
        }
        for (let node of path) {
            copy[node.x][node.y].path = true;
            setMatrix(copy);
        }
        setPath([]);
        setVisited([]);
        setVisited([]);
    };

    const sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };


    return (
        <div className={classes.Header}>
            <span className={classes.inline}><h3>Path finder</h3></span>
            <span className={classes.inline}>
                <button className={classes.Button} onClick={onVisualize}>VISUALIZE A*</button>
            </span>
            <span className={classes.inline}>
               <button className={classes.Button} onClick={onClickHandler}>CLEAR GRID</button>
            </span>
            <span className={classes.inline}>
                <p style={{fontSize: 20}}>Build or remove walls by clicking the tiles</p>
                <p style={{fontSize: 20}}>Move starting and ending points anywhere you want</p>
            </span>
        </div>
    );
};


export default Header;