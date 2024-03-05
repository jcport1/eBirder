# Ebirder Web Application

This project was built using React, Mongodb, Express.js, and Node.js

## Project Description

The project presents a companion application for birders and community scientists.

The web application is effectively an interactive map dashboard that details the user’s sightings, notable recent sightings nearby, and common as well as rare species sightings in a given locale.

Our application allows a user to register/log in, record bird sightings on a map, view what other birds have been sighted in the area, and provides live data based on the map of what bird species are the most common and rarest in a given location. Furthermore, the application allows the user to search for bird sighting information in other areas using latitude and longitude query parameters.

To create an account, please use the sign up feature via the registration link in the application navbar. Then log in to access the full application.

To add a sighting, click on the map, fill out the new sighting form popup, and then submit. To edit or delete a sighting, click on a sighting on the form, and the click on either the edit or delete button.

**Strong** _Sample Coordinates:_

- Seattle Longitude: -122.33, Latitude: 47.60
- San Franscisco Longitutde: -122.41, Latitude: 37.77

## APIs

The application uses the [ebird API](https://documenter.getpostman.com/view/664302/S1ENwy59). An authorization token is required to access the API.

## Libraries

The primary library used for this application was the [mapbox gl js library](https://docs.mapbox.com/mapbox-gl-js/guides/). An authorization token is required to access the library.

## Available Scripts

In the project directory at the root level, you can run:

### `npm run devStart`

Open [http://localhost:3001](http://localhost:3001) to start the server.

In the client directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.
