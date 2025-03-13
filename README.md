## Project Structure ##
This app is divided into 3 major components:
- Backend          [server]
- Web Frontend     [client]
- Mobile Frontend  [mobile]

## Backend* [Express Server] ##
- Create a .env file in the backend directory and update it with the following details:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
RECAPTCHA_SECRET_KEY=your_google_recaptcha_secret_key
```
- Setup and run the backend server
```bash
cd backend
npm install
node server.js
```

## Web Frontend [ReactJS] ##
- Update your site recaptcha client key in the config.js file at client/src/config.js
- Setup and run the frontend server
```
cd client
npm install
npm start
```

## Mobile Frontend [React Native] ##
- Update your system's local IP address in the config.js file
- Setup and run the frontend server
```
cd mobile
npm install
```
- To run on android emulator:
```
npm run android
```
- To run on Android or iOS phone, install the Expo Go app on the mobile device, run the following command and scan the QR code from the terminal on Expo Go (android) or Camera App (iPhone):
```
npx expo start 
```

**Note: The backend relies on email service api, the web url for which will be updated here soon. This service can also be hosted locally via the spring-boot department service application.*
