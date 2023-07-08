# microservices

## Installation and Setup Instructions

To run the project, you need to follow these steps for each individual service and ensure that the MongoDB database is running. 
Clone the repository:
```
git clone https://github.com/bogdanfedorov/microservices.git
```


### Service 1: Appointment Service

1. Navigate to the "appointment-service" folder:

```
cd appointment
```

2. Install dependencies:

```
npm install
```

3. Create an `config/.env` file in the "appointment" folder and add the following variables:

```
PORT=4000
DB_NAME=appointment
MONGODB_CONNECTION_URL=mongodb://localhost:27017
DOCTOR_API_URL=http://localhost:4001
MANAGER_API_URL=http://localhost:4003
```

4. Start the service:

```
npm build
npm start
```
or
```
npm start:local
```

### Service 2: Doctors Service

1. Navigate to the "doctors" folder:

```
cd doctors
```

2. Install dependencies:

```
npm install
```

3. Create an `.env` file in the "doctors-service" folder and add the following variables:

```
PORT=4001
```

4. Start the service:

```
npm build
npm start
```
or
```
npm start:local
```
### Service 3: Manager Service

1. Navigate to the "manager" folder:

```
cd manager
```

2. Install dependencies:

```
npm install
```

3. Create an `.env` file in the "manager-service" folder and add the following variables:

```
PORT=4003
APPOINTMENT_API_URL=http://localhost:4000
DOCTOR_API_URL=http://localhost:4001
NOTIFY_API_URL=http://localhost:4002
```

4. Start the service:

```
npm build
npm start
```
or
```
npm start:local
```

### Service 4: Notify Service

1. Navigate to the "notify" folder:

```
cd notify
```

2. Install dependencies:

```
npm install
```

3. Create an `.env` file in the "notify-service" folder and add the following variables:

```
PORT=4002
APPOINTMENT_API_URL=http://localhost:4000
DOCTOR_API_URL=http://localhost:4001
USER_API_URL=http://localhost:4004
```

4. Start the service:

```
npm build
npm start
```
or
```
npm start:local
```

### Service 5: Users Service

1. Navigate to the "users" folder:

```
cd users
```

2. Install dependencies:

```
npm install
```

3. Create an `.env` file in the "users-service" folder and add the following variables:

```
PORT=4004
```

4. Start the service:

```
npm build
npm start
```
or
```
npm start:local
```

## Dependencies

The project utilizes the following dependencies:
- Express.js: Fast and minimalist web application framework for Node.js.
- MongoDB: Document-based database for storing appointment data.
- Mongoose: Elegant MongoDB object modeling for Node.js.
- axios: Promise-based HTTP client for making requests to other services.

For more details and specific dependencies, please refer to the individual service's `package.json` file in the respective directories.

Please note that the provided dependencies are based on the repository you shared: https://github.com/bogdanfedorov/microservices/tree/master.

## For developers 

![microservices diagram drawio png](https://github.com/bogdanfedorov/microservices/blob/master/microservices_diagram.drawio.png)