Driving School Mobile App

Cross-platform mobile app for managing a driving school. Students can book lessons, buy packages, chat with instructors, and take practice tests. Instructors manage their schedule and record exam results. Admins handle users and products.


Tech Stack

React Native 0.81, Expo SDK 54, React Navigation 6, Axios, Socket.io, Expo SecureStore, Expo Notifications.


Setup

npm install

Update the API URL in app.config.js:

extra: {
  BASE_URL: "http://YOUR_SERVER_IP:5000",
},

Run:

npm start

Scan the QR code with Expo Go.


Features

Students can browse and purchase lesson packages, book lessons with available instructors, view their schedule and history, chat with instructors in real-time, and practice for theory exams with quizzes.

Instructors see their assigned lessons, manage their schedule, communicate with students, and record exam pass/fail results.

Admins can activate or deactivate user accounts and manage the product catalog.


Screens

Login, Home (student dashboard), Admin Home, Profile, Edit Profile, Store, Checkout, Booking, Book Lesson, Schedule, Lesson History, Instructor History, Chats, Chat Thread, Test Categories, Test Quiz, Test Results, User Management, Product Management.


Project Layout

The services/ folder contains API modules split by domain: authApi, userApi, productApi, lessonApi, chatApi, instructorApi, testApi. All use a shared apiClient with token interceptors.

State management uses React Context. AuthContext handles login/logout, token refresh, and user data. CartContext handles the shopping cart.

Styles are in the styles/ folder, using shared design tokens from constants/theme.js for colors, spacing, and typography.

Custom hooks in hooks/ include useApiCall for generic API requests and useBalance for fetching user balance.


User Roles

student - Home screen with booking, store, tests, chat
instructor - Schedule screen with lesson management
admin - Dashboard with user and product management


Building

npx eas build --platform all


Screenshots

Add screenshots here. Suggested: login screen, home dashboard, booking flow, store, chat, test quiz, admin panel.


License

0BSD
