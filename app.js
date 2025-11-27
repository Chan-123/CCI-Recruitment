// 1) Put your Google Apps Script Web App URL here
//    Example: const scriptURL = 'https://script.google.com/macros/s/AKfycbx.../exec';
const scriptURL = 'https://script.google.com/macros/s/AKfycbzDFqJQd3R0-tub2gDLxlkOfxYEntlJkpNOvZQmj9zOU-Gj6GwAWbuQb3eZmp1javPA/exec';

// 2) Candidate Registration – send data to Google Sheet
document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('dob', document.getElementById('dob').value);
  formData.append('gender', document.getElementById('gender').value);
  formData.append('designation', document.getElementById('designation').value);
  formData.append('pfnumber', document.getElementById('pfnumber').value);
  formData.append('station', document.getElementById('station').value);
  formData.append('paylevel', document.getElementById('paylevel').value);
  formData.append('email', document.getElementById('email').value);
  formData.append('mobile', document.getElementById('mobile').value);

  fetch(scriptURL, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(result => {
      if (result.status === 'success') {
        alert(
      'Registration saved successfully!\n\n' +
      'Your User ID: ' + result.userId + '\n' +
      'Password: ' + result.password + '\n' +
      'Please note these credentials for login.'
    );
        e.target.reset();
      } else {
        alert('Error while saving registration. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error while submitting registration:', error);
      alert('Network or server error. Please try again later.');
    });
});

// 3) Candidate Login – placeholder for future implementation
document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const userid = document.getElementById('userid').value;
  const password = document.getElementById('password').value;

  const url = scriptURL + '?action=login&userid=' + encodeURIComponent(userid) +
              '&password=' + encodeURIComponent(password);

  fetch(url, { method: 'GET' })
    .then(res => res.json())
    .then(result => {
      if (result.status === 'success') {
        alert('Login successful! (Next step: show application form/dashboard)');
        // here you can later redirect or show another section
      } else {
        alert(result.message || 'Invalid User ID or Password');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Network/server error during login.');
    });
});
