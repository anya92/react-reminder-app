import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      place: '',
      dueDate: '',
      category: ''
    }

    this.showSidebar = this.showSidebar.bind(this);
  }

  addReminder(e) {
    e.preventDefault();
    this.props.addReminder(this.state.text, this.state.place, this.state.dueDate, this.state.category);
    this.selectCategory.value = 'Category';
    this.setState({ place: '', category: '' });
    this.titleInput.value = '';
    this.placeInput.value = '';
    this.timeInput.value = '';
    this.showSidebar(e);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  showSidebar(e) {
    e.preventDefault();
    this.sidebar.classList.toggle('show');
  }

  getDate() {
    const date = new Date();
    return moment(date).format('LL');
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-xs-12 col-md-4">
        { 
          reminders.sort((reminder1, reminder2) => {
             return Date.parse('03/24/2017 '+ reminder1.dueDate) - Date.parse('03/24/2017 '+ reminder2.dueDate)
          }).map(reminder => {
            return (
              <li 
                key={reminder.id} 
                className="list-group-item">
                  <div className="single-plan">
                    <div className="list-item icon">
                      {
                        !reminder.category 
                        ? <img src={require('../../icons/question.png')} alt="icon" />
                        : <img src={require(`../../icons/${reminder.category}.png`)} alt="icon" />
                      }
                    </div>
                    <div className="list-item description">
                      <h3>{reminder.text}</h3>
                      <h4>{reminder.place}</h4>
                    </div> 
                    <div className="list-item time">
                      <p>{reminder.dueDate}</p>
                    </div>
                    <div 
                      className="delete-button list-item"
                      onClick={() => this.deleteReminder(reminder.id)}
                    >
                      &#x2715;
                    </div>
                  </div>
              </li>
            );  
          })
        }
      </ul>
    )
  }

  render() {
    const { reminders } = this.props;
    return (
      <div className="app">
        <div className="title">
          <h2>Plans For</h2>
          <h1>Today</h1>
          <p>{this.getDate()}</p>
          {
            reminders.length
            ? <div 
                className="remove-button"
                onClick={() => this.props.clearReminders()}
              >
                &#x2715; <span>Clear all</span>
              </div>
            : <div></div>  
          }
        </div>
        <aside className="add-form" ref={ref => this.sidebar = ref}>
          <h2>Add New Thing</h2>
          <div 
            className="remove-button"
            onClick={this.showSidebar}
          >
            &#x2715;
          </div>
          <form className="form-group" onSubmit={(e) => this.addReminder(e)}>
            <select 
              className="form-control"
              onChange={e => this.setState({ category: e.target.value })}
              defaultValue="Category"
              ref={input => this.selectCategory = input}
            >
              <option disabled hidden>Category</option>
              <option value="house">At home</option>
              <option value="education">Education</option>
              <option value="food">Food</option>
              <option value="freeTime">Free time</option>
              <option value="health">Medical</option>
              <option value="meeting">Meeting</option>
              <option value="nature">Nature</option>
              <option value="shopping">Shopping</option>
              <option value="sport">Sport</option>
              <option value="work">Work</option>
            </select>
            <input 
              type="text" 
              required
              className="form-control" 
              placeholder="Title"
              onChange={e => this.setState({ text: e.target.value })}
              ref={input => this.titleInput = input}
            />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Place"
              onChange={e => this.setState({ place: e.target.value })}
              ref={input => this.placeInput = input}
            />
            <input 
              required
              type="time" 
              className="form-control"
              onChange={e => this.setState({ dueDate: e.target.value })} 
              ref={input => this.timeInput = input}
            />
            <button 
              type="submit" 
              className="btn btn-lg"
            >
              Add
            </button>
          </form>
        </aside>
          { this.renderReminders() }
          <a className="add-button" onClick={this.showSidebar}>+</a>
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ addReminder }, dispatch);
// }

// export default connect(null,mapDispatchToProps)(App);

function mapStateToProps(state) {
  return {
    reminders: state
  }
  console.log('state', state);

}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);
