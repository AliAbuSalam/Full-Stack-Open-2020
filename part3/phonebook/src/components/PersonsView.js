import React from 'react';

const PersonsView = (props) => {

    const personsWithFilter = props.filter === ""? props.personsList : props.personsList.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()));


    return(
        <div>{personsWithFilter.map((person) => <div key = {person.id}> {person.name} {person.number}<button onClick = {() => props.deleteEntry(person)}>delete</button><br/></div>)}</div>
    );
}

export default PersonsView;