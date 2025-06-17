# Star Wars API React App

A comprehensive web application that consumes the SWAPI (Star Wars API) to display information about Star Wars characters, planets, starships, and films. Built with React, TypeScript, and Tailwind CSS featuring a starry space-themed UI.

## ✨ Features

- **Complete SWAPI Coverage**: Browse people, planets, starships, and films
- **Detailed Views**: Click on any item to see comprehensive information
- **Smart Data Display**: 
  - Arrays show as formatted lists with names resolved from URLs
  - Related items display as clickable names instead of raw URLs
  - Efficient batched API calls for array data
- **Responsive Design**: Works on desktop and mobile (mobile performance score: 88, desktop: 100)
- **Limit Selector**: Choose how many items to display (reduces API calls)
- **Space Theme**: Animated starry background with yellow accent colors
- **Type Safety**: Full TypeScript implementation with proper API types

## 🛠 Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **SWAPI** - Star Wars data source

## 🏗 Project Structure

### Reusable API Components
- `ShowAll` - Generic list display with pagination and filtering
- `ShowOne` - Detailed item view with smart field rendering
- `ArrayField` - Efficient batch fetching and display of URL arrays
- `GetName` - Single URL to name resolution
- `LimitSelector` - User-controlled pagination

### Custom Hooks
- `useFetch` - Generic API fetching with error handling and cleanup
- `useFetchArray` - Specialized batched fetching for arrays with rate limiting

### Pages
- **People**: Character listings and individual profiles
- **Planets**: Planet directory with detailed views
- **Starships**: Starship catalog and specifications
- **Films**: Movie information and details

## 🚀 Getting Started

```bash
npm install
npm start
```

## 🎯 Performance Optimizations

- Batched API requests (default 5 concurrent) to prevent server overload
- Specialized hooks for different data patterns
- Efficient memory usage by extracting only needed data
- Abort controllers for cleanup on component unmount 
