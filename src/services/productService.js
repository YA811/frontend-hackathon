const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/products`;



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

export const show = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (productId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}/comments`, {
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
  
export const deleteComment = async (productId, commentId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}/comments/${commentId}`, {
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

export const updateComment = async (productId, commentId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentFormData)
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

  
  



