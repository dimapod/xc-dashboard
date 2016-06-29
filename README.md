# XebiCon 2016 - Keynote Dashboard

## Prerequisites
* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (v4.4.x with NPM)
* [RabbitMQ](https://hub.docker.com/_/rabbitmq/) (docker-container)
* After Install RabbitMQ Create queue name : xebicon


## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`

## Running / Development

* `./start-backend.sh`
* `./start-frontend.sh`
* Visit [localhost:8000](http://localhost:8000)

## Launch RabbitMq (docker)
* `docker run -d --hostname my-rabbit -e RABBITMQ_DEFAULT_USER=xebia -e RABBITMQ_DEFAULT_PASS=xebia2015 --name rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

####  Push Message on RabbitMQ

##### Votes 

* KEYNOTE_STATE = VOTE_STATION_START :
```
{
  "type": "KEYNOTE_STATE",
  "payload": {
     "value": "VOTE_STATION_START"
  }
}
```

* KEYNOTE_STATE = VOTE_STATION_END :
```
{
  "type": "KEYNOTE_STATE",
  "payload": {
     "value": "VOTE_STATION_END"
  }
}
```

* Vote Station :
```
{
  "type": "VOTE_STATION",
  "payload": {
    "trainId": 1,
    "media": "MOBILE",
    "count": 1
  }
}
```

##### Obstacle detection (cow) :

* Obstacle - COW :
```
{
  "type": "OBSTACLE_DETECTION",
  "payload": {
    "obstacle": true,
    "obstacleType":"COW"
  }
}
```

* Obstacle - cleared :
```
{
  "type": "OBSTACLE_CLEARED"
}
```
