import React from 'react';
import PropTypes from 'prop-types';
import s from "./filters.module.css";

function filters(props) {
    return (
        <footer>
            <div className={s.button}>
            <label>
                <input
                    type="button"
                    value="all"
                    name="chekedState"
                    onClick={props.getFilterState}
                />
            </label>
            <label>
                <input
                    type="button"
                    value="completed"
                    name="chekedState"
                    onClick={props.getFilterState}
                />
            </label>
            <label>
                <input
                    type="button"
                    value="active"
                    name="chekedState"
                    onClick={props.getFilterState}
                />
            </label>
            </div>
        </footer>
    )
}

filters.propTypes = {
    getFilterState: PropTypes.func
};

export default filters;
