document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const textInput = document.getElementById('textInput').value;

    const fullNameRegex = /^[A-Z][a-z]*(?:[-'][A-Z][a-z]*)*\s[A-Z][a-z]*(?:[-'][A-Z][a-z]*)*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;

    if (fullNameRegex.test(fullName)) {
        document.getElementById('fullNameError').style.display = 'none';
    } else {
        document.getElementById('fullNameError').style.display = 'block';
        valid = false;
    }

    if (emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'none';
    } else {
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    if (textInput.trim() !== "") {
        document.getElementById('textError').style.display = 'none';
    } else {
        document.getElementById('textError').style.display = 'block';
        valid = false;
    }

    const formData = {
        fullName: fullName,
        email: email,
        textInput: textInput
    };

    console.log('Form Data:', formData);

    if (valid) {
        alert('Form is valid!');
    }
});
