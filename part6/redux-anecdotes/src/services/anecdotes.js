import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (anecdoteContent) => {
  const anecdote = {
    content: anecdoteContent,
    votes: 0
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const updateAnecdote = async (anecdote) => {
  const anecdoteWithUpdatedVotes = { ...anecdote, votes: anecdote.votes+1};
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdoteWithUpdatedVotes);
  return response.data;
};

export default {
  getAll,
  createNew,
  updateAnecdote
};