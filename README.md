# Mohammad Omid Noori — Portfolio

Responsive static portfolio with an EmailJS contact form. It can be hosted on a static website host and does not need a Node server or SMTP password.

## Connect the form to EmailJS

1. Create a free account at [EmailJS](https://www.emailjs.com/) and verify your email address.
2. In the EmailJS dashboard, add and connect an email service.
3. Create an email template. Set the recipient to `noori7omid86@gmail.com`, the Reply-To address to `{{reply_to}}`, and use these variables in the subject/body: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, and `{{message}}`. Optional name variables: `{{first_name}}`, `{{last_name}}`.
4. Copy your EmailJS public key, service ID, and template ID into `email-config.js`, replacing the `YOUR_...` values.
5. Upload the project folder to a static website host and test the form. For local testing, run `python -m http.server 8000` inside this folder and open `http://localhost:8000`.

The public key is intended for browser use. Do not add a private key or email password to `email-config.js`. The form sends through the EmailJS browser SDK and includes a 10-second client throttle and a hidden bot trap.

## Free plan limits

EmailJS currently lists its free plan as 200 requests per month and two templates. It is free, but not unlimited. Check the provider's current plan details before relying on a specific quota.
