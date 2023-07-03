document.addEventListener('DOMContentLoaded', function() {
  // Run the code when the DOM content is loaded

  const form = document.getElementById('myForm');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const notificationEmailsInput = document.getElementById('notificationEmails');
  const ageInput = document.getElementById('age');
  const contactNumberInput = document.getElementById('contactNumber');
  const submitButton = document.getElementById('submitButton');

  let isValid = false; // Initialize form as invalid

  form.addEventListener('submit', function(event) {
    // Add event listener to the form's submit event
    event.preventDefault(); // Prevent form submission
    clearErrorMessages(); // Clear any existing error messages
    validateForm(); // Validate the form
  });

  const inputs = [
    firstNameInput,
    lastNameInput,
    passwordInput,
    confirmPasswordInput,
    notificationEmailsInput,
    ageInput,
    contactNumberInput
  ];

  for (const input of inputs) {
    // Add event listener to each input field's blur event
    input.addEventListener('blur', function() {
      validateField(input); // Validate the specific field
      updateSubmitButtonState(); // Update the state of the submit button
    });
  }

  function validateForm() {
    isValid = true; // Reset isValid to true before validating all fields

    for (const input of inputs) {
      // Loop through each input field
      if (!validateField(input)) {
        // If a field is invalid
        isValid = false; // Set isValid to false
      }
    }

    if (isValid) {
      // If the form is valid
      alert('Form submitted successfully');
      clearErrorMessages(); // Clear any existing error messages
      form.reset(); // Reset the form
    }
  }

  function validateField(input) {
    const inputValue = input.value.trim(); // Get the trimmed value of the input field

    if (inputValue === '') {
      // If the field is empty
      displayErrorMessage(input, `${getFieldName(input)}`); // Display the error message
      isValid = false; // Set isValid to false
    } else {
      switch (input) {
        case firstNameInput:
        case lastNameInput:
          break; // No additional validation for first name and last name fields
        case passwordInput:
          if (!validatePassword(inputValue)) {
            // If the password is invalid
            displayErrorMessage(input, 'Password must have least 8 characters,one uppercase,lowercase letter and numeric'); // Display the error message

            isValid = false; // Set isValid to false
          } else {
            clearErrorMessage(input); // Clear the error message
          }
          break;
        case confirmPasswordInput:
          if (inputValue !== passwordInput.value.trim()) {
            // If the confirmation password does not match the password
            displayErrorMessage(input, 'Passwords do not match'); // Display the error message
            isValid = false; // Set isValid to false
          } else {
            clearErrorMessage(input); // Clear the error message
          }
          break;
        case notificationEmailsInput:
          if (!validateEmails(inputValue)) {
            // If the emails are invalid
            displayErrorMessage(input, 'Emails are invalid'); // Display the error message
            isValid = false; // Set isValid to false
          } else {
            clearErrorMessage(input); // Clear the error message
          }
          break;
        case ageInput:
          if (!validateAge(inputValue)) {
            // If the age is invalid
            displayErrorMessage(input, 'Age must be between 18 and 150'); // Display the error message
            isValid = false; // Set isValid to false
          } else {
            clearErrorMessage(input); // Clear the error message
          }
          break;
        case contactNumberInput:
          if (!validateContactNumber(inputValue)) {
            // If the contact number is invalid
            displayErrorMessage(input, 'Contact Number is invalid'); // Display the error message
            isValid = false; // Set isValid to false
          } else {
            clearErrorMessage(input); // Clear the error message
          }
          break;
        default:
          break;
      }
    }

    return isValid; // Return the validity of the field
  }


  function updateSubmitButtonState() {
    const allInputsValid = inputs.every(input => input.value.trim() !== '' && input.checkValidity());
    // Check if all inputs have non-empty values and pass HTML5 validation
  
    submitButton.disabled = !allInputsValid; // Enable or disable the submit button based on the validation result
  
    if (submitButton.disabled) {
      submitButton.style.opacity = '0.7'; // Set low opacity for disabled button
    } else {
      submitButton.style.opacity = '1'; // Set high opacity for enabled button
    }
  }
  function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password); // Check if the password matches the specified regex pattern
  }

  function validateEmails(emails) {
    const emailList = emails.split(','); // Split the email string into an array of emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    for (const email of emailList) {
      // Loop through each email
      if (!emailRegex.test(email.trim())) {
        // If an email is invalid
        return false; // Return false (invalid)
      }
    }
    return true; // All emails are valid
  }

  function validateAge(age) {
    return age >= 18 && age <= 150; // Check if the age is within the specified range
  }

  function validateContactNumber(contactNumber) {
    const contactNumberRegex = /^\d{11}$/;
    return contactNumberRegex.test(contactNumber); // Check if the contact number matches the specified regex pattern
  }

  function displayErrorMessage(inputElement, message) {
    const errorElement = document.getElementById(inputElement.id + 'Error');
    errorElement.textContent = message; // Set the error message for the input field
  }

  function clearErrorMessage(inputElement) {
    const errorElement = document.getElementById(inputElement.id + 'Error');
    errorElement.textContent = ''; // Clear the error message for the input field
  }

  function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error');
    for (const errorElement of errorElements) {
      errorElement.textContent = ''; // Clear all error messages
    }
  }

  function getFieldName(input) {
    return input.getAttribute('data-fieldname') || ''; // Get the field name from the input's data-fieldname attribute
  }
});
