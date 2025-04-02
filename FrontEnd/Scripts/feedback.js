const form = document.getElementById('feedbackForm');
const response = document.getElementById('response');
const user = JSON.parse(localStorage.getItem('user'));

form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
  
    // ✅ Attach the user's ID to the feedback payload
    if (user && user._id) {
      data.userId = user._id;
    } else {
      response.textContent = "You must be logged in to submit feedback.";
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
      response.textContent = result.message || result.error;
    } catch (err) {
      response.textContent = "Error submitting feedback. Please try again.";
    }
  });