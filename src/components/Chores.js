import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';

class Chore extends React.Component {
    render() {
        return (
            <Draggable
                draggableId={this.props.chore.id}
                index={this.props.index}
            >
                {(provided) => (
                    <div className="chore-list"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        innerRef={provided.innerRef}
                    >
                        {this.props.chore.name}
                    </div>
                )}
            </Draggable>
        )
    }
}

class Column extends React.Component {
    render() {
        return (
            <div className="contain-card">
                <h3 className="title">{this.props.column.title}</h3>
                <Droppable droppableId={this.props.column.id}>
                    {(provided) => (
                        <div className="card-list"
                            ref={provided.innerRef}
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {this.props.chores.map((chore, index) => (
                                <Chore key={chore.id} chore={chore} index={index} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}



export default class Chores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chores: {},
            columns: {},
            columnSort: [],
            choreOverview: []
        }
    }

    componentDidMount() {
        this.setState({
            chores: this.props.chores, 
            columns: this.props.columns,
            columnSort: this.props.columnSort
        });
    }


    onDragEnd = result => {
        const { destination, source, draggableId } = result;
        // if no destination no action needed
        if (!destination) {
            return;
        }
        // The location of Draggable not changed, no action needed
        if (destination.draggableId === source.droppableId
            && destination.index === source.index) {
            return;
        }

        // reorder choreIds array for the column
        // retrieve column id from state
        const start = this.state.columns[source.droppableId]; // start column
        const finish = this.state.columns[destination.droppableId]; // finish column

        if (start === finish) {
            // create a new choreIds Array with the same content
            const newChoreIds = Array.from(start.choreIds);
            // move the chore id from the old index to new index in the array
            newChoreIds.splice(source.index, 1); // from this index, remove one item
            newChoreIds.splice(destination.index, 0, draggableId); // from destination index, remove nothing, insert draggableId

            const newColumn = {
                // same property as old column
                ...start,
                // but new taskIds array
                choreIds: newChoreIds,
            };

            // new state
            this.setState({
                ...this.state,
                columns: {
                    ...this.state.columns,
                    // insert new column into map
                    [newColumn.id]: newColumn,
                }
            });
            return;
        }

        // if the list is different from the start list
        const startChoreIds = Array.from(start.choreIds);
        startChoreIds.splice(source.index, 1);
        // create a new column preserve old column
        const newStart = {
            ...start,
            choreIds: startChoreIds
        };

        const finishChoreIds = Array.from(finish.choreIds);
        finishChoreIds.splice(destination.index, 0, draggableId); // insert

        // finish column
        const newFinish = {
            ...finish,
            choreIds: finishChoreIds
        };
        
        // update the columns map to include columns with the updated chore ids
        this.setState({
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }, this.onChoreChange);
        
        return;
    };

    onChoreChange = () => {
        if (this.state.columns.column1.choreIds.length === 0) {
            let keys = Object.keys(this.state.columns);
            let choreKeys = Object.keys(this.state.chores);
            let choreArray = [];
            for (let i = 0; i < keys.length - 1; i++) {
                let tenant = this.state.columns["column" + (i + 2)].title;
                let tempChores = this.state.columns["column" + (i + 2)].choreIds;
                let namedChores = tempChores.map((chore) => {
                    for (let t = 0; t < choreKeys.length; t++) {
                        if (chore === this.state.chores["chore" + (t + 1)].id) {
                            return this.state.chores["chore" + (t+1)].name;
                        }
                    }
                });
                let choreObj = {tenant,chores: namedChores};
                choreArray.push(choreObj);
            }
            console.log(choreArray);
            this.props.setChores(choreArray);
        }
    }

    render() {

        // get names from Room Assignment
        let tenantProp = this.props.tenants;
        let names = [];
        for (let i = 0; i < this.props.tenants.length; i++) {
            // console.log(tenantProp[i].name);
            names.push(
                <div key={"rent" + i}>
                    <p>{tenantProp[i].name}</p>
                </div>
            );
        }

        return (
            // one DragDropContext has three callbacks: onDragStart, onDragUpdate (current location of draggable in the system), 
            // & onDragEnd
            <DragDropContext
                onDragEnd={this.onDragEnd}
            >
                <section id="paid-status-section" className="main-sections dash-section">
                    <div id="paid-status" className="home-section">
                        <div className="section-header">
                            <h2>Assign Chores</h2>
                        </div>
                        <div id="rent-status" className="statuses">
                            {/* <div className="rent-wrapper">
                                {names}
                            </div> */}
                            <div className="flex-box">
                                {this.state.columnSort.map((columnId) => {
                                    const column = this.state.columns[columnId];
                                    const chores = column.choreIds.map(choreId => this.state.chores[choreId]);
                                    return <Column key={column.id} column={column} chores={chores} />;
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </DragDropContext>
        );
    }
}




//https://blog.bitsrc.io/implement-better-drag-and-drop-in-your-react-app-beafc4451599
// https://www.youtube.com/watch?v=e56W2T51Wg0  Beautiful and Accessible Drag and Drop with react-beautiful-dnd
// add a new card https://github.com/bigardone/phoenix-trello