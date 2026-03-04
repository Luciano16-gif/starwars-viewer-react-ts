import { fetchAndCache } from "../utils/fetchAndCache";
import swapiService from "./swapi.service";
import { ListResponse } from "../types/api";

export default async function dataPreloader(): Promise<void> {
    const categories = ['people', 'planets', 'starships', 'films', 'vehicles', 'species'];
    const preloadLimit = 9;

    const preloads = categories.map(async (category) => {
        try {
            await fetchAndCache<ListResponse>(swapiService.getListUrl(category, 1, preloadLimit));
        } catch (error) {
            console.error(`Failed to preload ${category}:`, error);
        }
    });

    await Promise.allSettled(preloads);
}
