
// login form validation
function validateForm() {
    const username = document['login-form'].username.value.trim();
    const password = document['login-form'].password.value.trim();

    console.log(username, password);

    if(username == "" || username.replaceAll(' ', '').length < 6) {
        alert('Please enter a valid username.\nAt least 6 characters without spaces.');
        document['login-form'].username.value = '';
        document['login-form'].username.focus();
        return false;
    }
    if(password == "" || password.includes(" ")) {
        alert('Please enter a valid password.\nNo spaces allowed in between characters.');
        document['login-form'].password.focus();
        return false;
    }
    if(password.length < 6 || password.includes(" ")) {
        alert('The password must be at least 6 characters long.');
        document['login-form'].password.focus();
        return false;
    }
    alert('Login successful.');
    return true;
    
}

//get date from date of birth
function calcAge() {
    let dob = new Date(document.getElementById('dob').value);
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0) age--;
    document.getElementById('age').value = age;
}

//togle disabled field
function toggleDisabled() {
    let yes = document.getElementById('yes').checked;
    let med = document.getElementById('med');

    if(yes) {
        med.disabled = false;
        med.placeholder = 'Medication';
    }
    else {
        med.disabled = true;
        med.placeholder = '';
    };
}


