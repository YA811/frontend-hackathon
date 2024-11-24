import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as eventService from '../../services/eventService';
import './EventForm.css';

const EventForm = (props) => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
  
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setFormData(eventData);
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (eventId) {
      props.handleUpdateEvent(eventId, formData);
    } else {
      props.handleAddEvent(formData);
    }
  };
  
  return (
    <main className="event-form-container">
      <form className="event-form" onSubmit={handleSubmit}>
        <h1 className="event-form__title">{eventId ? 'Edit Event' : 'New Event'}</h1>
        
        <label className="event-form__label" htmlFor="title">Event Title</label>
        <input
          className="event-form__input"
          required
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
        />
        
        <label className="event-form__label" htmlFor="description">Event Description</label>
        <textarea
          className="event-form__textarea"
          required
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
        
        <label className="event-form__label" htmlFor="date">Event Date</label>
        <input
          className="event-form__input"
          required
          type="datetime-local"
          name="date"
          id="date"
          onChange={handleChange}
        />

        <label className="event-form__label" htmlFor="location">Event Location</label>
        <textarea
          className="event-form__textarea"
          required
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button className="event-form__submit-button" type="submit">Submit</button>
      </form>
    </main>
  );
};


export default EventForm;