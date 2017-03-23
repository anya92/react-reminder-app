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
      dueDate: ''
    }
  }

  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li 
                key={reminder.id} 
                className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div 
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            );  
          })
        }
      </ul>
    )
  }

  render() {
    return (
      <div className="app">
        <div className="title">
          DreamlistApp
        </div>
        <div className="form-inline">
          <div className="form-group">
            <input 
              type="text" 
              className="form-control reminder-form" 
              placeholder="I have to..."
              onChange={e => this.setState({ text: e.target.value })}
            />
          </div>
            <input 
              type="datetime-local" 
              className="form-control"
              onChange={e => this.setState({ dueDate: e.target.value })} 
            />
          <button 
            type="button" 
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >
            Add Dream
          </button>
        </div>
          { this.renderReminders() }
          <div 
            className="btn btn-danger"
            onClick={() => this.props.clearReminders()}
          >
            Clear Reminders
          </div>
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
