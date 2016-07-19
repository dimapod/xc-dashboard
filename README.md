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

## Messages

[Data exchange format](https://docs.google.com/spreadsheets/d/1Hf_5DhEML1nFLlESej3CQbdTKPcM2gnWIO5KJfj3ogo/edit#gid=0)

## Events

[Events Exchange Schema](https://drive.google.com/open?id=0B7TxBU0Irvk9bUx0QWVET1hVeUk)