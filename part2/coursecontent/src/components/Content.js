import React from 'react';
import Part from './Part';

const Content = ({course}) => {
    console.log('This is content.js ', course);
    return(
         <div>
            {course.parts.map( part => 
                    <Part key = {part.id} content = {part} />
                )}
            <p><b> total of {course.parts.map(part => part.exercises).reduce((sum, exercise) => sum + exercise, 0)} exercises</b></p>
            
         </div>
    );
}

export default Content;