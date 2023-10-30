# Agile Tasker App


Welcome to the Agile Tasker App! This application helps you manage your tasks and stay organized in an agile manner.

![Board Page MacBook](https://github.com/YinhuC/agile-tasker/blob/master/client/src/assets/images/mac-board.png)

![Project Page MacBook](https://github.com/YinhuC/agile-tasker/blob/master/client/src/assets/images/mac-project.png)

# Prerequisites

---

Before getting started, make sure you have the following software installed on your machine:

- Node.js (v14 or later)
- Yarn package manager

      npm install --global yarn
  
- PostgreSQL - https://www.postgresql.org/download/
- TypeORM globally

      npm install -g typeorm
      or
      yarn global add typeorm

# Getting Started

---

To run the Agile Task App locally, follow these steps:

**1.**  Clone the repository:

    git clone https://github.com/your-username/agile-tasker.git

**2.**  Start PostgreSQL and create a new database

**3.**  Navigate to the project directory:

    cd agile-tasker

**4.**  Rename `.env.example` to `.env` and update values or create your own in the root directory, variables provided below

        REACT_APP_DB_NAME =
        REACT_APP_DB_USERNAME = 
        REACT_APP_DB_PASSWORD = 
        REACT_APP_DB_HOST = 
        REACT_APP_DB_PORT = 
        REACT_APP_SECRET = 
        
        REACT_APP_API_PORT = 
        REACT_APP_API_URL =
    
   - `REACT_APP_DB_NAME`: This should be set to the name of the database you created in PostgreSQL.
   - `REACT_APP_DB_USERNAME`: This should be set to the username of your PostgreSQL server. By default, the username is usually set to "postgres".
   - `REACT_APP_DB_PASSWORD`: This should be set to the password you set when you first started PostgreSQL.
   - `REACT_APP_DB_HOST`: This should be set to the hostname for your PostgreSQL database server.
   - `REACT_APP_DB_PORT`: This should be set to the port number on which your PostgreSQL database server is running. By default, PostgreSQL uses port 5432.
   - `REACT_APP_SECRET`: This should be set to a secret key used for authentication and session management. Just any random string will do.
   - `REACT_APP_API_PORT`: This should be set to the port number on which your Node.js server will run. It can be any available port number of your choice.
   - `REACT_APP_API_URL`: This should be set to the URL of your Node.js server. In a local development environment, it can be set to `http://localhost:<port>`, where `<port>` is the value you set for `REACT_APP_API_PORT`.


**5.**  Install dependencies for both the client and server:

    yarn install

**6.**  Start the server:

    yarn start:server

**7.**  Run migration script to add data into database

    yarn migration:run

**8.**  Sign in with johndoe@example.com to see data and play around

    email: johndoe@example.com
    password: Password123

**9.**  Start the client:

    yarn start

**10.**  Open your browser and visit [http://localhost:3000](http://localhost:3000/) to see the app in action.

**11.**  Run the server tests:

    yarn test:server

**12.**  Run the client tests:

    yarn test



# Folder Structure

---

The project has the following folder structure:

- `/client`: Contains the frontend React application.
- `/server`: Contains the backend server using Node.js and NestJS.

Feel free to explore each folder to understand their specific implementations.
