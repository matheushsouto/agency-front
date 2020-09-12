const nameFilter = 'filters';

export class FilterService {

    static save(key: string, value: object) {
        const allFilters = this.getAll();
        allFilters[key] = value;
        this.saveAll(allFilters);
    }

    static get(key: string): object {
        const allFilters = this.getAll();

        let filter = allFilters[key];
        if (filter == null) {
            filter = {};
        }
        return filter;
    }

    static mount(key: string) {
        const filters = this.get(key);
        let filterApi = '';
        Object.keys(filters).forEach(filter => {
                if (filterApi !== '') {
                    filterApi += '&';
                }
                filterApi += 'filters[]=' + filter + ' ' + filters[filter];
            }
        );
        return filterApi;
    }

    static delete(key: string) {
        const array = this.getAll();
        delete array[key];
        this.saveAll(array);
    }

    static removeItem() {
        localStorage.removeItem(nameFilter);
    }

    protected static getAll(): object {
        let filters = localStorage.getItem(nameFilter);
        if (filters == null) {
            filters = '{}';
        }
        return JSON.parse(filters);
    }

    protected static saveAll(filters: object) {
        localStorage.setItem(nameFilter, JSON.stringify(filters));
    }
}
