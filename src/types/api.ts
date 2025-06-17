import { Person } from './Person';
import { Film } from './Films';
import { Planet } from './Planet';
import { Starship } from './Starship';
import { Vehicle } from './Vehicle';
import { Species } from './Species';

// Generic API response wrapper
export interface ApiResponse {
  message: string;
  apiVersion: string;
  timestamp: string;
}

// List endpoint response structure
export interface ListResponse<T = EntityProperties> extends ApiResponse {
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results?: ListItem[]; // Most endpoints use 'results'
  result?: ListItem[];  // Films endpoint uses 'result'
}

// Individual item endpoint response structure
export interface ItemResponse<T> extends ApiResponse {
  result: {
    properties: T;
    _id: string;
    description: string;
    uid: string;
    __v: number;
  };
}

// List item structure (used in list endpoints)
export interface ListItem {
  uid: string;
  name: string;
  url: string;
  properties?: EntityProperties; // Films include properties in list response
}

// Union type for all entity types
export type EntityProperties = Person | Film | Planet | Starship | Vehicle | Species;

// Specific typed responses for each entity
export type PersonListResponse = ListResponse<Person>;
export type PersonItemResponse = ItemResponse<Person>;

export type FilmListResponse = ListResponse<Film>;
export type FilmItemResponse = ItemResponse<Film>;

export type PlanetListResponse = ListResponse<Planet>;
export type PlanetItemResponse = ItemResponse<Planet>;

export type StarshipListResponse = ListResponse<Starship>;
export type StarshipItemResponse = ItemResponse<Starship>;

export type VehicleListResponse = ListResponse<Vehicle>;
export type VehicleItemResponse = ItemResponse<Vehicle>;

export type SpeciesListResponse = ListResponse<Species>;
export type SpeciesItemResponse = ItemResponse<Species>;

// Legacy interface for backwards compatibility
export interface ApiObject {
    result: {
        properties: {
            name: string;
        }
    }
    name: string
}