import React, { Component } from 'react';
import TasksList from './Classes/TasksList';
import NewTaskManager from './Classes/NewTaskManager';
import {Container} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			TodoItems: [], 	//An array containing all the Todo tasks
			DoneItems: [], 	//An array containing all the Done tasks
			id: Date.now(),	//A unique id is generated using the current Timestamp
			Desc: '',		//The description attribute of the task
			Title: '',		//The Title attribute of the task
			done: false,	//Indicates wheter the task is complete or not
			show: false		//indicates where the Modal should be visible or not
		}
	}

	//Retrieves the previously saved states as the App initializes
	componentDidMount(){
		const jsonTodo = localStorage.getItem('TodoItems');
	    const SavedTodoItems = JSON.parse(jsonTodo);
	    if(SavedTodoItems){
	    	this.setState(() => ({ 
	    	TodoItems:SavedTodoItems}));
	    }

	    const jsonDone = localStorage.getItem('DoneItems');
	    const SavedDoneItems = JSON.parse(jsonDone);
	    if(SavedDoneItems){
	    	this.setState(() => ({ 
	    	DoneItems:SavedDoneItems}));
	    }
	}

	//If the state updates stores the current state of the App (only stores the task lists)
	componentDidUpdate(prevProps, prevStates){
		const jsonTodo = JSON.stringify(this.state.TodoItems);
		const jsonDone = JSON.stringify(this.state.DoneItems);
    	localStorage.setItem('TodoItems', jsonTodo);
    	localStorage.setItem('DoneItems', jsonDone);
	}

	//Handles the onChange attribute of the input field of the Title
	handleTitleChange = (e) => {
		this.setState({ Title: e.target.value });
	};

	//The funcion handles the onChange attribute of the input field of the Desription of the task
	handleDescriptionChange = (e) => {
		this.setState({ Desc: e.target.value });
	}

	//Function that sorts the lists' items in alphabetical order by Title
	sortItems = (entry_items) =>{
		return entry_items.sort((a,b)=>(a.Title>b.Title) ? 1 : -1);
	}

	//Returns the index of a specified task's id on a task's list
	getIndex = (value, arr) =>{
	    for(var i = 0; i < arr.length; i++) {
	        if(arr[i]['id'] === value) {
	            return i;
	        }
	    }
	    return -1; //to handle the case where the value doesn't exist
	}

	//Sets the entered task as done
	markAsDone = (value) =>{
		const cpy_TodoItems = [...this.state.TodoItems];
		const index = this.getIndex(value,cpy_TodoItems);
		if (index !== -1) {
			const updatedDoneItems = this.sortItems([...this.state.DoneItems,cpy_TodoItems[index]]);
			cpy_TodoItems.splice(index, 1);
			
			this.setState({
				DoneItems: updatedDoneItems,
				TodoItems: cpy_TodoItems
				});
		}
	}

	//Deletes the entered Task
	deleteTask = (value) =>{
		const cpy_Items = [...this.state.DoneItems];
		const index = this.getIndex(value,cpy_Items);
		if (index !== -1) {
			cpy_Items.splice(index, 1);
			
			this.setState({
				DoneItems: cpy_Items
				});
		}
	}

	//This function handles the submit of a new task
	submitNewTask = (e) => {
		e.preventDefault();
		//Check if task is not empty before saving
		if(this.state.Title && this.state.Title != ""){
			//Creates the new task item
			const newItem = {
				id:this.state.id,
				Title: this.state.Title,
				Desc: this.state.Desc
			}
			
			//Concatenates and sorts out the new item into the Todo tasks' list
			const updatedItems = this.sortItems([...this.state.TodoItems,newItem]);

			//Updates the state of the component
			this.setState({
				TodoItems:updatedItems,
				Desc:"",
				id:Date.now(),
				Title:""
			});
		}
	};

	//This function closes the Modal
	handleCloseModal = () =>{
		this.setState({
			show:false,
			Desc:"",
			Title:""
		});
	}

	//This function opens the modal with the description of the selected task
	handleOpenModal = (id, list) =>{
		var index;
		var item;
		// 0 means the modal comes from a Todo Item
		if(list==0){
			index = this.getIndex(id,this.state.TodoItems);
			item = this.state.TodoItems[index];
		// 1 is for items in the a Done List
		}else{
			index = this.getIndex(id,this.state.DoneItems);
			item = this.state.DoneItems[index];
		}

		this.setState({
				Title: item.Title,
				Desc: item.Desc,
				show: true
			});
	}

	render(){
  		if(this.state.TodoItems && this.state.TodoItems.length > 0){
		  	return (
		  		<Container fluid align="center">
		    		<h3>To do...</h3>
		    		<TasksList 
		    			items={this.state.TodoItems} 
		    			done={false} 
				  		markAsDone={this.markAsDone}
				  		deleteTask={this.deleteTask}
				  		handleOpenModal={this.handleOpenModal}/>
					<br/>
			  		<h3>Done</h3>
				  	<TasksList 
				  		items={this.state.DoneItems} 
				  		done={true} 
				  		markAsDone={this.markAsDone}
				  		deleteTask={this.deleteTask}
				  		handleOpenModal={this.handleOpenModal}/>
				  	<br/>
		    		<NewTaskManager 
		    			title={this.state.Title} 
		    			description={this.state.Desc} 
		    			handleTitleChange={this.handleTitleChange} 
		    			handleDescriptionChange={this.handleDescriptionChange} 
		    			handleSubmit={this.submitNewTask}/>


		    		<Modal show={this.state.show} onHide={this.handleCloseModal} animation={false}>
		    			<Modal.Header>
				        	<Modal.Title align="center">{this.state.Title}</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>{this.state.Desc}</Modal.Body>
				        <Modal.Footer>
				          	<Button variant="primary" onClick={() => {this.handleCloseModal()}}>
				            	Ok
				          	</Button>
				        </Modal.Footer>
		    		</Modal>
				</Container>
		  	);
		} else{
			return (
		  		<Container fluid align="center">
		    		<h1>Hooray! You have no tasks in your To Do list!</h1>
					<br/>
			  		<h3>Done</h3>
				  	<TasksList 
				  		items={this.state.DoneItems} 
				  		done={true} 
				  		markAsDone={this.markAsDone}
				  		deleteTask={this.deleteTask}
				  		handleOpenModal={this.handleOpenModal}/>
		    		<NewTaskManager 
		    			title={this.state.Title} 
		    			description={this.state.Desc} 
		    			handleTitleChange={this.handleTitleChange} 
		    			handleDescriptionChange={this.handleDescriptionChange} 
		    			handleSubmit={this.submitNewTask}/>

		    		<Modal show={this.state.show} onHide={this.handleCloseModal} animation={false}>
		    			<Modal.Header>
				        	<Modal.Title>{this.state.Title}</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>{this.state.Desc}</Modal.Body>
				        <Modal.Footer>
				          	<Button variant="primary" onClick={this.handleCloseModal}>
				            	Ok
				          	</Button>
				        </Modal.Footer>
		    		</Modal>
				</Container>
		  	);
		}
	}
}

export default App;
