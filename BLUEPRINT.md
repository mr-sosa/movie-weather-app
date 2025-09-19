# Movie Weather App

## Overview

This is an Angular application that displays a list of trending movies from The Movie Database (TMDb) API. The user can search for movies by title across the entire TMDb database and navigate through the pages of the movie list. The application features a modern, responsive design that adapts to different screen sizes.

## Project Structure

* `src/app/core/models/movie.model.ts`: Contains the `Movie` interface and the `MovieResponse` interface.
* `src/app/core/services/movie.service.ts`: Contains the `MovieService` which is responsible for fetching trending movies and searching for movies from the TMDb API.
* `src/app/features/movie-table/movie-table.component.ts`: The main component of the application. It displays the list of movies in a table, and it has a search filter and a paginator.
* `src/app/app.config.ts`: The application configuration file.
* `src/app/app.routes.ts`: The application routes file.
* `src/app/app.component.ts`: The root component of the application.
* `src/app/app.html`: The root component's template.
* `src/app/app.css`: The root component's styles.

## Features

* Display a list of trending movies in a responsive table.
* Search for movies by title across the entire TMDb database.
* Paginate the movie list for both trending movies and search results.
* Show a loading spinner while the movies are being fetched.
* Show a snackbar with an error message if the movies fail to load.
* Debounce search input to prevent excessive API calls.

## Design

* The application uses Angular Material for the UI components.
* The table has a modern, dark theme with rounded corners and a drop shadow.
* The table is responsive and hides columns on smaller screens to improve usability.
* The poster of each movie is displayed in the table, with a hover effect.
* Rows in the table have a hover effect for better user interaction.

## Current Plan

### Phase 1: Project Setup and Movie Table (Completed)

* Create a new Angular project.
* Generate a `MovieService` to fetch popular movies from the TMDb API.
* Create a `Movie` interface.
* Generate a `MovieTableComponent` to display the movies in a table.
* Add Angular Material to the project.
* Use the following Angular Material components:
    * `MatTable`
    * `MatPaginator`
    * `MatFormField`
    * `MatInput`
    * `MatProgressSpinner`
    * `MatSnackBar`
* Add a filter to the table to filter movies by title.
* Add a paginator to the table.
* Add a loading spinner to the table while the movies are being fetched.
* Add a snackbar to show an error message if the movies fail to load.

### Phase 2: TMDb API Integration (Completed)

* Update the `MovieService` to use the TMDb API key and fetch trending movies.
* Update the `MovieTableComponent` to call the new `getTrendingMovies` method.
* Update the `Movie` model to include a `MovieResponse` interface to match the API response.
* Update the `MovieTableComponent` template to correctly handle the paginator with the total number of results.

### Phase 3: Responsive Design and UI/UX Improvements (Completed)

* Implement a modern design for the movie table, including a floating appearance with shadows and rounded corners.
* Add hover effects to table rows and movie posters for improved interactivity.
* Make the table responsive, so it adapts to different screen sizes.
    * On tablets, the "Release Date" and "Vote Average" columns are hidden.
    * On mobile phones, the "Poster" column is also hidden to save space.

### Phase 4: Database-Wide Search (Completed)

* Update the `MovieService` to include a `searchMovies` method that calls the TMDb API's search endpoint.
* Modify the `MovieTableComponent` to use the `searchMovies` method when the user types in the filter input.
* Implement a debounce mechanism using RxJS to prevent API calls on every keystroke, improving performance.
* Update the component logic to switch between displaying trending movies and search results.
