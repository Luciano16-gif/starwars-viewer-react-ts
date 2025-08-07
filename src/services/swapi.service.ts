class SWAPIService {
    private readonly baseURL = process.env.REACT_APP_API_BASE_URL || 'https://www.swapi.tech/api';

    getListUrl(resource: string, page: number = 1, limit: number = 10, search?: string): string {
        
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            expanded: 'true'  // Always get full properties 
        });
        
        if (resource === 'films') {
            // Only add search if it's provided and not empty
            if (search && search.trim()) {
                params.set('title', search.trim());
            }   
            return `${this.baseURL}/${resource}?${params}`;  // Films dont support pagination
        }

        // Only add search if it's provided and not empty
        if (search && search.trim()) {
            params.set('name', search.trim());
        }

        return `${this.baseURL}/${resource}?${params}`;
    };

    // this is for the individual items
    getItemUrl(resource: string, id: string): string {
        return `${this.baseURL}/${resource}/${id}`;
    };

    
}

export const swapiService = new SWAPIService();
export default swapiService;