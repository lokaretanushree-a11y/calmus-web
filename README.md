# CALMUS - Student Wellbeing Platform

CALMUS is a campus-based student wellbeing platform that allows students to check in with their mood, receive AI-powered sentiment analysis, and access supportive resources.

## Features

- **Authentication**: Secure login/signup using Firebase Authentication (Email/Password + Guest).
- **Mood Check-In**: Students can log their thoughts and feelings.
- **AI Analysis**: Sentiment analysis using Google Natural Language API to determine emotional tone.
- **Dashboard**: View past mood entries and access campus resources.
- **Privacy**: User data is securely stored in Firebase Firestore.

## Setup Instructions

### 1. Firebase Setup
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. **Authentication**: Enable "Email/Password" and "Anonymous" (Guest) sign-in providers.
4. **Firestore**: Create a Firestore database (start in Test Mode for development).
5. **Web App**: Register a web app in your project settings to get your configuration.

### 2. Google Natural Language API
1. In the Google Cloud Console (linked to your Firebase project), enable the **Cloud Natural Language API**.
2. Create an API Key in "APIs & Services > Credentials".

### 3. Environment Variables (Replit Secrets)
Add the following secrets to your Replit environment (Tools > Secrets):

| Secret | Description |
|--------|-------------|
| `VITE_FIREBASE_API_KEY` | Your Firebase Web API Key |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase Project ID |
| `VITE_FIREBASE_APP_ID` | Your Firebase App ID |
| `GOOGLE_NLP_API_KEY` | Your Google Cloud API Key for NLP |

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Shadcn UI
- **Backend**: Node.js/Express (for NLP proxy), Firebase (Auth/Data)
- **AI**: Google Cloud Natural Language API
