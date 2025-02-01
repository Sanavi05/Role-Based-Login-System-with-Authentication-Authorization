# Role-Based Login System with Authentication & Authorization

This is a Node.js application that implements a role-based login system with secure authentication and authorization for different user roles: **Schools**, **Parents**, and **Students**. It uses **PostgreSQL** as the database and **JWT (JSON Web Tokens)** for secure API access control.

### Features
- **User Registration & Login** with email and password.
- **Role-Based Authentication** where users select their role during login (School, Parent, Student).
- **Secure Access** using JWT tokens for authentication.
- **Role-Based Dashboards**: Redirects users to different dashboards based on their roles.
- **Fetch Student Achievements** for Parents and Students only.

---

## Requirements

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [PostgreSQL](https://www.postgresql.org/download/)
- A code editor like [VS Code](https://code.visualstudio.com/)

---

## Setup Instructions

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/role-based-login-system.git
cd role-based-login-system
```

### 2. Install dependencies
Run the following command to install the necessary dependencies:

```bash
npm install
```
### 3. Set up PostgreSQL
Install PostgreSQL from the official website
Once installed, create a database and user:
```bash
psql -U postgres
```
Then, inside the PostgreSQL shell, run:
```
CREATE DATABASE role_based_login;
```
### 4. Configure Database
Create a  .env file in the root directory of the project and add the following configuration:
```
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=role_based_login
JWT_SECRET=your_jwt_secret_key
```
Make sure to replace yourpassword with your actual PostgreSQL password, and your_jwt_secret_key with a secret string for signing JWT tokens.

### 5. Set up the Database Tables

###  6. Running the Application
Make sure PostgreSQL is running on your machine.
Start the server:
```
npm start
```
By default, the application will run on http://localhost:3000.

