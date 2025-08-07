interface SEOData {
  title: string;
  description: string;
}

export const generateSEO = (entityType: string, entityData: any): SEOData => {
  if (!entityData) {
    return {
      title: `Star Wars Explorer | React Portfolio`,
      description: `Interactive Star Wars universe explorer built with React & TypeScript`
    };
  }

  const name = entityData.name || entityData.title || 'Unknown';
  const categoryName = getCategoryName(entityType);

  switch (entityType) {
    case 'people':
      return generatePeopleSEO(name, entityData);
    case 'planets':
      return generatePlanetSEO(name, entityData);
    case 'films':
      return generateFilmSEO(name, entityData);
    case 'starships':
      return generateStarshipSEO(name, entityData);
    case 'vehicles':
      return generateVehicleSEO(name, entityData);
    case 'species':
      return generateSpeciesSEO(name, entityData);
    default:
      return {
        title: `${name} | ${categoryName}`,
        description: `Learn more about ${name} from the Star Wars universe.`
      };
  }
};

const getCategoryName = (entityType: string): string => {
  const categoryMap: { [key: string]: string } = {
    'people': 'Star Wars Characters',
    'planets': 'Star Wars Planets',
    'films': 'Star Wars Films',
    'starships': 'Star Wars Starships',
    'vehicles': 'Star Wars Vehicles',
    'species': 'Star Wars Species'
  };
  return categoryMap[entityType] || 'Star Wars Explorer';
};

const generatePeopleSEO = (name: string, data: any): SEOData => {
  const details = [];
  if (data.gender && data.gender !== 'unknown') details.push(data.gender);
  if (data.height && data.height !== 'unknown') details.push(`${data.height}cm tall`);
  if (data.birth_year && data.birth_year !== 'unknown') details.push(`born ${data.birth_year}`);
  
  const description = `${name}: ${details.join(', ')}. Explore this Star Wars character's complete profile including homeworld, species, and appearances.`;
  
  return {
    title: `${name} | Star Wars Characters`,
    description: description.slice(0, 160)
  };
};

const generatePlanetSEO = (name: string, data: any): SEOData => {
  const details = [];
  if (data.climate && data.climate !== 'unknown') details.push(`${data.climate} climate`);
  if (data.terrain && data.terrain !== 'unknown') details.push(data.terrain);
  if (data.population && data.population !== 'unknown') details.push(`population: ${data.population}`);
  
  const description = `${name}: ${details.join(', ')}. Discover this Star Wars planet's geography, inhabitants, and significance in the galaxy.`;
  
  return {
    title: `${name} | Star Wars Planets`,
    description: description.slice(0, 160)
  };
};

const generateFilmSEO = (title: string, data: any): SEOData => {
  const details = [];
  if (data.director) details.push(`directed by ${data.director}`);
  if (data.release_date) details.push(`released ${data.release_date}`);
  if (data.episode_id) details.push(`Episode ${data.episode_id}`);
  
  const description = `${title}: ${details.join(', ')}. Read the opening crawl, explore characters, and discover details about this Star Wars film.`;
  
  return {
    title: `${title} | Star Wars Films`,
    description: description.slice(0, 160)
  };
};

const generateStarshipSEO = (name: string, data: any): SEOData => {
  const details = [];
  if (data.starship_class && data.starship_class !== 'unknown') details.push(data.starship_class);
  if (data.manufacturer && data.manufacturer !== 'unknown') details.push(`by ${data.manufacturer}`);
  if (data.length && data.length !== 'unknown') details.push(`${data.length}m long`);
  
  const description = `${name}: ${details.join(', ')}. Explore this Star Wars starship's specifications, crew capacity, and galactic significance.`;
  
  return {
    title: `${name} | Star Wars Starships`,
    description: description.slice(0, 160)
  };
};

const generateVehicleSEO = (name: string, data: any): SEOData => {
  const details = [];
  if (data.vehicle_class && data.vehicle_class !== 'unknown') details.push(data.vehicle_class);
  if (data.manufacturer && data.manufacturer !== 'unknown') details.push(`by ${data.manufacturer}`);
  if (data.length && data.length !== 'unknown') details.push(`${data.length}m long`);
  
  const description = `${name}: ${details.join(', ')}. Learn about this Star Wars vehicle's capabilities, design, and role in the galaxy.`;
  
  return {
    title: `${name} | Star Wars Vehicles`,
    description: description.slice(0, 160)
  };
};

const generateSpeciesSEO = (name: string, data: any): SEOData => {
  const details = [];
  if (data.classification && data.classification !== 'unknown') details.push(data.classification);
  if (data.average_height && data.average_height !== 'unknown') details.push(`avg height: ${data.average_height}cm`);
  if (data.language && data.language !== 'unknown') details.push(`speaks ${data.language}`);
  
  const description = `${name}: ${details.join(', ')}. Discover this Star Wars species' characteristics, homeworld, and cultural significance.`;
  
  return {
    title: `${name} | Star Wars Species`,
    description: description.slice(0, 160)
  };
};

export const generateListSEO = (entityType: string): SEOData => {
  const categoryMap: { [key: string]: { title: string, description: string } } = {
    'people': {
      title: 'Characters | Browse All People',
      description: 'Explore all Star Wars characters with detailed profiles, search and filtering. Discover heroes, villains, and iconic figures from the galaxy far, far away.'
    },
    'planets': {
      title: 'Planets | Browse All Worlds',
      description: 'Discover Star Wars planets and their unique characteristics. Explore climates, terrains, populations and the worlds that shaped galactic history.'
    },
    'films': {
      title: 'Films | Complete Movie Collection',
      description: 'Browse all Star Wars movies with details about directors, release dates, and opening crawls. Relive the epic saga that started it all.'
    },
    'starships': {
      title: 'Starships | Galactic Fleet Database',
      description: 'Explore Star Wars starships from fighters to capital ships. Discover specifications, manufacturers, and the vessels that won galactic battles.'
    },
    'vehicles': {
      title: 'Vehicles | Complete Transport Guide',
      description: 'Browse Star Wars vehicles and transports. From speeder bikes to walkers, explore the machinery that moves the galaxy.'
    },
    'species': {
      title: 'Species | Galactic Beings Database',
      description: 'Discover Star Wars species and alien races. Learn about diverse beings, their characteristics, and cultures across the galaxy.'
    }
  };

  return categoryMap[entityType] || {
    title: 'Star Wars Explorer | React Portfolio',
    description: 'Interactive Star Wars universe explorer built with React & TypeScript'
  };
};