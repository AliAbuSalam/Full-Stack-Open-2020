import React from 'react';

interface CourseNameProp {
  name: string;
}

const Header: React.FC<CourseNameProp> = props => {
  return(<h1>{props.name}</h1>)
};

export default Header;