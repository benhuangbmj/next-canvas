# Canvas API Setup and Development Guide

## 1. Install Dependencies

Start by installing the necessary dependencies for your project:

```bash
npm install
```

## 2. Generate Your Canvas Access Token (Personal Access Token)

Canvas allows users to generate personal access tokens that can be used for API calls. These tokens are generated manually within the Canvas interface. Here’s how you can create one:

Steps to Generate Your Access Token:
Log in to Canvas:

Go to the Canvas site (e.g., Canvas Instructure) and log in to your account.

Go to Account Settings:

On the left sidebar, click on your Account (either the icon or your name).

Then, click on Settings.

Generate New Access Token:

Scroll down to the Approved Integrations section.

At the bottom, click on + New Access Token.

Fill in the Token Details:

You will be prompted to give the token a name (e.g., “MyAppToken”).

Optionally, set an expiration date if you want the token to expire after a specific period.

Once done, click on Generate Token.

Copy the Token:

Canvas will display the token once. Copy it immediately, as it won’t be shown again.

This token is your ACCESS_TOKEN. You’ll need it to authenticate your API requests.

## 3. Get Course ID and Assignment ID

In order to make meaningful API calls, you'll need the course id and assignment id. Here’s how you can retrieve them:

- a Get Your Course ID:
  Log in to your Canvas account.

Navigate to the course you're interested in.

In the URL, you will see the course ID as part of the URL. For example:

https://canvas.instructure.com/courses/12345
In this case, 12345 is the course ID.

- b Get Your Assignment ID:
  Inside your course, go to the Assignments section.

Click on the assignment you're interested in.

The assignment ID will also be part of the URL:

https://canvas.instructure.com/courses/12345/assignments/67890
Here, 67890 is the assignment ID.

## 4. Run the Development Server

After setting up your access token and getting your course and assignment IDs, you're ready to run the development server:

npm run dev
