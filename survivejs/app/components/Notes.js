import React from 'react';
import Note from './Note.js';

export default class Notes extends React.Component {
	constructor(props) {
	    super(props);
	    this.renderNote = this.renderNote.bind(this);
	}

	render() {
		let notes = this.props.items;
		
		return <ul className="notes">{notes.map(this.renderNote)} </ul>;
		
	}
	renderNote(note) {
		return (
			<li className="note" key={note.id}>
				<Note
				    task={note.task}
				    onEdit={this.props.onEdit.bind(null, note.id)}
				    onDelete={this.props.onDelete.bind(null, note.id)}
				    />
			</li>	
			
		);
	}
}