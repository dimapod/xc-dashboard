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
 ##### For train add property 'type' with value 'train'
* move train message example : {"train":"01" ,"step": "pos_1_step_2"}

##### For vote add property 'type' with value 'vote'
* vote  message example : [55.8, 87.45]


