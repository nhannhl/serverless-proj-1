document.addEventListener("DOMContentLoaded", () => {
  getData();
});

document.getElementById('delete-contact').addEventListener('click', function() {
  deleteItem();
});

function getData() {
	fetch('https://biccqx80a1.execute-api.ap-southeast-1.amazonaws.com/dev/contact', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
		    const dt = data.body ? JSON.parse(data.body) : [];
        dt.data.Items.forEach(function(contact) {
          if(contact.sk == localStorage.getItem('editID')) {
            document.getElementById('name').value = contact.formData.name;
            document.getElementById('email').value = contact.formData.email;
            document.getElementById('subject').value = contact.formData.subject;
            document.getElementById('message').value = contact.formData.message;
          }
        });
      });
    } else {
      throw new Error('Get error');
    }
  })
  .catch(function(error) {
    console.error(error);
    alert('Get failed');
  });
}

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var subject = document.getElementById('subject').value.trim();
  var message = document.getElementById('message').value.trim();

  var formData = {
    sk: localStorage.getItem('editID'),
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  submitForm(formData);
});

function submitForm(formData) {
  fetch('https://biccqx80a1.execute-api.ap-southeast-1.amazonaws.com/dev/contact', { 
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    if (response.ok) {
      alert('Update OK!');
      localStorage.removeItem('editID');
      window.location.href = '../index.html';
    } else {
      throw new Error('Update FAIL!');
    }
  })
  .catch(function(error) {
    console.error(error);
    localStorage.removeItem('editID');
    alert('Update FAIL!');
  });
}

function deleteItem() {
  fetch('https://biccqx80a1.execute-api.ap-southeast-1.amazonaws.com/dev/contact', { 
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({sk: localStorage.getItem('editID')})
  })
  .then(function(response) {
    if (response.ok) {
      alert('Delete OK!');
      localStorage.removeItem('editID');
      window.location.href = '../index.html';
    } else {
      throw new Error('Delete FAIL!');
    }
  })
  .catch(function(error) {
    console.error(error);
    localStorage.removeItem('editID');
    alert('Delete FAIL!');
  });
}