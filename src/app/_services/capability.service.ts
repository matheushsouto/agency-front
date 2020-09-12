const name = 'capabilities';

export class CapabilityService {

    static save(capabilities: Array<object>) {
        localStorage.setItem(name, JSON.stringify(capabilities));
    }

    public static removeItem() {
        localStorage.removeItem(name);
    }

    static canShowMenu(slug: string): boolean {
        return this.hasPermission(slug);
    }

    static hasPermission(slug: string): boolean {
        const all = this.all();
        if (!all) {
            return false;
        }
        const index = all.findIndex(item => item['slug'] === slug);
        if (index === -1) {
            return false;
        }
        return all[index]['capability']['read'];
    }

    public static get(slug: string): object {
        const all = this.all();
        const index = all.findIndex(item => item['slug'] === slug);

        return all[index]['capability'];
    }

    protected static all(): Array<object> {
        return JSON.parse(localStorage.getItem(name));
    }
}
