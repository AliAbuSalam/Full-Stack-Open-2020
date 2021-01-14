import React from 'react';
import CoursePart from '../types';

interface PartProps {
  courses: CoursePart[]
}

const Part: React.FC<PartProps> = ({ courses }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${value}`
    );
  };
  return(
    <div>
      {courses.map(part => {
        switch(part.name){
          case 'Fundamentals':
            return (
              <p>
                <div>name: {part.name}</div>
                <div>exercise count: {part.exerciseCount}</div>
                <div>description: {part.description}</div>
              </p>
            );
          case 'Using props to pass data':
            return (
              <p>
                <div>name: {part.name}</div>
                <div>exercise count: {part.exerciseCount}</div>
                <div>group project count: {part.groupProjectCount}</div>
              </p>
            );
          case 'Deeper type usage':
            return (
              <p>
                <div>name: {part.name}</div>
                <div>exercise count: {part.exerciseCount}</div>
                <div>description: {part.description}</div>
                <div>exercise submission link: {part.exerciseSubmissionLink}</div>
              </p>
            );
          case 'Algorithm and data structures':
            return(
              <p>
                <div>name: {part.name}</div>
                <div>exercise count: {part.exerciseCount}</div>
                <div>description: {part.description}</div>
                <div>material download link: {part.materialDownloadLink}</div>
              </p>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Part;