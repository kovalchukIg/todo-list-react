import React from "react";
import s from "./todoList.module.css";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

let cx = classNames.bind(s);

function todoList (props) {
    const classes = cx("none",
                        "between",
                        "lineUp",  {done: props.stateCompleted,
                                    completed: props.stateFilter === "active" && props.stateCompleted,
                                    active: props.stateFilter === "completed" && !props.stateCompleted
    });
    return (
                <li key={props.id} className={classes}>
                        <div onClick={props.handlerCompleted}>{props.text}</div>
                        <div className={s.prop}>
                            <button onClick={props.deleteItem} className={s.button}>Delete</button>
                        </div>
                </li>
    )

}

todoList.propTypes = {
    stateCompleted: PropTypes.bool,
    deleteItem: PropTypes.func,
    handlerCheckbox: PropTypes.func,
    id: PropTypes.number,
    stateFilter: PropTypes.string,
    text: PropTypes.string
};

export default todoList;