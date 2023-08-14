


const nameField = document.getElementById('name');
const userTitle = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role')
const shirtDesigns = document.getElementById('design')
const colorSelect = document.getElementById('color')
const activitiesFieldSet = document.getElementById('activities')
const checkboxes = document.querySelectorAll('.activities-box input[type="checkbox"]');
let activitiesCost = document.getElementById('activities-cost')
let currentCost = 0
const paymentMethod = document.getElementById('payment')
const divCreditCard = document.getElementById('credit-card')
const divPayPal = document.getElementById('paypal')
const divBitcoin = document.getElementById('bitcoin')



//-------- Name Field ------------ DONE

// use the focus() method on input "text"
document.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});



//---------- Job Role Section ------------ DONE
document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions
    hideOtherJobField();
});

function hideOtherJobField(){
    if (userTitle.value != "other" ){
        console.log("OTHER selected");
        otherJobRole.type = "hidden";
    }
    else {
        otherJobRole.type = "text";
    }
}
// call the funcion whenever the Job Role is changed
userTitle.addEventListener('change', (e) => {
    hideOtherJobField();
});



//----------- T-Shirt Info Section --------------- DONE
document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions
    colorSelect.disabled = true;
});

shirtDesigns.addEventListener('change', (e) => {
    designValue = shirtDesigns.value;
    colorSelect.disabled = false;
    colorSelect.value = '';

    for (let i = 0; i < colorSelect.options.length; i++) {
        const option = colorSelect.options[i];
        const dataTheme = option.getAttribute('data-theme')

        if (dataTheme !== designValue){
            console.log(`designValue = ${designValue}`)
            option.hidden = true;
        }
        else {
            option.hidden = false;
        }
    }
});



//------------ Activities Section -------------- DONE
document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions
    activitiesCost.innerHTML = `Total $${currentCost}`;
});

activitiesFieldSet.addEventListener('change', (e) => {
    currentCost = 0; //resets the current cost before calculating based on selections

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            let price = parseInt(checkbox.getAttribute('data-cost'));
            currentCost += price;
        }
    }
    activitiesCost.innerHTML = `Total $${currentCost}`;
})



//------------- Payment Info Section --------------- DONE
document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions

    paymentMethod.value = "credit-card";
    divPayPal.hidden = true;
    divBitcoin.hidden = true;
});

paymentMethod.addEventListener('change', (e) => {
    if (paymentMethod.value === "credit-card") {
        divCreditCard.hidden = false;
        divPayPal.hidden = true;
        divBitcoin.hidden = true;
    }
    else if (paymentMethod.value === "paypal") {
        divCreditCard.hidden = true;
        divPayPal.hidden = false;
        divBitcoin.hidden = true;
    }
    else if (paymentMethod.value === "bitcoin") {
        divCreditCard.hidden = true;
        divPayPal.hidden = true;
        divBitcoin.hidden = false;
    }
})



//------------ Form Validation ------------------- DONE

const myForm = document.forms[0];

myForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (validateForms()) {
        myForm.submit(); // Submit the form
        alert("Your Form Has Been Submitted!")
    } else {
        // No action needed as validateForms provides the necessary add/remove of errors and hints
    }
});



//------------ The Activities Section ------------ DONE
activitiesFieldSet.addEventListener('focusin', (e) => {
    const focusedCheckbox = e.target;

    if (focusedCheckbox.type == 'checkbox') {
        focusedCheckbox.parentElement.classList.add('focus');
    }
});

activitiesFieldSet.addEventListener('focusout', (e) => {
    const focusedCheckbox = e.target;
    if (focusedCheckbox.type === 'checkbox') {
        focusedCheckbox.parentElement.classList.remove('focus');
    }
});







//------------ Form Validation ------------------- DONE
function validateForms(){

    //We need to first check if its a credit card and only call the correct validation functions
    if (paymentMethod.value === "credit-card") {
        // To ensure that all fields are validated and we dont short circuit, we will call each and store the values
        const nameValid = validateName();
        const emailValid = validateEmail();
        const activitiesValid = validateActivities();
        const cardNumberValid = validateCardNumber();
        const zipcodeValid = validateZipcode();
        const cvvValid = validateCVV();
        // const expMonthValid = validateExpirationDate();
        // const expYearValid = validateExpirationYear();

        if (nameValid &&
            emailValid &&
            activitiesValid &&
            cardNumberValid &&
            zipcodeValid &&
            cvvValid) {
            return true; // Form is valid
        } else {
            return false; // Form is not valid
        }
    }
    else {
        // To ensure that all fields are validated and we dont short circuit, we will call each and store the values
        const nameValid = validateName();
        const emailValid = validateEmail();
        const activitiesValid = validateActivities();

        if (nameValid && emailValid && activitiesValid ) {
            return true; // Form is valid
        } else {
            return false; // Form is not valid
        }
    }

}


function validateName(){
    const name = document.getElementById('name');
    const nameValid = validateRequiredInput(name);
    console.log(nameValid)
    if (nameValid){
        console.log("PASSED validation")
        removeValidationError(name)
        return true
    }
    else {
        console.log("FAILED validation")
        addValidationError(name)
        return false
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailValue = email.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(emailValue)) {
        removeValidationError(email);
        return true;
    } else {
        addValidationError(email);
        return false;
    }
}


function validateActivities(){
    let itemChecked = false;
    const activitiesBox = document.getElementById('activities-box')

    for (let i = 0; i < checkboxes.length; i++) {
        const checkbox = checkboxes[i];
        if (checkbox.checked) {
            itemChecked = true;
        }
    }

    if (itemChecked){
        removeValidationError(activitiesBox)
        return true
    }
    else {
        addValidationError(activitiesBox)
        return false
    }

}


function validateCardNumber() {
    const ccNum = document.getElementById('cc-num');
    const ccNumValue = ccNum.value.replace(/\s+/g, '').replace(/-/g, ''); // Remove spaces and dashes

    const ccNumPattern = /^[0-9]{13,16}$/;

    if (ccNumPattern.test(ccNumValue)) {
        removeValidationError(ccNum);
        return true;
    } else {
        addValidationError(ccNum);
        return false;
    }
}



function validateZipcode(){
    const zipInput = document.getElementById('zip');
    const zipValue = zipInput.value.trim();
    console.log("--- Beginning validateCVV")
    console.log(`zipValue: ${zipValue}`)

    if (/^\d{5}$/.test(zipValue)) {
        console.log("PASSED validation")
        removeValidationError(zipInput)
        return true; // CVV is valid
    } else {
        console.log("FAILED validation")
        addValidationError(zipInput)
        return false; // CVV is not valid
    }
}


function validateCVV(){
    const cvvInput = document.getElementById('cvv');
    const cvvValue = cvvInput.value.trim();
    console.log("--- Beginning validateCVV")
    console.log(`cvvValue: ${cvvValue}`)

    if (/^\d{3}$/.test(cvvValue)) {
        console.log("PASSED validation")
        removeValidationError(cvvInput)
        return true; // CVV is valid
    } else {
        console.log("FAILED validation")
        addValidationError(cvvInput)
        return false; // CVV is not valid
    }
}


// Function to add validation error indications
function addValidationError(element) {

    const parentElement = element.parentNode;
    console.log("--- Beginning addValidationError")
    console.log(`element.id: ${element.id}  |  element.className: ${element.className}`)

    parentElement.classList.remove('valid');
    parentElement.classList.add('not-valid');

    hint = element.parentElement.querySelector('.hint');
    hint.style.display = 'block';
}


// Function to remove validation error indications
function removeValidationError(element) {
    const parentElement = element.parentNode;
    console.log("--- Beginning addValidationError")
    console.log(`element.id: ${element.id}  |  element.className: ${element.className}`)

    parentElement.classList.remove('not-valid');
    parentElement.classList.add('valid');

    hint = element.parentElement.querySelector('.hint');
    hint.style.display = 'none';
}


// Function to validate required inputs
function validateRequiredInput(inputElement) {
    if (inputElement.value.trim() === '') {
        return false;
    } else {
        return true;
    }
}


