# Discord Tracker App

## What is it
This is an application that can be started on a discord bot. It will track the members, the online members and the
 offline members and send them to a firebase database of choice.
 
 ## How to use it
 
 ### 1. firebase authentication
 
 Get the service account key of your firebase realtime database and rename the json file to `serviceAccountKey.json`.
 
 ### 2. create a config file
 
 Create a config file with the name `config.json`. This config file should look like this.
 
 ```json
  {
    "token": "<your bot token>",
    "database": "<your firebase database name>"
  }
```

### 3. start docker container

Start the docker container with `docker-compose up`.

## More reference for the discord api and firebase api

- https://firebase.google.com/docs/
- https://discord.js.org/?source=post_page---------------------------#/
- https://discord.com/developers/docs/intro