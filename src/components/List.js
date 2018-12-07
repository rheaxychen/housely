import React, {Component} from 'react';
import uuidv4 from 'uuid/v4';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '',
            items: []
        }
    }
    
    componentDidMount() {
        this.setState({
            type: this.props.type,
            items: this.props.items
        });

    }


    render () {
        let headers = [];
        if(this.state.type === 'maintenance') {
            headers = [<h3 key={uuidv4()}>Unit</h3>, <h3 key={uuidv4()}>Description</h3>, <h3 key={uuidv4()}>Priority</h3>];
        } else if (this.state.type === 'chores') {
            headers = [<h3 key={uuidv4()}>Chore</h3>, <h3 key={uuidv4()}>Assign to</h3>, <h3 key={uuidv4()}>Status</h3>];
        } else if (this.state.type === 'payments') {
            headers = [<h3 key={uuidv4()}>Type</h3>, <h3 key={uuidv4()}>Amount</h3>, <h3 key={uuidv4()}>Payment Due</h3>, <h3 key={uuidv4()}>Status</h3>];
        }
        let items = this.state.items.map((item) => {
            console.log(item);
            return <ListItem key={uuidv4()} item={item} />
        });
        return (
            <div className='list-container'>
                <div className='list-header'>
                    {headers}
                </div>
                <div className='list-content'>
                    {items}
                </div>
            </div>
        );
    }
}

// a row of an item 
// including: item detail, item status, etc
class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: []
        }
    }
    
    componentDidMount() {
        
        this.setState({
            item: this.props.item
        })
    }

    render() {
        // let itemRow = this.state.item.map((item) => {
        //     return <p>{} item={item} />
        // });
        let itemRow = this.state.item.map((value) => {
            let classList = "";
            if (value === 'MEDIUM') {
                classList = "medium";
            } else if (value === 'LOW') {
                classList = "low";
            }
            return <p className={classList} key={uuidv4()}>{value}</p>
        });
        console.log(itemRow);
        return (
            <div className='list-item-container'>
                {itemRow}
            </div>
        );
    }
}