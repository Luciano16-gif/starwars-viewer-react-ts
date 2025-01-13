# starwars-viewer-react-ts
Star Wars Viewer (React + TypeScript)
A web application that consumes the SWAPI (Star Wars API) to display information about Star Wars characters. Built with React, TypeScript, and Tailwind CSS to practice modern frontend development and API consumption.

🚧 Work in Progress
This project is actively being developed. Current features include:

Character listing with detailed information
Responsive grid layout
Type-safe API consumption
Reusable components for API data display

🛠 Technologies Used

React
TypeScript
Tailwind CSS
React Router
SWAPI (Star Wars API)

🏗 Project Structure
The project includes reusable components for API consumption:

ShowAll: A generic component for displaying lists of items from an API
ShowOne: A component for displaying detailed information about a single item (though this one is not yet ready)

Issue: The page briefly displays without data (for ~0.5s) before loading data for showAll. I have a potential solution in mind but haven't had time to implement it.