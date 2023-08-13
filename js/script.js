


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



//Todo:-------- Name Field ------------ DONE

// use the focus() method on input "text"
document.addEventListener('DOMContentLoaded', function() {
    nameField.focus();
});


//Todo:---------- Job Role Section ------------ DONE
//The "Job Role" section has an <input type="text"> field where users can enter a custom job role. If the user selects
// "Other" in the "Job Role" drop-down menu, they can enter info into the "Other job role" text field. This field
// should be hidden by default and only be displayed if "Other" is selected in the drop-down menu.
//
// Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
// Program the "Job Role" <select> element to listen for changes. When a change is detected, display/hide the
// "text field" based on the selection in the drop-down menu.

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


//Todo:----------- T-Shirt Info Section --------------- DONE

// The options in the "Color" drop-down menu are not available for each t-shirt design. So the user shouldn’t be able
// to see or choose a color option until they have chosen a design.
//
//     Disable the "Color" <select> element.
//     Set up the "Design" <select> element to listen for changes. When a change is detected:
//     The "Color" <select> element should be enabled.
//     The "Color" <select> element should display an available color.
//     The "Color" dropdown menu should display only the color options associated with the selected design. For
// example:
//     If the user selects "Theme - JS Puns" then the "Color" menu should only display "Cornflower Blue," "Dark Slate
// Grey," and "Gold." If the user selects "Theme - I ♥ JS" then the "Color" menu should only display "Tomato," "Steel
// Blue," and "Dim Grey."

// NOTE
// A select element is used for the color selection. There are two parts to a select element display: the element
// field and the drop-down menu which opens after clicking on the field. Both the "Color" field and drop-down menu
// must correctly update when the user selects a different theme. Neither should be empty or display
// unavailable theme / color combinations.
//
//     The selected attribute can determine which option element is displayed in the select field.
//     The hidden attribute can prevent option elements from being displayed in the drop down menu.

document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions
    colorSelect.disabled = true;
});

shirtDesigns.addEventListener('change', (e) => {
    designValue = shirtDesigns.value;
    colorSelect.disabled = false;

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


//Todo:------------ Activities Section -------------- DONE

// Activities Section
// The "Total: $" paragraph below the "Register for Activities" section should update to reflect the total cost of all
// the selected activities.  Add an event listener to the "Register for Activities" fieldset element to listen for
// changes. When a change is detected: If an activity is checked, the total cost should increase by the value in the
// data-cost attribute of the activity’s <input type="checkbox"> element. If an activity is unchecked, the total cost
// should decrease by that amount. The <p> element with the id of "activity-cost" below the activities section should
// update to reflect the adjustment made.

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




//Todo:------------- Payment Info Section --------------- DONE

// The credit card payment option should be selected for the user by default. So upon page load "Credit Card" should
// be the selected option of the select element, and the credit card payment section should be the only payment section
// displayed on the page. When the user selects a different payment option from the drop-down menu, the form should
// update to display only the chosen payment method section.
//
//     Program the "I'm going to pay with" <select> element to listen for user changes.
//
//     When a change is detected, hide all payment sections in the form’s UI except the selected one.

document.addEventListener('DOMContentLoaded', function() {
    // NOTE: For the purpose of this course I am adding another page load listener, but in actuality I would use
    // only one document load listener at the top of the script to call all necessary functions

    paymentMethod.value = "credit-card";
    divPayPal.hidden = true;
    divBitcoin.hidden = true;
});

//NOTE: There is a more dynamic way we could approach this, but for the sake of simplicity, I have chosen this method
// if we wanted to be dynamic, for instance if there were dozens of combinations vs only 3:
// we would first make an array of the objects we wanted to compare
// we could store the value of the payment option and then iterate through the array, make the comparison and changes
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



//Todo:------------ Form Validation ------------------- DONE

// Users shouldn’t be able to submit a form without the required information, or with invalid information. To prevent
// that from happening, avoid using plugins, libraries, snippets or the built-in HTML5 validation, and create your own
// custom form validation.
// Add an event listener to the form element to listen for the submit event. When the form
// submission is detected, each required form field or section should be validated to ensure that they have been filled
// out correctly.
// If any of the following required fields are not valid, the form submission should be prevented.
// The "Name" field cannot be blank or empty.
//
// The "Email Address" field must contain a correctly formatted email address.
// The email address does not need to be a real email address, just formatted like one. For example
// brian@teamtreehouse.com. Several characters for the username, preceded by "@", followed by another set of
// characters, ending with a "." and a couple more characters for the domain name.
//
// The "Register for Activities" section must have at least one activity selected. If and only if credit card is the
// selected payment method:
//
// The "Card number" field must contain a 13 - 16 digit credit card number without dashes or spaces. The value does not
// need to be a real credit card number.
//
// The "Zip code" field must contain a 5-digit number. The "CVV" field must

// contain a 3-digit number.
//
// Pro Tip A recommended approach is to create helper functions for each of the required
// fields to be validated. For example, for the "Name" field, a function could check the "Name" field’s value. If it
// equals an empty string or only blank spaces, the function could log out a helpful statement and return false.
// Otherwise, it would return true. And then in the `submit` event listener, you could call that helper function
// and check what it returns: if it returns false, you would prevent the form from submitting. Otherwise, you
// would allow the `submit` handler to either submit or move on to checking the next required field.

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




//Todo:------------ The Activities Section ------------ DONE

// Pressing the tab key on your keyboard moves the focus state from one input to the next, but the focus indicators in
// the "Register for Activities" section aren’t very obvious. To make the form more accessible we'll add visible focus
// states to these activities. This will give the users that use keyboards to navigate your page a visual confirmation
// of where they are located.  Program all of the activity checkbox input elements to listen for the focus and blur
// events. When the focus event is detected, add the ".focus" class to the checkbox input’s parent label element. When
// the blur event is detected, remove the .focus class from the label element that possesses it. It can be helpful here
// to directly target the element with the className of .focus in order to remove it.

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



//Todo:------------ Visual Validation Errors ------------ DONE

// Make the form validation errors obvious to all users. With the custom form validation checks you’ve already written,
// invalid form fields will prevent the form from submitting, but all users should be presented with clear
// notifications of which fields are invalid.
// When the user tries to submit the form, if a required form field or section is invalid:
// Add the ‘.not-valid’ class to the parent element of the form field or section. For the activity
// section, the parent element would be the fieldset element. For the other required inputs, the parent element would
// be a label element.
// Remove the ‘.valid’ class from the parent element of the form field or section.
// Display the .hint element associated with the form field or section.
//
// If a required form field or section is valid:
// Add the ‘.valid’ class to the parent element of the form field or section.
// Remove the ‘.not-valid’ class from the parent element of the form field or section.
// Hide the .hint element associated with that element.
//
// JavaScript alerts and prompts should not be used in your form validation error indications.
//
// If the user tries to submit an empty form, all form validation error indications should be displayed at once,
// rather than one at a time.
//
// Pro Tip A recommended approach to this part of the project is to create helper functions that accept an argument
// for the element that is being validated. For example, the function could accept an argument for the text input
// element that was checked. Then the function would update the styles for that element’s parent element and the last
// child of that parent element. One function could update the styles when errors are detected. And another function
// could update the styles when errors are resolved.


//Todo:------------ Finishing the Project ------------ DONE

// The final stage of the project is perhaps the most important. This is where your developer skills really shine as
// you carefully double-check that you've accomplished all requirements and that your project is ready for submission.
// Code Comments - It’s a best practice for development code to be well commented. Replace provided comments with your
// own to briefly describe your code and what it does. Code Readability - Readability is second only to functionality.
// Double-check your code to ensure the spacing and indentation is consistent and in keeping with best practices.
// Quality Assurance Testing - This is a key step in the development process. Open and run your app. Open the Chrome
// DevTools console and ensure that there are no errors displayed when the app is being used and tested. Pretend to be
// a user and test all aspects of functionality and every possible state of the app, while monitoring the console for
// bugs and resolving any that arise. Cross Browser Consistency - To pass, your project only needs to work in Chrome
// but it’s common for developers to test their projects in multiple browsers to know how they will perform out in the
// wild.
//
// Pro Tip Before submitting your project it's always a good idea to get an additional pair of eyes on it. This will
// avoid your project from being returned to you if you missed one of the requirements. You can share a link to your
// GitHub repository in the #review-my-project channel on Slack and a fellow student or staff member will happily
// have a look at it.




function validateForms(){

// The "Name" field cannot be blank or empty.
//
// The "Email Address" field must contain a correctly formatted email address.
// The email address does not need to be a real email address, just formatted like one. For example
// brian@teamtreehouse.com. Several characters for the username, preceded by "@", followed by another set of
// characters, ending with a "." and a couple more characters for the domain name.
//
// The "Register for Activities" section must have at least one activity selected. If and only if credit card is the
// selected payment method:
//
// The "Card number" field must contain a 13 - 16 digit credit card number without dashes or spaces. The value does not
// need to be a real credit card number.
//
// The "Zip code" field must contain a 5-digit number.
//
// The "CVV" field must contain a 3-digit number.



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


// function validateExpirationDate() {
//     const expiryDate = document.getElementById('exp-month')
//     console.log(expiryDate.value)
//     if (expiryDate.value !== 'Select Date' ){
//         removeValidationError(expiryDate)
//         return true
//     }
//     else {
//         addValidationError(expiryDate)
//         return false
//     }
// }
//
// function validateExpirationYear(){
//     const expiryYear = document.getElementById('exp-year')
//     console.log(expiryYear.value)
//     if (expiryYear.value !== 'Select Year' ){
//         removeValidationError(expiryYear)
//         return true
//     }
//     else {
//         addValidationError(expiryYear)
//         return false
//     }
// }


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

    element.classList.remove('not-valid');
    element.classList.add('valid');

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


