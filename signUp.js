const form = document.getElementById('form')
const firstName = document.getElementById('first_name')
const lastName = document.getElementById('last_name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const passwordCheck = document.getElementById('password_check')
const date = document.getElementById('date')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkInputs()
})

function checkInputs() {
    const firstNameValue = firstName.value.trim()
    const lastNameValue = lastName.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const passwordCheckValue = passwordCheck.value.trim()
    const dateValue = date.value

    checkFirstName(firstNameValue)
    checkLastName(lastNameValue)
    checkDate(dateValue)
    checkEmail(emailValue)
    checkPassword(passwordValue)
    checkIsPasswordConfirmed(passwordCheckValue, passwordValue)

    const errors = form.querySelectorAll('.error')
    if (!errors.length) {
        submitForm(firstNameValue, lastNameValue, dateValue, emailValue, passwordValue)
    }
}

function checkFirstName(firstNameValue) {
    if (firstNameValue === '') {
        setError(firstName, 'The field is required')
    } else if (firstNameValue.length < 2) {
        setError(firstName, 'Required 2 or more symbols')
    } else if (firstNameValue.length > 25) {
        setError(firstName, 'Required less than 25 symbols')
    } else {
        setSuccess(firstName)
    }
}

function checkLastName(lastNameValue) {
    if (lastNameValue === '') {
        setError(lastName, 'The field is required')
    } else if (lastNameValue.length < 2) {
        setError(lastName, 'Required 2 or more symbols')
    } else if (lastNameValue.length > 25) {
        setError(lastName, 'Required less than 25 symbols')
    } else {
        setSuccess(lastName)
    }
}

function checkDate(dateValue) {
    if (dateValue === '') {
        setError(date, 'The field is required')
    } else if (!validateDate(dateValue) || +dateValue.slice(0, 4) < 1900) {
        setError(date, 'Real date of birth is required')
    } else {
        setSuccess(date)
    }
}

function checkEmail(emailValue) {
    if (emailValue === '') {
        setError(email, 'The field is required');
    } else if (!validateEmail(emailValue)) {
        setError(email, 'Not a valid email');
    } else {
        setSuccess(email);
    }
}

function checkPassword(passwordValue) {
    if (!validatePassword(passwordValue)) {
        setError(password, 'At least 8 symbols, 1 capitalized letter, 1 digit, 1 special symbol: !@#$%')
    } else {
        setSuccess(password)
    }
}

function checkIsPasswordConfirmed(passwordCheckValue, passwordValue) {
    if (passwordCheckValue === '') {
        setError(passwordCheck, 'The field is required');
    } else if (passwordCheckValue !== passwordValue) {
        setError(passwordCheck, 'Passwords should be equal')
    } else {
        setSuccess(passwordCheck)
    }
}

function setError(input, message) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('.input__error');
    input.className = 'form__input error';
    error.innerText = message;
    error.style.visibility = 'visible'
}

function setSuccess(input) {
    const formControl = input.parentElement;
    const error = formControl.querySelector('.input__error');
    input.className = 'form__input';
    error.innerText = '';
    error.style.visibility = 'hidden'
}

function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function validatePassword(password) {
    return password
        .match(/^(?=.*[0-9])(?=.*[!@#$%])[a-zA-Z0-9!@#$%^&*]{8,50}$/)
}

function validateDate(date) {
    const formDate = new Date(date);
    const currentDate = new Date();
    return formDate.getTime() - 7200000 < currentDate.getTime();
}

async function submitForm(firstNameValue, lastNameValue, dateValue, emailValue, passwordValue) {
    try {
        const requestBody = {
            firstName: firstNameValue,
            lastName: lastNameValue,
            dateOfBirth: dateValue,
            email: emailValue,
            password: passwordValue,
        };
        console.log('Request Body: ', requestBody);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        const result = await response.json()
        console.log('Response: ', result)
    } catch (error) {
        console.log(error)
    }
}