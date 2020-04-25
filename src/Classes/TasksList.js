import React, { Component } from 'react';
import ListItem from "./ListItem";
import {Table} from 'react-bootstrap';

export default class TasksList extends Component{
	render(){
		//Retrieves the properties
		const {items, done, markAsDone, deleteTask, handleOpenModal} = this.props;
		
		return(
			<Table hover>
				<tbody>
					{items.map(item =>{
						return <ListItem 
							key={item.id} 
							id={item.id} 
							title={item.Title} 
							done={done} 
							markAsDone={markAsDone} 
							deleteTask={deleteTask} 
							handleOpenModal={handleOpenModal}/>;
					})}
				</tbody>
			</Table>
		);
	}
}