


class SWAPIService {
    private readonly baseURL = 'https://www.swapi.tech/api';

    getListUrl(resource: string, page: number = 1, limit: number = 10): string {
        if (resource === 'films') {
            return `${this.baseURL}/${resource}`;  // Films dont support pagination
        }

        return `${this.baseURL}/${resource}?page=${page}&limit=${limit}`;
    };

    // this is for the individual items
    getItemUrl(resource: string, id: string): string {
        return `${this.baseURL}/${resource}/${id}`;
    };

    
}

export const swapiService = new SWAPIService();
export default swapiService;
