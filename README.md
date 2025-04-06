# PolicyPal - Insurance Management App

PolicyPal is a web-based application that helps users manage their insurance policies in one place. This repository contains the HTML templates for the app's user interface.

## Project Structure

- `index.html` - Entry point that redirects to the welcome page
- `html_templates/` - Directory containing all HTML templates for the app
  - `welcome.html` - Welcome screen (entry point)
  - `language.html` - Language selection screen
  - `register.html` - User registration screen
  - `verify.html` - Email verification screen
  - `terms.html` - Terms & Privacy Policy screen
  - `dashboard.html` - Dashboard/Home screen
  - `policy-list.html` - Policy List screen
  - `add-policy.html` - Add New Policy screen
  - `advisor.html` - AI Policy Advisor Chat Interface
  - `share.html` - Policy Sharing screen
  - `settings.html` - Settings screen

## Missing Screens (To Be Implemented)

According to the features.md specification, the following screens still need to be created:

1. `policy-details.html` - Comprehensive details of a selected policy
2. `edit-policy.html` - Screen to update policy information
3. `document-upload.html` - Screen for uploading policy-related documents
4. `policy-search.html` - Dedicated search screen for finding policies
5. `help-center.html` - Help center with general information and resources
6. `faqs.html` - Frequently asked questions and answers
7. `contact-support.html` - Contact form and support information
8. `profile.html` - User profile information and account details
9. `edit-profile.html` - Screen to update user profile information
10. `about.html` - Information about PolicyPal and its developers
11. `tour.html` - App tour/walkthrough for first-time users

## Features

- User registration and onboarding
- Policy management (add, view, edit)
- AI-powered policy advisor for answering insurance questions
- Policy sharing with family members and friends
- Customizable app settings (language, theme, notifications)

## Usage

1. Open `index.html` in a web browser to start the app
2. The app will redirect to the welcome screen, where you can begin the onboarding process
3. After registration, you'll be directed to the dashboard where you can manage your policies

### Running with a Local Web Server

For the best experience, run the app using a local web server:

```bash
# Using Python 3 (from the project root directory)
python -m http.server

# Using Python 2 (from the project root directory)
python -m SimpleHTTPServer

# Using Node.js (requires http-server package)
npx http-server
```

Then visit `http://localhost:8000` in your web browser.

## Note

This is a front-end prototype. In a production environment, the app would connect to a backend service to handle data storage, user authentication, and the AI advisor functionality.

## Technologies Used

- HTML5
- CSS3
- Font Awesome for icons 