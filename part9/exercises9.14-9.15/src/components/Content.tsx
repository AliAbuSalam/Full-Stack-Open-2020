import React from 'react';

interface CoursePartProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[]
}

const Content: React.FC<CoursePartProps> = ({ courseParts }) => (
  <>
    <p>
      {courseParts[0].name} {courseParts[0].exerciseCount}
    </p>
    <p>
      {courseParts[1].name} {courseParts[1].exerciseCount}
    </p>
    <p>
      {courseParts[2].name} {courseParts[2].exerciseCount}
    </p>
  </>
)

export default Content;