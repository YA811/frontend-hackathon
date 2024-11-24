import { useState , useEffect } from 'react';
import * as eventService from '../../services/eventService';
import { useParams, useNavigate } from 'react-router-dom';
import './AttendeeForm.css';

const AttendeeForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    invitationStatus: 'pending',
  });

  const { eventId, attendeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(eventId);
      setFormData(eventData.attendees.find((attendee) => attendee._id === attendeeId));
    };
    if (eventId && attendeeId) fetchEvent();
  }, [eventId, attendeeId]);

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (eventId && attendeeId) {
      eventService.updateAttendee(eventId, attendeeId, formData);
      navigate(`/events/${eventId}`);
    } else {
      props.handleAddAttendee(formData);
    }
    setFormData({ name: '', invitationStatus: 'pending' });
  };

  if (eventId && attendeeId) return (
    <form className="attendee-form-edit" onSubmit={handleSubmit}>
      <div className="form-field">
      <label htmlFor="name" className="form-label">Attendee Name:</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
      />
      </div>
      <div className="form-field">
      <label htmlFor="invitationStatus" className="form-label">Invitation Status:</label>
      <select
        required
        name="invitationStatus"
        id="invitationStatus"
        value={formData.invitationStatus}
        onChange={handleChange}
        className="form-select"
      >
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Declined</option>
      </select>
      </div>
      <button type="submit" className="form-button">Edit Attendee</button>
    </form>
  );

  return (
    <form className="attendee-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="name" className="form-label">Attendee Name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="form-input"
        />
      </div>
      <div className="form-field">
        <label htmlFor="invitationStatus" className="form-label">Invitation Status:</label>
        <select
          required
          name="invitationStatus"
          id="invitationStatus"
          value={formData.invitationStatus}
          onChange={handleChange}
          className="form-select"
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Declined</option>
        </select>
      </div>
      <button type="submit" className="form-button">Add Attendee</button>
    </form>
  );
};

export default AttendeeForm;