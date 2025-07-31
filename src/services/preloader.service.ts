import { fetchAndCache } from "../utils/fetchAndCache";
import swapiService from "./swapi.service";
import { ListItem, ListResponse, ItemResponse, EntityProperties } from "../types/api";

export default async function dataPreloader(): Promise<void> {
    const categories = ['people', 'planets', 'starships', 'films', 'vehicles', 'species'];
    
    for (let i: number = 0; i < categories.length; i++) {
        let category: string = categories[i];
        
        try {
            const data = await fetchAndCache<ListResponse>(swapiService.getListUrl(category, 1, 10));

            const results = data?.results || data?.result || [];
            
            // Cache individual items
            const individualFetches = results
                .filter((object: ListItem) => object.url) // Filter out objects without URLs
                .map((object: ListItem) => 
                    fetchAndCache<ItemResponse<EntityProperties>>(object.url).catch(error => {
                        console.warn(`Failed to cache ${object.name}:`, error);
                        return null;
                    })
                );
            
            await Promise.all(individualFetches);
        } catch (error) {
            console.error(`Failed to preload ${category}:`, error);
        }
    }
}