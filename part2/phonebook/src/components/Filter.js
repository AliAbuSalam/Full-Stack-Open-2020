import React from 'react';

const Filter = (props) => {
    return(
        <>
            <form onSubmit = {(event) => event.preventDefault()}>
                <div>filter shown with <input onChange = {props.onChange} value = {props.value} /></div>
            </form>
        </>
    );
}

export default Filter;