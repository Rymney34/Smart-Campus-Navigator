const form = document.getElementById('feedbackForm');
const response = document.getElementById('response');
const submitButton = form.querySelector('button[type="submit"]');
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
      
      if (res.status === 429) {
        response.textContent = result.error;
        submitButton.disabled = true;
        submitButton.textContent = "Daily Limit Reached";
        submitButton.style.opacity = "0.5";
      } else {
        showToast(result.message);
      }
    } catch (err) {
      response.textContent =err;
    }
  });

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
  
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000); // 3 seconds
  }