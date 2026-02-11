# Driving School Mobile App

Cross-platform mobile app for managing a driving school. Students can book lessons, buy packages, chat with instructors, and take practice tests. Instructors manage their schedule and record exam results. Admins handle users and products.

See also: [Backend (API)](https://github.com/ArsenPorsche/Driving-School-Mobile-App-Backend/tree/master)

## Tech Stack

- React Native 0.81
- Expo SDK 54
- React Navigation 6
- Axios
- Socket.io
- Expo SecureStore
- Expo Notifications

## Setup

npm install

Update the API URL in app.config.js:

extra: {
  BASE_URL: "http://YOUR_SERVER_IP:5000",
}

Run:

npm start

Scan the QR code with Expo Go.

## Features

Students can browse and purchase lesson packages, book lessons with available instructors, view their schedule and history, chat with instructors in real-time, and practice for theory exams with quizzes.

Instructors see their assigned lessons, manage their schedule, communicate with students, and record exam pass/fail results.

Admins can activate or deactivate user accounts and manage the product catalog.

## Screens

- Login
- Home (student dashboard)
- Admin Home
- Profile
- Edit Profile
- Store
- Checkout
- Booking
- Book Lesson
- Schedule
- Lesson History
- Instructor History
- Chats
- Chat Thread
- Test Categories
- Test Quiz
- Test Results
- User Management
- Product Management

## Project Layout

The services/ folder contains API modules split by domain:

- authApi
- userApi
- productApi
- lessonApi
- chatApi
- instructorApi
- testApi

All use a shared apiClient with token interceptors.

State management uses React Context. AuthContext handles login/logout, token refresh, and user data. CartContext handles the shopping cart.

Styles are in the styles/ folder, using shared design tokens from constants/theme.js for colors, spacing, and typography.

Custom hooks in hooks/:

- useApiCall - generic API requests
- useBalance - fetching user balance

## User Roles

- student - Home screen with booking, store, tests, chat
- instructor - Schedule screen with lesson management
- admin - Dashboard with user and product management

## Building

npx eas build --platform all

## Screenshots

Login screen

<p align="center">
  <img src="https://github.com/user-attachments/assets/34fdf3d4-2470-4739-89b5-61e269487aba" width="250" />
</p>

Home dashboard

<p align="center">
  <img src="https://github.com/user-attachments/assets/3be9a0d1-6e08-4e25-915c-33d311a41e4c" width="250" />
</p>

Booking flow

<p align="center">
  <img src="https://github.com/user-attachments/assets/fa7b91cb-e2c8-48e7-b152-dce396faccb9" width="250" />
</p>

Store

<p align="center">
  <img src="https://github.com/user-attachments/assets/fa792002-29e8-4c0d-b42f-dc7ac71d2bc3" width="250" />
</p>

Chat

<p align="center">
  <img src="https://github.com/user-attachments/assets/06f5e97f-cded-4440-b345-3a65a1d362f2" width="250" />
</p>

Test quiz

<p align="center">
  <img src="https://github.com/user-attachments/assets/84cccdde-83ef-4273-8028-afaeb41d6726" width="250" />
</p>

Admin panel

<p align="center">
  <img src="https://github.com/user-attachments/assets/fac5c26d-f46d-4506-b877-f0f56f7def7a" width="250" />
</p>


