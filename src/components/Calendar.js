
import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

// Calendar widget component
export default class Calendar extends Component {
    constructor(props) {
      super(props);
  
      let d = new Date();
      this.state = {
        addingEvent: false,
        currentMonth: d.getMonth(),
        currentYear: d.getFullYear(),
        expand: null,
        months: ["January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November",
          "December"],
        calendar: []
      };
    }

    componentDidMount() {
      this.setState({calendar: this.props.calendar});
    }
  
    handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        this.addEvent(event);
      }
    }
  
    newEvent = () => {
      this.setState({ addingEvent: true })
      // $('.todo-plus').removeClass("editing");
    }
  
    nextMonth = () => {
      if (this.state.currentMonth === 11) {
        this.setState({
          currentMonth: 0,
          currentYear: this.state.currentYear + 1,
          expand: null
        });
      } else {
        this.setState({
          currentMonth: this.state.currentMonth + 1,
          expand: null
        });
      }
    }
  
    prevMonth = () => {
      if (this.state.currentMonth === 0) {
        this.setState({
          currentMonth: 11,
          currentYear: this.state.currentYear - 1,
          expand: null
        });
      } else {
        this.setState({
          currentMonth: this.state.currentMonth - 1,
          expand: null
        });
      }
    }
  
    setDay = (day) => {
      this.setState({ expand: day.textContent });
    }
  
    addEvent = (event) => {
      let toAdd = event.target.value.trim();
      if (toAdd !== "") {
        let newList = this.state.calendar;
        newList.push({
          year: this.state.currentYear,
          month: this.state.currentMonth,
          day: parseInt(this.state.expand),
          events: [
            toAdd
          ]
        });
        this.setState({
          addingEvent: false,
        });
        this.props.onCalendarUpdate(newList);
      } else {
        this.setState({
          addingEvent: false
        });
      }
    }
  
    getDetail = () => {
      let dayHeader = <p key={uuidv4()} className="day-header">{this.state.months[this.state.currentMonth] + " " + this.state.expand}</p>;
      let headerDiv = <div key={uuidv4()} className="header-div">{dayHeader}<img onClick={this.newEvent} className="cal-plus icon" src="img/plus.png" alt="add event" /></div>;
      let events = [];
      let calendar = this.state.calendar;
      for (let i = 0; i < calendar.length; i++) {
        if (calendar[i].year === this.state.currentYear &&
          calendar[i].month === this.state.currentMonth &&
          calendar[i].day === parseInt(this.state.expand)) {
          for (let s = 0; s < calendar[i].events.length; s++) {
            events.push(<p key={i + ' ' + s}>{calendar[i].events[s]}</p>);
          }
        }
      };
      if (this.state.addingEvent) {
        events.push(<input key={uuidv4()} onBlur={this.addEvent} onKeyPress={this.handleKeyPress} className="event-input" autoFocus />);
      }
      let div = <div key={uuidv4()} className="expand-div active">{headerDiv}{events}</div>;
      return div;
    }
  
    goToday = () => {
      let date = new Date();
      this.setState({
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear()
      });
    }
  
    render() {
      let date = new Date();
      let m = this.state.months[this.state.currentMonth];
      let y = this.state.currentYear;
  
      let daysInMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0).getDate();
      let allDays = [];
      for (let i = 1; i <= daysInMonth; i++) {
        let day = <p key={i}>{i}</p>;
        allDays.push(day);
      }
      let rowsCollection = [];
      let current2 = 0;
      for (let i = 0; i <= 5; i++) {
        let week = [];
        let current1 = 0;
        while (current1 < 7) {
          let day;
          if (current2 < allDays.length) {
            day = new Date(this.state.currentYear, this.state.currentMonth, allDays[current2].key).getDay();
          } else {
            day = -1;
          }
          if (current1 === day) {
            week.push(allDays[current2].key);
            current2++;
          } else {
            week.push(0);
          }
          current1++;
        }
        let daysCollection = [];
        week.forEach((n) => {
          let classes = "";
          if (n === date.getDate() && this.state.currentMonth === date.getMonth()
            && this.state.currentYear === date.getFullYear()) {
            classes += "today ";
          }
          if (n === 0) {
            n = "";
            classes += "hidden-day ";
          } else if (parseInt(n) === 1) {
            classes += "first-of-month ";
          }
          // p.textContent = n;
          // p.addEventListener('click', function(elem) {
          //     $('.expand-div').removeClass('active');
          //     if (elem.target.textContent === $('.day-expanded').text()) {
          //         $('.day-expanded').removeClass('day-expanded');
          //         $('.fa-sort-up').remove();
          //         $('.expand-div').slideToggle(300, "linear", function() {
          //             $('.expand-div').remove();
          //         });
          //     } else {
          //         $('.day-expanded').removeClass('day-expanded');
          //         viewDay(elem.target);
          //     }
  
  
          // });
  
          if (n === this.state.expand) {
            classes += "day-expanded ";
          }
          if (this.state.currentMonth === date.getMonth() &&
            this.state.currentYear === date.getFullYear() &&
            parseInt(n) === date.getDate()) {
            classes += "today";
          }
  
          let indicator = null;
          for (let t = 0; t < this.state.calendar.length; t++) {
            if (this.state.calendar[t].day === parseInt(n) && this.state.calendar[t].month === this.state.currentMonth &&
              this.state.calendar[t].year === this.state.currentYear) {
              indicator = <i className="fas fa-circle"></i>;
              break;
            }
          }
  
          daysCollection.push(<p onClick={(event) => this.setDay(event.target)} className={classes} key={uuidv4()}>
            {n}
            {indicator}
          </p>);
        });
        rowsCollection.push(<div className="cal-row" key={daysCollection + i}>{daysCollection}</div>);
      }
  
      for (let i = 0; i < rowsCollection.length; i++) {
        let days = rowsCollection[i].props.children;
        let found = false;
        for (let i = 0; i < days.length; i++) {
          if (days[i].props.children[0] === this.state.expand) {
            found = true;
          }
        }
        if (found) {
          rowsCollection.splice(i + 1, 0, this.getDetail());
          break;
        }
      };
  
      return (
        <section id="calendar-section" className="main-sections dash-section">
          <div id="calendar" className="home-section">
            <div className="section-header">
              <h2>Calendar</h2>
              <a onClick={this.prevMonth} id="prev-month" className="toggle-month"><img src="img/left-arrow.png" alt="left arrow" /></a>
              <h2 id="current-month">{m + " " + y}</h2>
              <a onClick={this.nextMonth} id="next-month" className="toggle-month"><img src="img/right-arrow.png" alt="right arrow" /></a>
              <button onClick={this.goToday} id="go-today">TODAY</button>
            </div>
            <div className="cal-container">
              <div className="cal-row day-label">
                <p>S</p>
                <p>M</p>
                <p>T</p>
                <p>W</p>
                <p>T</p>
                <p>F</p>
                <p>S</p>
              </div>
              {rowsCollection}
            </div>
          </div>
        </section>
      );
    }
  }