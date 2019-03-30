import React from "react";
import PropTypes from 'prop-types';
import s from './header.module.css';

function header (props) {
        return(
            <form onSubmit={props.handleSubmit} >
                    <main className={s.header}>
                    <h3 className={s.h3}>Todo React</h3>
                    </main>
                <div className={s.betweenItems}>
                    <input
                          className={s.input}
                           placeholder="Task..."
                           ref={props.inputRef}
                           value={props.text}
                           onChange={props.onHandlerChange}
                    />
                    <button className={s.button}>add</button>
                </div>
            </form>
        )
}

header.propTypes = {
    handleSubmit: PropTypes.func,
    ref: PropTypes.object,
    value: PropTypes.string,
    onHandlerChange: PropTypes.func
};

export default header;