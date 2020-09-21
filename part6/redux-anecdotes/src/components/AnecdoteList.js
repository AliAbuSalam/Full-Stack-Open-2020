import React from 'react';
import { connect } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    if(props.notificationId !== null){
      clearTimeout(props.notificationId.timeoutId);
    }
    props.voteAnecdote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
    clearTimeout(2);
  };

  return(
    <div>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log('state: ', state);

  return {
    anecdotes: state.filter === '' 
      ? state.anecdotes
      : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())),
    filter: state.filter,
    notificationId: state.notificationMessage
  };
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);

export default ConnectedAnecdoteList;