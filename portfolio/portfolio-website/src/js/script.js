// This file contains JavaScript code for interactive features of the portfolio website. 

document.addEventListener('DOMContentLoaded', function() {
    // Example: Form validation for the contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                event.preventDefault();
                alert('Please fill in all fields.');
            } else {
                alert('Thank you for your message!');
            }
        });
    }

    // Example: Dynamic content loading for projects
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                data.projects.forEach(project => {
                    const projectDiv = document.createElement('div');
                    projectDiv.classList.add('project');
                    projectDiv.innerHTML = `
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <a href="${project.link}" target="_blank">View Project</a>
                    `;
                    projectsSection.appendChild(projectDiv);
                });
            })
            .catch(error => console.error('Error loading projects:', error));
    }
});