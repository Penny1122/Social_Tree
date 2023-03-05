# SocialTree

<p align="center">
<img src="src/images/logo.JPG"/>
</p>
SocialTree is a social networking website that aims to create a vibrant online community for people to connect, share and engage with each other. The name "SocialTree" reflects the idea that the website is a virtual tree, with each user being a branch that is part of a larger network of interconnected branches.

<p align="center">
<img src="src/images/intro.png"/>
</p>

<p align="center">
<img src="src/images/function.png"/>
</p>

:link: Website URL: https://social-tree-1d064.web.app/

## Table of Content

- [Development Structure](#-development-structure)
- [Front-end Technique](#-front-end-technique)
  - [React](#react)
    - [Component Structure](#component-structure)
  - [React Router](#react-router)
  - [Webpack & Babel](#webpack--babel)
- [Back-end Technique (Firebase Cloud Services)](#-back-end-technique-firebase-cloud-services)
  - [Firebase Authentication](#firebase-authentication)
  - [Cloud Firestore](#cloud-firestore)
  - [Firebase Storage](#firebase-storage)
  - [Firebase Hosting](#firebase-hosting)
- [Main Features](#-main-features)
- [Contact](#contact)

## ✿ Development Structure

The SocialTree website's user interface is built using **React** and incorporates **React Router** to enable the creation of a Single Page Application (SPA). The website's backend functionality is provided by **Firebase**, which is utilized for website, database, and member system creation. To aid in development, the project uses a variety of tools including **Webpack** for bundling modules, **Babel** to ensure that the JavaScript is compatible across various environments, **NPM** for managing packages, **ESLint** for checking syntax and enforcing coding standards, and Git for version control via **Github**.

<p align="center">
<img src="src/images/Tech2.png"/>
</p>

## ✿ Front-end Technique

### React

#### Component Structure

<p align="center">
<img src="src/images/structure.png"/>
</p>

### React Router

- version: 6
- Handle the routing for the Single Page Application (SPA)

### Webpack & Babel

- Handle module bundling of the project.
- ES6 JavaScript syntax for browser compatibility.

### Hook API

- `useContext`,`useReducer`,`useRef`,`useState`,`useEffect`

### Custom Hook

- Creating a custom hook for the purpose of separating formulas.
  - `useAddComment`,`useAuthStatus`,`useChat`,`usePost`,`useGetPost`,`useLikePost`,`useGetNotice`,`useFriend`,`useRegister`,`useLogin`,`useLogout`,`useTime`

### Responsive Web Design

<p align="center">
<img src="src/images/device.jpg"/>
</p>

## ✿ Back-end Technique (Firebase Cloud Services)

### Firebase Authentication

- Register / Login with email and password.

### Firestore

- Store and update user, posts and chatting data

### Firebase Storage

- Manage images uploaded from users.

### Firebase Hosting

- Host the static content of the project.

## ✿ Main Features

### Infinite scroll

<p align="center">
<img src="src/images/scroll.gif"/>
</p>

### Login system

<p align="center">
<img src="src/images/loginDemo.gif"/>
</p>

### Create a new post

<p align="center">
<img src="src/images/AddPostDemo.gif"/>
</p>

### Leave a comment

<p align="center">
<img src="src/images/LikeAndComment.gif"/>
</p>

### Chatroom

<p align="center">
<img src="src/images/ChatSearch.gif"/>
</p>
<p align="center">
<img src="src/images/chatDemo.gif"/>
</p>

## Contact

- :blush:Developer: Szu-Ping, Chen
- :mailbox:Email: rainbow801122@gmail.com
