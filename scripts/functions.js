const $data = inputName => document.forms['registration'][inputName];
const $optionBoxes = data => {
    const labels =[...(document.getElementsByTagName('label'))]; // [...] creates an array out of NodeList
    let valueArray = [...(document.getElementsByName(data))].filter( i => i.checked).map( j => j.id);
    let labelValues = valueArray.map( i => labels.filter( j => j.htmlFor == i)[0].textContent);
    return labelValues; 
};
// below get selected items in option
const $selectBox = (data) => {
    let selected = [];
    for( let opt of document.getElementById(data)) {
        if(opt.selected) selected.push(opt.value)
    }
    return selected;
};

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
    
};

//get date from date of birth
function calcAge() {
    let dob = new Date(document.getElementById('dob').value);
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();

    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0) age--;
    document.getElementById('age').value = age;
};

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
};

function saveFormData() {
    
    let fname = $data('fname').value;
    let mname = $data('mname').value;
    let lname = $data('lname').value;

    let dob = $data('dob').value;
    let age = $data('age').value;
    let gender = $optionBoxes('sex')[0];

    let address = $data('address').value;
    let phone = $data('phone').value;
    let email = $data('email').value;

    let e_name = $data('e-name').value;
    let e_phone = $data('e-phone').value;
    let e_email = $data('e-email').value;

    let history = $optionBoxes('option-box');
    let symptoms = $selectBox('symptoms');

    let meds = $optionBoxes('question')[0];
    let medications = $data('med').value;

    return {
        id: Date.now(),
        fName: fname,
        mName: mname,
        lName: lname,
        dob,
        age, 
        gender,
        fullName: `${fname}${' '+ mname} ${lname}`,
        patientContact: [address, phone, email],
        emergencyContact: [e_name, e_phone, e_email],
        history, 
        symptoms,
        meds,
        medications,
    }
}

// console.log($optionBoxes('option-box'))
let data = localStorage.getItem('patientData');
let patientList = JSON.parse(data);
let tempArray = [];
tempArray.push(...patientList);

window.onclose = () => tempArray = [];

document.querySelector('form.registration input[type=submit]').onclick = () => {
    let required = document.querySelectorAll('input[required]');
    if([...required].some( i => i.value == '')) return alert('Please fill in the required fields');
    tempArray.push(saveFormData());
    console.log(tempArray);
    localStorage.setItem('patientData', JSON.stringify(tempArray, null, 2));
    document.forms['registration'].reset();
    alert('Data Successfully Saved');
};