document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-schedule-form');
  
    if (form) {
      form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission
  
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const username = document.getElementById('username').value.trim();
  
        if (!title || !description || !username) {
          alert('All fields are required!');
          return;
        }
  
        const newSchedule = { title, description, username };
  
        try {
          const response = await fetch('/api/newschedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSchedule),
          });
  
          if (response.ok) {
            alert('New schedule created successfully!');
            window.location.reload(); // Refresh the page to reflect the new schedule
          } else {
            const errorData = await response.json();
            alert(errorData.message || 'Failed to create schedule.');
          }
        } catch (error) {
          console.error('Error creating schedule:', error);
          alert('An error occurred while creating the schedule.');
        }
      });
    }
  });
  