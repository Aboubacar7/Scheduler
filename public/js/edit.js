document.addEventListener('DOMContentLoaded', () => {
  console.log('edit.js is loaded and running');

  // Select DOM elements
  const scheduleItems = document.querySelectorAll('.schedule-item');
  const editCart = document.getElementById('edit-cart');
  const scheduleIdField = document.getElementById('schedule-id');
  const titleField = document.getElementById('edit-title');
  const descriptionField = document.getElementById('edit-description');
  const usernameField = document.getElementById('edit-username');
  const closeBtn = document.querySelector('.close-btn');
  const saveButton = document.querySelector('#schedule-edit-form button[type="submit"]');
  const deleteButton = document.getElementById('delete-btn');
 
  // Ensure edit cart exists
  if (!editCart) {
    console.error('Edit cart element (#edit-cart) is missing from the DOM.');
    return;
  }

  // Handle clicking on schedule items
  scheduleItems.forEach((item) => {
    item.addEventListener('click', () => {
      const scheduleId = item.getAttribute('data-id');
      const title = item.getAttribute('data-title');
      const description = item.getAttribute('data-description');
      const username = item.getAttribute('data-username');

      console.log('Schedule clicked:', { id: scheduleId, title, description, username });

      // Populate edit form
      scheduleIdField.value = scheduleId || '';
      titleField.value = title || '';
      descriptionField.value = description || '';
      usernameField.value = username || '';

      // Show the cart
      editCart.style.display = 'block';
      editCart.classList.add('open');
      console.log('Edit cart opened');
    });
  });

  // Close the cart
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      editCart.classList.remove('open');
      setTimeout(() => {
        editCart.style.display = 'none';
      }, 300); // Match CSS transition duration
      console.log('Edit cart closed');
    });
  }

  // Save changes on form submit
  saveButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const scheduleId = scheduleIdField.value;
    const updatedData = {
      title: titleField.value.trim(),
      description: descriptionField.value.trim(),
      username: usernameField.value.trim(),
    };

    console.log('Submitting updated data:', updatedData);

    try {
      const response = await fetch(`/api/schedules/${scheduleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Schedule updated successfully!');
        window.location.reload();
      } 
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  });

  if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
      const scheduleId = scheduleIdField.value;

      if (!scheduleId) {
        alert('No schedule selected for deletion!');
        return;
      }

      const confirmDelete = confirm('Are you sure you want to delete this schedule?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`/api/schedules/${scheduleId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          console.log('Schedule deleted successfully');
          alert('Schedule deleted successfully!');
          // Optionally refresh the page or update the UI
          window.location.reload();
        } 
      } catch (error) {
        console.error('Error during deletion:', error);
        alert('An error occurred while deleting the schedule.');
      }
    });
  }
});
