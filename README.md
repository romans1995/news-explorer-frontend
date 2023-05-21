# News Expolorer Frontend

## Overview

This is a frontend part of the News Explorer project. It is a single page application that allows users to search for news articles by keyword and save their favorite articles to their personal account. User can also delete saved articles from their account.
The frontend of this application is built using React and TypeScript. State management is implemented using Redux Toolkit as well as Context API.

## Technologies

- HTML
- CSS
- JavaScript
- React
- Context API
- Hooks
- React Router
- Webpack
- Babel

## Screenshot Demo

Nav Bar when not logged in:


Nav Bar when user is logged in:



Popup Forms for Signin in and Signing up:



Form Validation on auth forms:



Search Results:



News card can be saved:



Saved Articles area for logged in users:



## Features

- Search for news articles by keyword
- Register and login to personal account
- Save articles to personal account
- Delete articles from personal account
- View articles in a separate window
- Programatically navigate between pages
- Dynamically render content
- Frontend consumes data from the News Explorer API (RESTful API)
- Responsive design
- Form validation
- Error handling

## Live Demo

Deployed fullstack app (GCP):[https://newsexplorer-r.chickenkiller.com/](https://newsexplorer-r.chickenkiller.com/)


## Setup

To run this project locally:

1. clone backend repo
2. clone frontend repo
3. install dependencies in both repos
4. run backend server with command `npm run dev`
5. run frontend server with command `npm run start`
6. change the `baseUrl` in the frontend repo `src/utils/MainApi.js` to `http://localhost:3000`