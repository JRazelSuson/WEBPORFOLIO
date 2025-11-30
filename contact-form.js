// contact-form.js
// Contact form handler using Formspree

(function(){
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(event){
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate inputs
    if (!name || !email || !subject || !message) {
      showStatus('❌ Please fill in all fields', 'error');
      return;
    }

    // Show loading state
    showStatus('⏳ Sending your message...', 'loading');

    try {
      // Send to Formspree endpoint
      const response = await fetch('https://formspree.io/f/xyzjwbdq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          message: message,
          _subject: `New message from ${name}: ${subject}`
        })
      });

      const data = await response.json();

      if (response.ok || data.ok) {
        console.log('✅ Email sent successfully!', data);
        showStatus('✅ Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = '';
        }, 5000);
      } else {
        throw new Error(data.error || 'Form submission failed');
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      showStatus('❌ Error: ' + error.message + '. Please try again or use direct contact below.', 'error');
    }
  });

  function showStatus(message, type){
    formStatus.textContent = message;
    formStatus.className = type;
  }
})();
