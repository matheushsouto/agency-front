const nameFilter = 'orders';

export class OrderService {

    static save(key: string, value: object) {
        const allFilters = this.getAll();
        allFilters[key] = value;
        this.saveAll(allFilters);
    }

    static saveItem(key: string, item: string, value: string) {
        const allFilters = this.getAll();

        if (allFilters[key] === undefined) {
            allFilters[key] = {sort: 'id asc', limit: 10, page: 1};
        }
        allFilters[key][item] = value;
        this.saveAll(allFilters);
    }

    static get(key: string): object {
        const allFilters = this.getAll();

        let filter = allFilters[key];
        if (filter == null) {
            filter = {sort: 'id asc', limit: 10, page: 1};
        }
        return filter;
    }

    static delete(key: string) {
        const array = this.getAll();
        delete array[key];
        this.saveAll(array);
    }

    public static removeItem() {
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
