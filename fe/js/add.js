document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var subject = document.getElementById('subject').value.trim();
  var message = document.getElementById('message').value.trim();

  var formData = {
    name: name,
    email: email,
    subject: subject,
    message: message
  };

  submitForm(formData);
});

function submitForm(formData) {
  fetch('https://biccqx80a1.execute-api.ap-southeast-1.amazonaws.com/dev/contact', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(function(response) {
    if (response.ok) {
      alert('Submit OK!');
      window.location.href = '../index.html';
    } else {
      throw new Error('Submit FAIL!');
    }
  })
  .catch(function(error) {
    console.error(error);
    alert('Submit FAIL!');
  });
}