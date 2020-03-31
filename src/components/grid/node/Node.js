import React from 'react';
import classes from './Node.module.css'
import classNames from 'classnames'

const Node = ({x, y, visited, near, path, blocked, weight, clicked, hovered, start, target, released}) => {

    return (
        <div
            className={classNames( {
                [classes.Node]: true,
                [classes.blocked]: blocked,
                [classes.start]: start,
                [classes.target]: target
            })}
            onMouseOver={hovered}
            onMouseDown={clicked}
            onMouseUp={released}
        >
            {/*<p>{x}, {y}</p>*/}
        </div>
    );
};

export default Node;