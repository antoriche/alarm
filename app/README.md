# Jetpack react app boiler plate

This project was bootstrapped from create-react-app and provides the libraries we use the most often for our front end apps: react, redux, axios, antd.

Also provides eslint + flow configurations.

Actions, reducers are setted up.

## Authentication

It uses cognito.
You shoud use a .env
The following environment variables can be passed to a .env:

1. REACT_APP_SKIP_AUTH: put "SKIP" and you will automatically skip cognito auth
2. REACT_APP_COGNITO_IDENTITY_POOL_ID: self explanatory
3. REACT_APP_COGNITO_REGION: self explanatory
4. REACT_APP_COGNITO_USER_POOL_ID: self explanatory
5. REACT_APP_COGNITO_APP_CLIENT_ID: self explanatory
