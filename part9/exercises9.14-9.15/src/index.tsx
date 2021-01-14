import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import Part from './components/Part';
import CoursePart from './types';


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Algorithm and data structures",
      exerciseCount: 14,
      description: "Course about different kinds of algorithm and data structures",
      materialDownloadLink: "https://fake-material-download.made-up-url.edu"
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Part courses={courseParts}/>
      <Content courseParts = {courseParts}/>
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
