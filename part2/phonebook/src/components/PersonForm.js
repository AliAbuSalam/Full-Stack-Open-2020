import React from 'react';

const PersonForm = (props) => {
    return(
        <>
            <form onSubmit = {props.submit}>
                <div>name: <input onChange = {props.nameChange} value = {props.nameValue}/></div>
                <div>number: <input onChange = {props.numberChange} value = {props.numberValue}/></div>
                <button type = 'submit'>add</button>
            </form>
        </>
    );
}
export default PersonForm;