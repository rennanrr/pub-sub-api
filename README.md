## Tech Stack
- Node
- Express
- Typescript
- Nodemon
- WebSocket (Socket.io)
- RabbitMQ

## How works
When receive a HTTP Post on /api/v1/publish, API insert the body in a JSON string and plane the message on "Galley" topic in the queue of RabbitMQ Server.


## Routes:


## Migrations
The tables skeletons are already set in the folder src/api/models and its migrations in src/api/migrations.
To start your datebase, it is necessary to create a database called UserDB.

So, open terminal and run this command:
```
NODE_ENV=dev node_modules/.bin/sequelize db:create
```

### Start Migrations
Then, run the command below to migrate your models to your database
```
NODE_ENV=dev node_modules/.bin/sequelize db:migrate
```

### Insert data into your database
Run the command below to start your database with pre-defined data (there is two users, you can check in src/database/seeders/001-demo-user.js)
```
NODE_ENV=dev node_modules/.bin/sequelize db:seed:all
```
To access with user examples, use these credentials:
```
Email: edney.cruz@oowlish.com
Password: 1234
```
```
Email: rennanrr@hotmail.com
Password: 1234
```

### Mistakes happens :)
If you ran any command wrong, do not freak out. You can revert your migrations with the following command
```
NODE_ENV=dev node_modules/.bin/sequelize db:migrate:undo

``
You can also remove it all
```
NODE_ENV=dev node_modules/.bin/sequelize db:migrate:undo:all

```

This command can be run several times until revert the last table created.
