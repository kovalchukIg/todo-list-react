import React from "react";
import PropTypes from 'prop-types';
import s from './header.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
                           onChange={props.onHandleChange}
                    />
                    <DatePicker
                        className={s.input}
                        selected={props.select}
                        onChange={props.change}
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy"
                        timeCaption="time"
                    />
                    <button onClick={props.openModal} className={s.button}>add</button>
                </div>
            </form>
        )
}

header.propTypes = {
    select: PropTypes.object,
    change: PropTypes.func,
    openModal: PropTypes.func,
    handleSubmit: PropTypes.func,
    ref: PropTypes.object,
    value: PropTypes.string,
    onHandlerChange: PropTypes.func
};

export default header;