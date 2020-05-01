import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({goodState, neutralState, badState, allState, averageState, percentageState}) => {
	if(allState === 0){
		return(
			<div>
				<h1>statistics</h1>
				No feedback given
			</div>
			);
	}
	return(
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<tr>
						<Statistic text='good' value={goodState} />
					</tr>
					<tr>
						<Statistic text='neutral' value={neutralState} />
					</tr>
					<tr>
						<Statistic text='bad' value={badState} />
					</tr>
					<tr>
						<Statistic text='all' value={allState} />
					</tr>
					<tr>
						<Statistic text='average' value={averageState} />
					</tr>
					<tr>
						<Statistic text='percentage' value={percentageState + '%'} />
					</tr>
				</tbody>
			</table>
		</div>
		);		
}



const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);
	const [average, setAverage] = useState(0);
	const [positivePercentage, setPositivePercentage] = useState(0);

	const handleGood = () => {
		const propsArray = [1,0,1];
		setAll(all + 1);
		setGood(good + 1);
		handleAverage(propsArray);
		handlePercentage(propsArray);
	}
	const handleNeutral = () => {
		const propsArray = [0,0,1];
		setAll(all + 1);
		setNeutral(neutral + 1);
		handleAverage(propsArray);
		handlePercentage(propsArray);
	}
	const handleBad = () => {
		const propsArray = [0,1,1];
		setAll(all + 1);
		setBad(bad + 1);
		handleAverage(propsArray);
		handlePercentage(propsArray);
	}
	const handleAverage = (averagePropsArray) => {
		setAverage(((good + averagePropsArray[0])- (bad + averagePropsArray[1]))/(all + averagePropsArray[2]));
	}
	const handlePercentage = (percentagePropsArray) => {
		setPositivePercentage(((good + percentagePropsArray[0])*100)/(all + percentagePropsArray[2]));
	}

	return(
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGood} text={'good'}/>
			<Button handleClick={handleNeutral} text={'neutral'} />
			<Button handleClick={handleBad} text={'bad'} />
			<Statistics goodState = {good} neutralState = {neutral} badState = {bad} allState = {all} averageState = {average} percentageState = {positivePercentage} />
		</div>
		);
}
const Statistic = (props) => {
	return(
		<>
			<td>{props.text}</td>
			<td>{props.value}</td>	
		</>
		);
}
const Button = (props) => {
	return(
		<>
			<button onClick={props.handleClick}>{props.text}</button>
		</>
		);
}

ReactDOM.render(<App />, document.getElementById('root'));