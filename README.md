# Tikeets

![Tikeets](https://github.com/thebolarin/Tikeets/workflows/test/badge.svg)


   [Overview :notebook_with_decorative_cover:](#overview-notebook_with_decorative_cover)
-   [Installation and running server (Development) :gear:](#installation-and-running-server-gear)
-   [Links :link:](#links-link)

## Overview :notebook_with_decorative_cover: 
This is an event booking and reservation platform that deals with the sales of tickets for an event website developed by Bolarinwa

## Installation and running server :gear:
* Clone the repo to your local machine using your _terminal_ or _command prompt_, and afterwards, navigate into the root folder  
```shell script
$ cd Tikeets
```

* Install necessary dependencies for the project to run successfully
```shell script
$ npm install
```

* After installing, you can now start the server
```shell script
$ npm start
Listening on port 3000
```

point your browser to ```localhost:3000```

## API :cloud_with_lightning: 
Various API's were tested for the development of this project
* Login API
* Registration API  
* Current user 
* Logout
* Admin route to create a new event API  
* Get all upcoming event API 
* Buy/reserve a ticket for an event API 
* Cancel ticket reservation API 
* Admin route to update an event API 
* Admin route to delete an event API
* Get all user’s reserved tickets for events API 
* Admin route to get all user’s reserved tickets API 

To see the test written for these api, run this command in your command line
```shell script
npm test
```
The test is targeted at the _./test/setup/**_ folder

The library 

```shell script
 @bolarin/common
```
was developed and deployed by Odutusin Moses Bolarinwa and was written with Typescript

##### Test written  :bulb:

* Auth  
* Event
* Ticket

## Links :link:

* Visit us at <a href="https://tikeet.herokuapp.com/" target="_blank">Tikeets</a>


### Contributors :book:
* **thebolarin** :nerd_face: