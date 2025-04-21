function validateForm(event) {
    event.preventDefault();
    const form = document.getElementById('surveyForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    if (isValid) {
        gatherFormData();
    } else {
        alert('Please fill out all required fields.');
    }
}

function resetForm() {
    const form = document.getElementById('surveyForm');
    form.reset();
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => field.classList.remove('error'));
}

function addCourseField() {
    const courseContainer = document.getElementById('courseContainer');
    const newCourseDiv = document.createElement('div');
    newCourseDiv.classList.add('courseField');

    const newCourseInput = document.createElement('input');
    newCourseInput.type = 'text';
    newCourseInput.name = 'courses[]';
    newCourseInput.placeholder = 'Enter course name';

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => newCourseDiv.remove();

    newCourseDiv.appendChild(newCourseInput);
    newCourseDiv.appendChild(deleteButton);
    courseContainer.appendChild(newCourseDiv);
}

function gatherFormData() {
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);
    const outputContainer = document.getElementById('outputContainer');
    const formContainer = document.getElementById('formContainer');

    let outputHTML = '<h2>Survey Results</h2>';
    formData.forEach((value, key) => {
        if (key === 'courses[]') {
            outputHTML += `<p>Course: ${value}</p>`;
        } else {
            outputHTML += `<p>${key}: ${value}</p>`;
        }
    });

    formContainer.style.display = 'none'; 
    outputContainer.innerHTML = outputHTML;
    outputContainer.style.display = 'block'; 
}

function resetProgress() {
    const formContainer = document.getElementById('formContainer');
    const outputContainer = document.getElementById('outputContainer');

    formContainer.style.display = 'block'; 
    outputContainer.style.display = 'none'; 
    resetForm();
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('surveyForm').addEventListener('submit', validateForm);
    document.getElementById('resetLink').addEventListener('click', resetProgress);
    document.getElementById('addCourseButton').addEventListener('click', addCourseField);
});