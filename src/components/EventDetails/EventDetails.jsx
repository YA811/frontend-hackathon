import { useParams } from 'react-router-dom';
import { AuthedUserContext } from '../../App';
import { useState, useEffect, useContext } from 'react';
import * as eventService from '../../services/eventService';
import AttendeeForm from '../AttendeeForm/AttendeeForm';
import { Link } from 'react-router-dom';
import './EventDetail.css';

const EventDetails = (props) => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const user = useContext(AuthedUserContext);

    useEffect(() => {
        const fetchEvent = async () => {
          const eventData = await eventService.show(eventId);
          console.log('eventData', eventData);
          setEvent(eventData);
        };
        fetchEvent();
    }, [eventId]);
      
    console.log('event state:', event);

    const handleAddAttendee = async (attendeeFormData) => {
        const newAttendee = await eventService.createAttendee(eventId, attendeeFormData);
        setEvent({ ...event, attendees: [...event.attendees, newAttendee] });
    };

    const handleDeleteAttendee = async (attendeeId) => {
      await eventService.deleteAttendee(eventId, attendeeId);
      setEvent({...event, attendees: event.attendees.filter((attendee) => attendee._id !== attendeeId),});
    };

    if (!event) return <main>Loading...</main>;

    return (
      <main className="event-detail-container">
      <header className="event-header">
        <h1 className="event-title">{event.title}</h1>
        <h2 className="event-date">On {event.date.split('T')[0]}</h2>
        <h2 className="event-time">At {event.date.split('T')[1].split('.')[0]}</h2>
        <h2 className="event-location">{event.location}</h2>
        <p className="event-description">{event.description}</p>
        {event.planner._id === user._id && (
          <div className="event-actions">
            <Link to={`/events/${eventId}/edit`} className="event-edit-link">Edit</Link>
            <button onClick={() => props.handleDeleteEvent(eventId)} className="event-delete-button">Delete</button>
          </div>
        )}
      </header>
      
      <section className="attendees-section">
        <h2 className="attendees-title">Attendees List</h2>
        <AttendeeForm handleAddAttendee={handleAddAttendee} />
        {!event.attendees.length && <p className="no-attendees-message">No attendees yet.</p>}

        {event.attendees.map((attendee) => (
          <article key={attendee._id} className="attendee-item">
            <p className="attendee-name"><strong>Attendee:</strong> {attendee.name}</p>
            <p className="attendee-status"><strong>Invitation Status:</strong> {attendee.invitationStatus}</p>
            <div className="attendee-actions">
              {attendee._id && event.planner._id === user._id && (
                <>
                  <Link to={`/events/${eventId}/attendees/${attendee._id}/edit`} className="attendee-edit-link">Edit</Link>
                  <button onClick={() => handleDeleteAttendee(attendee._id)} className="attendee-delete-button">Delete</button>
                </>
              )}
            </div>
          </article>
        ))}
      </section>
    </main>
    );
};
  
export default EventDetails;