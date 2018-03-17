# IdeaBox
[![Maintainability](https://api.codeclimate.com/v1/badges/5f42fc5f22797bb37c42/maintainability)](https://codeclimate.com/github/WillyWunderdog/IdeaBox/maintainability)
[![Build Status](https://travis-ci.org/WillyWunderdog/IdeaBox.svg?branch=development)](https://travis-ci.org/WillyWunderdog/IdeaBox)
[![Coverage Status](https://coveralls.io/repos/github/WillyWunderdog/IdeaBox/badge.svg?branch=development)](https://coveralls.io/github/WillyWunderdog/IdeaBox?branch=development)


### Introduction
__Ideabox__ is a simple application that allows users to create a pool of ideas and promote collaboration.

### Table of Contents

  1. [Project stack](#ProjectStack)
  1. [Installation and Setup](#installation-and-setup)
  1. [Application features](#application-features)
  1. [Basic Endpoints](#basic-endpoints)
  1. [API Documentation](#api-documentation)
  1. [Testing](#testing)
  1. [Limitations](#limitations)
  1. [Contributing](#contributing)
  1. [Licence](#license)

### Project Stack
This project is built with:
  * Client-Side: React/Redux
  * Server-Side: NodeJS/Express
  * Database: MongoDB/Mongoose ODM

### Installation and Setup
To setup this project locally you need to have [NodeJs](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed.
  * Clone this repository.
  * Navigate into the project directory.
  * Run ``` npm install``` to install required dependencies.
  * Run ```Mongod``` to start mongoDB server.
  * Use ```.env.sample``` to setup environment variables.
  * Run ``` npm run start:dev``` to get started.

### Application Features
* Users can create accounts on the application.
* Users can login to the application to access the full features.
* Users can create ideas.
* Users can edit and delete ideas they have posted.
* Users can view all public ideas.
* Users can view an ideas details i.e description, title, dates e.t.c.
* Users can post comments on public ideas.
* Users can search for ideas.
* Users can filter ideas based on category.
* Users can rate ideas.

### Basic Endpoints
- **<code>POST:</code>/api/v1/users/signup**
  - Creates user account.
- **<code>POST:</code>/api/v1/users/signin**
  - Creates user login session.
- **<code>POST:</code>/api/v1/idea**
  - Creates idea record.
- **<code>PUT:</code>/api/v1/idea/{ideaId}**
  - Updates an existing idea record.
- **<code>DELETE:</code>/api/v1/idea/{ideaId}**
  - Deletes an existing idea record.
- **<code>GET:</code>/api/v1/ideas**
  - Retrieves list of all public existing ideas.
- **<code>POST:</code>/api/v1/idea/{ideaId}/comment**
  - Adds a post comment for an existing idea
- **<code>PUT:</code>/api/v1/{ideaId}/rate**
  - Rate an idea
- **<code>GET:</code>/api/ideas?caterory=**
  - Filter Ideas by category
  
### API Documentation
* View full documentation [here](https://ideabox-gbenga.herokuapp.com/api/docs)

### TESTING
This app uses the following for testing
* ```mocha/chai``` and ```chai-http``` for server-side testing
* ```Enzyme``` and ```Jest``` for client-side testing
```npm run test``` to run server-side test
```npm run test:client``` to run client-side test
### Limitations
- You can't upload images.
### Contributing
Follow the listed steps to contribute to this project:
* Fork this repository to your github account.
* Clone your copy of the repository.
* Create your feature branch on your local machine with `git checkout -b your-feature-branch`.
* Push your changes to your remote branch with `git push origin your-feature-branch`.
* Raise a pull request against the development branch.
* Visit Repo wiki for style guide and conventions.

### License
This project is authored by Ode Gbenga and it is licensed for your use, modification and distribution under [the MIT license](https://opensource.org/licenses/MIT).

  

