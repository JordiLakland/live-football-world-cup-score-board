# React + TypeScript + Vite Project

## Live Football World Cup Scoreboard

This project is a React application built with TypeScript using Vite. It simulates
a live football scoreboard for the World Cup, allowing users to manage ongoing matches,
update scores, and view a summary of live games.

## Project Overview

The application provides the following functionalities:

-   **Start New Game**: Users can initiate a new football match by specifying the home and away teams.
-   **Update Score**: Users can update the scores of ongoing matches.
-   **Finish Game**: Users can finish a game, removing it from the list of active matches.
-   **Summary**: Displays a summary of all live matches, ordered by total score and start time as per the specified requirements.

## Project Structure

-   **src/classes/Scoreboard.ts**: Contains the Scoreboard class, which manages the state and logic of the scoreboard.
-   **src/types/game.ts**: TypeScript interfaces and types used across the application.
-   **src/views/scoreboard/ScoreboardView.tsx**: The main view component that integrates all parts of the application.
-   **src/views/scoreboard/components/GameManager.tsx**: Manages game-related actions like starting, updating, and finishing games.
-   **src/views/scoreboard/components/StartGame.tsx**: Component for starting new games.
-   **src/views/scoreboard/components/UpdateGame.tsx**: Component for updating scores of active games and finishing games.
-   **src/views/scoreboard/components/Summary.tsx**: Displays the summary of ongoing games.
-   **src/tests/Scoreboard.test.ts**: Contains unit tests for the Scoreboard class.

## Installation

To install the necessary dependencies, run:

```bash
yarn install
```

## Running the project

To start the development server, use the following command:

```bash
yarn dev
```

## Running Tests

To run the test suite, use the following command:

```bash
yarn test
```

## Assumptions and Design Decisions

-   **No Styles Applied**: Styles were not implemented to focus on core functionality and due to time constraints.
-   **In-Memory Data Storage**: The application uses in-memory data structures (arrays) to store game information, as per the requirements.
-   **Simplified State Management**:
    -   Used `useState` hook with a forced update mechanism (`setUpdate`) in `ScoreboardView` to trigger re-renders.
    -   Decided against using more complex state management solutions (like Context and Reducers) to keep the solution simple.
-   **Component Responsibilities**:
    -   `ScoreboardView` acts as the main controller, handling state and passing props to child components.
    -   `GameManager` component is responsible for starting, updating, and finishing games.
    -   `Summary` component solely displays the summary of games.
-   **Testing with Vitest**:
    -   Chose Vitest for testing due to its seamless integration with Vite and TypeScript support.
