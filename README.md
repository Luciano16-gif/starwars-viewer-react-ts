# Star Wars Explorer | Enterprise-Grade React Application

A production-ready web application showcasing advanced React development patterns and modern web standards. Features dynamic SEO generation, intelligent caching, and professional-grade architecture. Built with React, TypeScript, and enterprise-level optimization techniques.

**[Live Demo](starwars-lightspeed-explorer.netlify.app)** | **Dynamic SEO** | **Performance Optimized**

## Enterprise Features

### **Dynamic SEO System**
- **Unique meta tags** for 100+ individual pages (Luke Skywalker, Tatooine, etc.)
- **Social media optimization** (Open Graph, Twitter Cards)
- **Search engine ready** with descriptive titles and descriptions
- **Category-specific SEO** for all list pages

### **Advanced Performance**
- **Intelligent caching system** (memory + localStorage with size management)
- **Lazy loading** for all route components
- **Batched API requests** with rate limiting
- **Efficient memory usage** with cleanup on unmount
- **Production-optimized** build with code splitting

### **Professional Error Handling**
- **Error boundaries** catch and display graceful fallbacks
- **404 handling** with custom Star Wars themed page
- **Network failure recovery** with user-friendly messages
- **Loading states** with skeleton screens matching final structure

### **Complete SWAPI Integration**
- **Seven content types**: People, planets, starships, films, vehicles, species
- **Smart data relationships** - URLs auto-resolve to clickable names
- **Search & pagination** across all categories
- **Detailed individual pages** with comprehensive information

### **Production Standards**
- **TypeScript** throughout for type safety
- **Environment configuration** (.env support)
- **Responsive design** optimized for mobile and desktop
- **Clean architecture** with reusable components and custom hooks

## Technologies Used

- **React** - UI framework with hooks and modern patterns
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing
- **react-helmet-async** - Dynamic meta tag management
- **SWAPI** - Star Wars API data source

## Project Structure

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
- **Vehicles**: Vehicle directory with specifications
- **Species**: Species catalog with characteristics
- **404 NotFound**: Custom error page with navigation options

### Error Handling
- **ErrorBoundary**: Catches JavaScript errors and displays user-friendly fallback UI
- **Graceful Degradation**: Handles API failures and network issues smoothly

## Getting Started

```bash
npm install
npm start
```

## Performance Optimizations

- Batched API requests (default 5 concurrent) to prevent server overload
- Specialized hooks for different data patterns
- Efficient memory usage by extracting only needed data
- Abort controllers for cleanup on component unmount 
