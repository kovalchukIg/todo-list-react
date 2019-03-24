import React from "react";

export default props => (
    <ul>
            <li key={props.id}>
                {props.text}
                <input type="checkbox" onChange={props.handlerCheckbox}/>
                <button onClick={props.deleteItem}>Delete</button>
            </li>
    </ul>
)