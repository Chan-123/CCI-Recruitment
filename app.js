document.getElementById('registration-form').addEventListener('submit', function (e) {
  e.preventDefault();
  // Get registration form data
  const data = {
    name: e.target.name.value,
    dob: e.target.dob.value,
    gender: e.target.gender.value,
    designation: e.target.designation.value,
    pfnumber: e.target.pfnumber.value,
    station: e.target.station.value,
    paylevel: e.target.paylevel.value,
    email: e.target.email.value,
    mobile: e.target.mobile.value
  };
  console.log('Register data:', data);
  alert('Registration submitted! Backend integration coming next.');
  e.target.reset();
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const userid = e.target.userid.value;
  const password = e.target.password.value;
  console.log('Login attempt:', userid, password);
  alert('Login functionality coming next.');
});
