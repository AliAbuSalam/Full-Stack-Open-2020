import React from 'react';
import { connect } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault();
    const formValue = event.target.newAnecdote.value;
    props.addNewAnecdote(formValue);
    event.target.newAnecdote.value = '';
  };

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='newAnecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addNewAnecdote,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;