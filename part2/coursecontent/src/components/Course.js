import React from 'react';
import Header from './Header';
import Content from './Content';
const Course = ({course}) => {
    return(
        <div>
            <Header header = {course.name}/>
            <Content course = {course} />
        </div>
    );
}

export default Course;