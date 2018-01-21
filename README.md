![Logo](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/icon/Wide@0.5x-100.jpg)

# Weather Today
A simple web app, showing the weather in various locations. The server runs on Node.js, using Koa to manage HTTP requests. The database management system is PostgreSQL.

[![license](https://img.shields.io/github/license/ramon54321/WeatherToday.svg?style=for-the-badge)](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/LICENSE)
[![GitHub release](https://img.shields.io/github/release/ramon54321/WeatherToday.svg?style=for-the-badge)](https://github.com/ramon54321/WeatherToday/releases)
[![GitHub issues](https://img.shields.io/github/issues/ramon54321/WeatherToday.svg?style=for-the-badge)](https://github.com/ramon54321/WeatherToday/issues)

### [Live Application](https://weathertodayreaktor.herokuapp.com/)

## Getting Started
Most documetation of the project can be found in this readme, including an outline of the API. The intent of the project is to be viewed online at the live address specified above.

#### [Latest Release](https://github.com/ramon54321/WeatherToday/releases/tag/v1.0)

## Overview
This project aims to create a simple weather web app, where users can add temperature observations to 5 pre-defined locations. The application will show the latest observation, and also the minimum and maximum in the last 24 hours. There is no requirement for users to log in.
In an attempt to keep the data somewhat accurate, the data will be validated before being accepted. The exact steps of the validation can be seen further down in this readme.

## Contributing
Unfortunately this is a closed project, but feel free to browse the source!

## Further Documentation
#### [Kanban Board](https://github.com/ramon54321/WeatherToday/projects/1)
#### [SQL Scripts](https://github.com/ramon54321/WeatherToday/blob/master/Documentation/SQLScripts.md)

### Application Outline
The application source is split into client and server folders. The actual deployed application is only the server folder contents. The client folder purly serves as source code to build the static files in the static folder of the server, which the server then serves.

#### Client
The client uses webpack with a babel loader to transpile the the ES6 code in the src folder, and output a single bundle.js file in the static folder of the server. This bundle.js is linked in index.html, which means bundle.js is the main client code.

Since the code is transpiled, we are able to use modern ES6 functionality, including importing modules, which allows us to create interfaces to more complex code.

There is a controller.js file which works as a module, and serves as an interface to an index manager. This means from the main code we can simply call `controller.nextIndex()` and not worry about all the callbacks and UI updates that need to take place, or rolling over the last index, because this is all abstracted within the controller module.

Vue is used as a client side templating engine, and the data object of the view instance is updated to update the client DOM live. The code could have been abstracted more, with regards to data management for Vue, however this was a very simple situation, and more abstraction may just cause more confusion and we might end up with a situation where there are many files with few lines of code.

We assign a callback function to the controller module so we can 'override' the functionality when the index changes.

The view.js module is used as an interface for fading, since there seems to be some variation between browsers, and this allows the implementation to be changed as needed without changing the code base.

Data.js is used as an interface to control the vue data. This was not needed at first, but when the development of the list started, the data management became more of an issue. In retrospect, an in memory data store might be useful here, such as Redux, or a redesigned data interface would also be sufficient.

#### Server
The server also uses modules to organize the code. There is the main.js module which is run first, and imports database.js, which is the interface to the database, which allows us to abstract the queries and boilerplate needed to access the database, leaving us with a clean interface, which can be called like `database.getData()`.

Koa is used for the handling HTTP requests.

### API Outline
- [GET] /api/temperature -> Returns the json object exactly as vue needs it in order to render, grouped by location.
- [GET] /api/temperature/:location -> Returns the records for the specified location, limited to 10.
- [POST] /api/temperature -> Adds a new temperature to database using the following template.
	- `{ location: <location>, temperature: <temperature> }`

### Dependencies
- koa
- koa-body
- koa-router
- koa-send
- pg
- dotenv (A dev dependency, however it is kept in code on production so is included in normal dependencies)

### Known Bugs
- ~~0 return from database for min or max which is older than 24 hours~~
- ~~Edge fade issue~~ (Fixed in [this commit](https://github.com/ramon54321/WeatherToday/commit/7aaacb5d620bbe0ffecf8e15ccaa94f1a63fac61) -> Hopefully all fading is now fixed)
- ~~Flash on load in Safari~~ (Fixed by using jQuery FadeTo instead of FadeOut and FadeIn)
- ~~Flash on load in Edge~~
- ~~Background late load in Safari~~ (Mostly Fixed)
- ~~Spinner on number input in Firefox~~
- Fade out issue in Safari (Sometimes? Hard to recreate)

## Diagrams
#### Component Diagram
![Component Diagram](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/ComponentDiagram.svg?sanitize=true)

## Dev Log
### 20 Jan 2018
Cleaned up overall project and proceeded to conceptulize a further feature. Since v1.0 is deployed, it is a reasonable time to fix small bugs.

I noticed the fadeing animation was problematic on Edge, and after hours of digging, I discovered it was due to an absolute positioned element inside the view being faded. I changed the css a little, and restructured the html, and all was resolved.

Currently, the idea is to add an additional view, which will be a list of the most recent observations for the given location. I am now moving slightly into the terrritory where a framework would become helpful, however, since the application will not grow much more after this point, I still think using a framework such as React or Angular, is a little overkill.

Sticking to pure jQuery and usign Vue for reactiveness, results is a lean and quick package, and in my opinion, is preferrable to a framework for small applications which do not really reap the benifits of a heavy framework.

### 19 Jan 2018
Did many finishing touches to the server and client, added many error handling code and deployed the application. The deployment caused an issue due to npm --prefix not working as documented. A workaround was to use the open-source buildpack from timanovsky, which can be found [here](https://github.com/timanovsky/subdir-heroku-buildpack).

The buildpack simply extracts a subdirectory from the repo to use as the project base on heroku.

Also added a loading animation when the user fetches the temperature data from the server. The fetch is usually very quick, so an intentional 1 second delay was added to the server when it serves the data, to simulate heavier processing, and resulting in a smoother loading on the client. This can be removed if deemed unnessesary.

### 18 Jan 2018
The server side is mostly completed. The decision was taken to use Koa, since it is more light weight than Express.

Some time was taken to carefully construct an SQL query to retrieve an array of objects exactly as they will be used by vue.

``` SQL

SELECT t2.location, COALESCE(t1.min, 0) as min, COALESCE(t1.max, 0) as max, t2.latest FROM
(
	WITH results24 AS
	(
		SELECT location as location, min(temperature) as min, max(temperature) as max
		FROM temperature
		WHERE time > now() - interval '24 hours'
		GROUP BY location
	)

	SELECT location, min, max FROM results24

	UNION

	SELECT location, latest as min, latest as max FROM
	(SELECT DISTINCT ON (location) location as location, temperature as latest
	FROM temperature
	ORDER BY location, time DESC) latestTemp

	WHERE NOT EXISTS (SELECT * FROM results24)
) t1

RIGHT OUTER JOIN

(SELECT DISTINCT ON (location) location as location, temperature as latest
FROM temperature
ORDER BY location, time DESC) t2

ON t2.location = t1.location
```
The first selection gets the location, min and max temperatures for the past 24 hours, failing which will get the last temperature, if there is no temperature in the last 24 hours. If that also fails, meaning there is no temperature data at all for the location, a 0 is returned.

The next selection gets the latest temperature, followed by a right outer join on the location to join the selections. Right outer is used to ensure the latest is returned even if the initial selection does not return anything.

### 17 Jan 2018
The focus of today was to finish the user interface, add all the transitions and code the client scripts to control vue. I decided to make a controller module, which manager the index of the location, deals with the interface peculiarities, such as the bubbles indicating the slide number. The controller needs to have a callback function passed to it initially, which gets called when the index changes, allowing the main.js file to update the vue data.

![Localdata](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/localdata.gif)

### 16 Jan 2018 - Afternoon
I proceeded to blockout the previous layout, and just entering some placeholder text to make sense of it. I also added some transitions in sass, which work really well, moving the main block up and out to make space for the orange and light blue block, that can be seen below.
![Layout](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/blockout.jpg)

### 16 Jan 2018 - Morning
Today I set up the base project files, including the build environment. I opted for the simplest build I could think of, using the bare minimum in webpack. I decided it is still worth it using webpack, because it will allow using imports client side, organizing the code more.

Since it will be a simple application, I kept the server and client in the same project, separating them with directories. This does cause some issues with shared files, such as the static files (css and html), which are needed by the client during the build and the server during deployment.

I also created a quick layout idea.
![Layout](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/concept_divlayout.jpg)

### 14 Jan 2018
Came up with an initial design idea, after listing down requirements. The implementation of the design is yet to be determined at this point.
![Normal](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/concept_normal.jpg)

When the user mouses over the main temperature, the temperature animates away and gives way to a number input field, with an add button next to it. Once the user has added a new temperature observation and presses the add button, an ajax request will be sent to validate and add the data to the database.
![Add](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/concept_add.jpg)

I am not entirely satisfied with the fact that arrows are used to cycle between the 5 locations, however it seems like a better option than tabs or a dropdown, which is very mobile unfriendly. In the case of mobile, the arrows can easily be replaced with a swipe gesture.
