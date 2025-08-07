import { fetchAndCache } from "../utils/fetchAndCache";
import swapiService from "./swapi.service";
import { ListResponse } from "../types/api";

export default async function dataPreloader(): Promise<void> {
    const categories = ['people', 'planets', 'starships', 'films', 'vehicles', 'species'];
    
    for (let i: number = 0; i < categories.length; i++) {
        let category: string = categories[i];
        
        try {
            await fetchAndCache<ListResponse>(swapiService.getListUrl(category, 1, 10));
        } catch (error) {
            console.error(`Failed to preload ${category}:`, error);
        }
    }
}