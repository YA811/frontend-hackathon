const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/events`;



export const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export const show = async (eventId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const create = async (eventFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export const createAttendee = async (eventId, attendeeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}/attendees`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(attendeeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
  
export const deleteEvent = async (eventId) => {
    try {
      const res = await fetch(`${BASE_URL}/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
};

export async function update(eventId, eventFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAttendee = async (eventId, attendeeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}/attendees/${attendeeId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateAttendee = async (eventId, attendeeId, attendeeFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${eventId}/attendees/${attendeeId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attendeeFormData)
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

  
  



