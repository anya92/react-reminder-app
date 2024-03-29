import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

export const addReminder = (text, place, dueDate, category) => {
  const action = {
    type: ADD_REMINDER,
    text,
    place,
    dueDate,
    category
  }
  return action;
}

export const deleteReminder = (id) => {
  const action = {
    type: DELETE_REMINDER,
    id
  }
  return action;
}

export const clearReminders = () => {
  return {
    type: CLEAR_REMINDERS
  }
}
