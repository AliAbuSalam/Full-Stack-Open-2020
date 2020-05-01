import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
	const [selected, setSelected] = useState(Math.floor(Math.random()*props.anecdotes.length));
	const arrayToCreateVoteArray = [];
	for(let i = 0; i < props.anecdotes.length; i++){
		arrayToCreateVoteArray.push(0);
	}
	const [voteArray, setVoteArray] = useState([...arrayToCreateVoteArray]);
	const [indexOfHighestVotedAnecdote, setIndexOfHighestVotedAnecdote] = useState(0);

	const voteAnecdote = () => {
		const copyOfVoteArray = [...voteArray];
		copyOfVoteArray[selected]++; 
		setVoteArray(copyOfVoteArray);
		mostVotedAnecdote(copyOfVoteArray);
	}

	const mostVotedAnecdote = (copyOfVoteArray) => {
		let highestVote = 0;
		for(let i = 0; i < copyOfVoteArray.length; i++){
			if(copyOfVoteArray[i] > copyOfVoteArray[highestVote]){
				highestVote = i;
			}
		}
		setIndexOfHighestVotedAnecdote(highestVote);
	}

	const randomAnecdote = () => {
		setSelected(Math.floor(Math.random()*props.anecdotes.length));
	}
	return(
		<div>
			<h1>Anecdote of the day</h1>
			{props.anecdotes[selected]}<br/>
			has {voteArray[selected]} vote <br/>
			<button onClick = {voteAnecdote}>vote</button>
			<button onClick = {randomAnecdote}>next anecdote</button> <br/>
			<h1>Anecdote with most votes</h1>
			{props.anecdotes[indexOfHighestVotedAnecdote]}
		</div>
		);
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));