## Tech Stack
- Node
- Express
- Typescript
- Nodemon
- WebSocket (Socket.io)
- RabbitMQ

## Basic Architecture
There is two Applications (Microservices) on this project:
- Publisher:
Start a Rest API server (Express), receive a HTTP Post on /api/v1/publish, the API insert the body into a JSON string and place the message on "Galley" queue of RabbitMQ Server.
- Worker:
Start a WebSocket server (Socket.IO), subscribe on "Galley" queue in RabbitMQ Server, on message from RabbitMQ concatenate the body (two strings), and send result by websocket to client.

## Routes:
POST - /api/v1/publish

## Get Started
First, make sure you have [NodeJS](https://nodejs.org/en/download/).

### RabbitMQ
To use on your on machine, you can install and run a Docker Image with a RabbitMQ server.
```
docker run --rm -it --hostname my-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

### Install packages
```
npm install
```

### Run Publisher Server
```
npm run dev:publisher
```

### Run worker Server
```
npm run dev:worker
```

## Environment configuration
The config environment variables are on file ./src/api/config/config.ts
The default value is 
```
  apiPort: 3000,
  rabbitMQ: 'amqp://localhost:5672',
  wsPort: 4555
```

## About Design Pattern
There is two microservices on backend:
- ./src/appPublisher.ts
- ./src/appSubscriber.ts

On primary files ("app"), server listens are started.
The input source on Publisher Server is the Express Server (Routes).
The input source on Subscriber Server is the Subscriber RabbitMQ (Subscriber).
The wild input data is sent to especific Controller, where are the rules of business.
After treat data received, Controller call a especific Service to dispatch.