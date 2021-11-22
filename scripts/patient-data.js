let patientArray = [];
let dataContainer = document.getElementById('data-container');

function addToDisplay(data) {
    data.forEach( patient => {
        dataContainer.innerHTML += `
        <div class="patient">
            <h2 id="name">${patient.fullName}</h2>
            <div class="info-1">
                <div id="dob"><b>Date of Birth:</b> ${patient.dob}</div>
                <div id="age"><b>Age:</b> ${patient.age}</div>
                <div id="gender"><b>Gender:</b> ${patient.gender}</div>
            </div>
            <div class="info-2">
                <h3>Contact Details</h3>
                <div id="address"><b>Current Address:</b> ${patient.patientContact[0] ?? ''}</div>
                <div id="phone"><b>Phone:</b> ${patient.patientContact[1] ?? ''}</div>
                <div id="email"><b>Email:</b> ${patient.patientContact[2] ?? ''}</div>
            </div>
            <div class="info-2">
                <h3>Emergency Contact</h3>
                <div id="e-address"><b>Name:</b> ${patient.emergencyContact[0] ?? ''}</div>
                <div id="e-phone"><b>Phone:</b> ${patient.emergencyContact[1] ?? ''}</div>
                <div id="e-email"><b>Email:</b>${patient.emergencyContact[2] ?? ''}</div>
            </div>
            <div>
                <h3>History</h3>
                <ul id="history">
                ${ (patient.history.map( item => `<li>${item}</li>`)).join(' ')}
                </ul>
            </div>
            <div>
                <h4>Current Symptoms</h4>
                <ul id="symptoms">
                ${ (patient.symptoms.map( item => `<li>${item}</li>`)).join(' ')}
                </ul>
            </div>
            <div>
                <h4>Medications</h4>
                <div>
                ${ patient.meds == 'No' || patient.meds == undefined ?
                    'Patient isn\'t taking any medication.' :
                    `Patient is taking the following medication(s):<br> - ${patient.medications}`
                }
                </div>
            </div>
        </div>
        `
    })
}

window.onload = () => {
    if(!localStorage.getItem('patientData')) {
        dataContainer.innerHTML += `<h2>No Data to Display</h2>`;
        return;
    };
    let data = localStorage.getItem('patientData');
    let patientList = JSON.parse(data);
    patientArray.push(...patientList);
    console.log(patientArray);

    addToDisplay(patientArray);
}