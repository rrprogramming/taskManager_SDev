import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

export default class NewTaskManager extends Component{
	render(){
		//Retrieves the properties
		const {title,description,handleTitleChange,handleDescriptionChange,handleSubmit} = this.props;
		return(
			<Jumbotron>
				<h3 align="center">Create new task</h3>
				<Form align="center" onSubmit={handleSubmit}>
					<Form.Control as="textarea" rows="1" placeholder="Task Title" value={title} onChange={handleTitleChange}/><br/>
					<Form.Control as="textarea" rows="10" placeholder="Task Description" value={description} onChange={handleDescriptionChange}/><br/>
					<br/>
					<Button type="submit" variant="primary">
						Save New Task
					</Button>
				</Form>
			</Jumbotron>
		);
	}
}