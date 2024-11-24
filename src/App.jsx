import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as eventService from '../src/services/eventService'; // import the event
import EventList from './components/EventList/EventList'; // import the eventList component
import EventDetails from './components/EventDetails/EventDetails';
import EventForm from './components/EventForm/EventForm';
import AttendeeForm from './components/AttendeeForm/AttendeeForm';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEvents = async () => {
      const eventsData = await eventService.index();
  
      // Set state:
      setEvents(eventsData);
    };
    if (user) fetchAllEvents();
  }, [user]);
  

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventService.create(eventFormData);
    setEvents([newEvent, ...events]);
    navigate('/events');
  };
  

  const handleDeleteEvent = async (eventId) => {
    const deletedEvent = await eventService.deleteEvent(eventId);
    setEvents(events.filter((event) => event._id !== deletedEvent._id));
    navigate('/events');
  };

  const handleUpdateEvent = async (eventId, eventFormData) => {
    const updatedEvent = await eventService.update(eventId, eventFormData);
    setEvents(events.map((event) => (eventId === event._id ? updatedEvent : event)));
    navigate(`/events/${eventId}`);
  };
  

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
        {user ? (
          // Protected Routes:
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/events" element={<EventList events={events} />} />
            <Route path="/events/new" element={<EventForm handleAddEvent={handleAddEvent} />} />
            <Route path="/events/:eventId" element={<EventDetails handleDeleteEvent={handleDeleteEvent} />} />
            <Route path="/events/:eventId/edit" element={<EventForm handleUpdateEvent={handleUpdateEvent}/>} />
            <Route path="/events/:eventId/attendees/:attendeeId/edit" element={<AttendeeForm />} />
          </>
        ) : (
          // Public Route:
          <Route path="/" element={<Landing />} />
        )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </Routes>
            </AuthedUserContext.Provider>
          </>
  );
};

export default App;
