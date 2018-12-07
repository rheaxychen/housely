import React, { Component } from 'react';

// Todo task list widget component
export default class Todo extends Component {
    constructor() {
        super();
        this.state = {
            addingTask: false,
            tasks: ['Mow the lawn', 'Do kitchen chore', 'Pay rent!']
        };
    }
  
    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
        this.addTask(event);
        }
    }
  
    newTask = () => {
        this.setState({addingTask: true})
        // $('.todo-plus').removeClass("editing");
    }
  
    addTask = (task) => {
        let toAdd = task.target.value.trim();
        if (toAdd !== "") {
            let newList = this.state.tasks;
            newList.push(toAdd);
            this.setState({
                addingTask: false,
                tasks: newList
            });
        } else {
            this.setState({
                addingTask: false
            });
        }
    }
  
    render() {
        let taskList = this.state.tasks.map((task) => {
            return <Task key={task} task={task} id={this.state.tasks.indexOf(task) + 1}/>;
        });
  
      return (
        <section id="todo" className="main-sections dash-section">
            <div className="home-section">
                <div className="section-header">
                    <h2>To-Do</h2>
                    <div>
                        <img onClick={this.newTask} className="todo-plus icon" src="img/plus.png" alt="add task" />
                    </div>
                </div>
                <div className="todo-container">
                {
                    taskList
                }
                    { this.state.addingTask &&
                    <div className="check-container">
                        <div className="round">
                            <input type="checkbox" id="temp" />
                            <label htmlFor="temp"></label>
                        </div>
                        <input onBlur={this.addTask} onKeyPress={this.handleKeyPress} className="task-input" />
                    </div>
                    }
                </div>
            </div>
        </section>
      );
    }
  }
  
  // Represents individual todo task
  class Task extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
      return (
        <div className="check-container">
            <div className="round">
                <input type="checkbox" id={"checkbox" + this.props.id}  />
                <label htmlFor={"checkbox" + this.props.id}></label>
            </div>
            <p>{this.props.task}</p>
        </div>
      );
    }
  }