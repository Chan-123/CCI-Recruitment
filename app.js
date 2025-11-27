// 1) Put your Google Apps Script Web App URL here
const scriptURL = 'https://script.google.com/macros/s/AKfycbzDFqJQd3R0-tub2gDLxlkOfxYEntlJkpNOvZQmj9zOU-Gj6GwAWbuQb3eZmp1javPA/exec';

// 2) Candidate Registration – send data to Google Sheet via action=register
document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const params = new URLSearchParams();
  params.append('action', 'register');
  params.append('name', document.getElementById('name').value);
  params.append('dob', document.getElementById('dob').value);
  params.append('gender', document.getElementById('gender').value);
  params.append('designation', document.getElementById('designation').value);
  params.append('pfnumber', document.getElementById('pfnumber').value);
  params.append('station', document.getElementById('station').value);
  params.append('paylevel', document.getElementById('paylevel').value);
  params.append('email', document.getElementById('email').value);
  params.append('mobile', document.getElementById('mobile').value);

  fetch(scriptURL, {
    method: 'POST',
    body: params
  })
    .then(response => response.json())
    .then(result => {
      console.log('Register result:', result);
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

// 3) Candidate Login – uses action=login on doGet
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
        window.loggedInUserId = userid;
        alert('Login successful!');

        document.getElementById('login-section').style.display = 'none';
        document.getElementById('application-section').style.display = 'block';
      } else {
        alert(result.message || 'Invalid User ID or Password');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Network/server error during login.');
    });
});
