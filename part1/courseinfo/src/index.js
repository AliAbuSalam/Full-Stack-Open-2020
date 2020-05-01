import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
	return(
	<div>
		<h1>{props.course.name}</h1>
	</div>
	);
}

const Parts = (props) => {
	return(
		<div>
			<p>{props.part} {props.exercise}</p>
		</div>
		)
}

const Content = (props) => {
	return(
		<div>
			<Parts part={props.part.parts[0].name} exercise={props.part.parts[0].exercise}/>
			<Parts part={props.part.parts[1].name} exercise={props.part.parts[1].exercise}/>
			<Parts part={props.part.parts[2].name} exercise={props.part.parts[2].exercise}/>
		</div>
		);
}
const Total = (props) => {
	var sum = 0;
	props.exercises.parts.forEach(exercise => sum+= exercise.exercise);
	return <p>Number of exercises {sum}</p>;
}
const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		{
			name: 'Fundamental of React',
			exercise: 10
		},
		{
			name: "Using props to pass data",
			exercise: 7
		},
		{
			name: "State of a component",
			exercise: 14
		}
		]
	};
	

	return (
		<div>
			<Header course={course}/>
			<Content part ={course} />
			<Total exercises={course}/>
		</div>
		);
}
ReactDOM.render(<App />, document.getElementById('root'));

