# ⏰ Alarm project - Volta medical interview

The project consist in a simple alarm application, displaying current time and allowing user to manage alarms.  
The project is requested to use typescript, react as well as a node backend and must have persisted data.

## 📄 Description

## 🧭 Getting started

.env files are commited for the sake of the interview

1. Clone this repository
2. run `npm install` in root folder

### 💻 Run the project

Run `npm start` in the root folder
you can also press F5 in vscode

The project run in 3 processes:

1. `cd shared ; npm run dev` transpile typescript from shared resources
2. `cd api ; npm start` run the api
3. `cd app ; npm start` run the app

### 🗼 Architecture

The project is divided in 3 main folders:

- api: contains the backend
  - controllers: contains the api routers
  - models: contains the sequelize models
- app: contains the frontend
  - assets: contains the fonts and ringtone
  - components: contains the react components
  - hooks: contains useful hooks
  - services: contains function not related to react
- shared: contains shared resources between the api and the app

### 📦 API

#### GET /alarms

return a list with all alarms

#### POST /alarms

create a new alarm

#### DELETE /alarms/:id

delete an alarm

#### PATCH /alarms/:id

update an alarm - used to activate/deactivate an alarm

## 📚 Librairies

### Backend

- _express_: used to create the api routes
- _sequelize_: ORM to interact with the database
- _sqlite3_: lightweight database

### Frontend

- _react_: library to create the user interface
- _antd_: library with UI components
- _react-query_: helping to manage data fetching
- _dayjs_: utility to manage date and time
- _react-clock_: to render the clock

## 🛑 Improvements and Limitations

- First, its important to note that a client-server architecture is probably not the most suitable architecture for a real alarm application:

  - The alarm will not ring if the client is not running (might investigate about service workers)
  - As many devices could run the application simultaneously, would probably need user management
  - Didn't pay attention to potential timezone issues if the client is not in the same timezone as the server

- Alarms are always daily recurring, there are no one-time or day-based alarms
- User don't have the possibility to set the ringtone

- The project is not tested
