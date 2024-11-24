import { Link } from 'react-router-dom';
import './EventList.css';


const EventList = (props) => {

  if (props.events.length === 0) return <h4>No events added yet.</h4>;

  return (
    <main className="event-list-container">
      {props.events.map((event) => (
        <Link key={event._id} to={`/events/${event._id}`} className="event-list-item">
          <article className="event-list-card">
            <header className="event-list-header">
              <h2 className="event-list-title">{event.title}</h2>
              <p className="event-list-date">
                on {event.date.split('T')[0]}, at {event.date.split('T')[1].split('.')[0]}
              </p>
            </header>
          </article>
        </Link>
      ))}
    </main>
  );
};
  
  export default EventList;