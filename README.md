# Weather Today
A simple web app, showing the weather in various locations. Documentation is included in the repository, starting from the readme.

## Getting Started
Most documetation of the project can be found in this readme, including an outline of the API.

## Overview
This project aims to create a simple weather web app, where users can add temperature observations to 5 pre-defined locations. The application will show the latest observation, and also the minimum and maximum in the last 24 hours. There is no requirement for users to log in.
In an attempt to keep the data somewhat accurate, the data will be validated before being accepted. The exact steps of the validation can be seen further down in this readme.

## Contributing
Unfortunately this is a closed project, but feel free to browse the source!

## Further Documentation
#### [Kanban Board](https://github.com/ramon54321/WeatherToday/projects/1)

## Diagrams
#### Component Diagram
![Component Diagram](https://raw.githubusercontent.com/ramon54321/WeatherToday/master/Documentation/ComponentDiagram.svg?sanitize=true)

## Dev Log
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