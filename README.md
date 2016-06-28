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

##### Vote 'VOTE_TRAIN_CHOICE' :
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

##### detection d'une vache  'OBSTACLE_DETECTION' :
```
{
  "type": "OBSTACLE_DETECTION",
  "payload": {
    "obstacle": true,
    "obstacleType":"COW"
  }
}
```

##### retrait d'obstacle 'OBSTACLE_CLEARED' :
```
{
  "type": "OBSTACLE_CLEARED"
}
```
