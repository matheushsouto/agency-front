export default class Utils {
    static revertDate(date) {
        const array = date.split('-');
        return array[2] + '-' + array[1] + '-' + array[0];
    }

    static isEmpty(obj): boolean {
        return Object.keys(obj).length > 0;
    }

    static getNextMonth() {
        const date = new Date();
        const month = date.getMonth() + 2;
        return ((month > 9 ? month.toString() : 0 + '' + month) + '-' + date.getFullYear());
    }
}
