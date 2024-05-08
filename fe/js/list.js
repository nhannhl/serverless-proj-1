document.addEventListener("DOMContentLoaded", () => {
  getData();
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
      const ulEle = document.getElementById('contact-list');
	  
      response.json().then(function(data) {
		const dt = data.body ? JSON.parse(data.body) : [];
        dt.data.Items.forEach(function(contact) {
          const liEle = document.createElement('li');

          const aEle = document.createElement('a');
          aEle.href = 'html/edit.html';
          const linkText = document.createTextNode(contact.formData.name);
          aEle.addEventListener('click', function() {
            localStorage.setItem('editID', contact.sk);
          });
          aEle.appendChild(linkText);

          liEle.appendChild(aEle);

          ulEle.appendChild(liEle);
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