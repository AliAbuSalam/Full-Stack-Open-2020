import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case 'VOTE':
      const votedAnecdote = action.data;
      
      return state.map(anecdote => anecdote.id !== votedAnecdote.id? anecdote: votedAnecdote)
        .sort((an1, an2) => an2.votes - an1.votes);
    case 'ADD':
      return state.concat(action.data).sort((an1,an2) => an2.votes - an1.votes);
    case 'INIT_ANECDOTES':
      const listOfAnecdotes = action.data;
      return listOfAnecdotes.sort((an1,an2) => an2.votes - an1.votes);
    default:
      return state;
  }
}

export const addNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'ADD',
      data: newAnecdote
    });
  };
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.updateAnecdote(anecdote);
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const listOfAnecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: listOfAnecdotes
    });
  };
};

export default reducer