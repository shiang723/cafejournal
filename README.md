# Cafe Journal

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

Cafe Journal is a react native app that allows users to create an account and log journal entries of cafes. The entries will be displayed on a map view so the user can visualize their cafe journey. This is my personal project that was created for me to learn how to use the React Native framework.

The app is currently still in development.
## Tech Stack
**Frontend**
- React Native
- TypeScript
- Expo
  
**Backend**
- Firebase Auth
- Firestore
- Google Maps SDK

## Get started
Here is a quick guide on how to run the app.
Note: The app is still in development, so there will be many bugs.

1. Clone the repository
    ```bash
   git clone https://github.com/shiang723/cafejournal.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```
3. Get API keys
   
    This app uses Google Maps API, Firebase auth and Firestore. Thus, you will need to create your own .env file and use your own API keys.
 
4. Start the app on your Android emulator

   ```bash
   npx expo run:android 
   ```
## Current Features
- Display user's journal entries
- Add a journal entry
- Delete a journal entry
- View a journal entry
- View journal entries on a map
- log in/sign up

## Future Features
- Check that the journal entry has all required inputs
- Sort and filter journal entries by location or date
- Calendar view of journal entries
- User page to display username, profile, and additional information
- Display journal entries of the same location on a list on the map
- Add an edit journal entry feature
