import React from "react";

export default props => (
    <form onSubmit={props.handleSubmit}>
        <h3>Todo</h3>
        <label htmlFor="new-todo">what needs to be done?</label>
        <input id="new-todo"
               ref={props.inputRef}
               value={props.text}
               onChange={props.onHandlerChange}
        />
        <button>add</button>
    </form>
)