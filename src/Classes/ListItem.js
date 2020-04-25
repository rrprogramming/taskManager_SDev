import React, { Component } from 'react';

export default class ListItem extends Component{
	render(){
		//Retrieves the properties
		const {id, title, done, markAsDone, deleteTask, handleOpenModal} = this.props;
		
		//The onClick function and icons change in behalf of the task "done"
		if(!done){
			return(
				<tr className="animated fadeInLeft">
				    <td width="90%" onClick={() => {handleOpenModal(id,0)}}>
				      	<h4 className="mb-1">{title}</h4>
				    </td>
				    <td>
				      	<span className="btn btn-lrg" onClick={() => { markAsDone(id) }}>
				                <span className="glyphicon glyphicon-ok" aria-hidden={true}></span>
				        </span>
				    </td>
				</tr>
			);
		}else{
			return(
				<tr className="animated fadeInRight">
				    <td width="90%" onClick={() => {handleOpenModal(id,1)}}>
				      	<h4 className="mb-1">{title}</h4>
				    </td>
				    <td>
				      	<span className="btn btn-lrg" onClick={() => { deleteTask(id) }}>
				                <span className="glyphicon glyphicon-trash" aria-hidden={true}></span>
				        </span>
				    </td>
				</tr>
			);
		}
	}
}