class Controller {
    constructor() {
        this.timers = {};
    }

    get(id) {
        return this.timers[id];
    }

    new_timer() {
        // find new id (max of all id's + 1, else 0)
        let id = 0
        if (Object.keys(this.timers).length) {
            let max = Math.max(...Object.keys(this.timers));
            id = max + 1;
        }
        this.timers[id] = new Timer({ 'id': id, 'name': '', 'tx_name': '' });
        return id;
    }

    delete_timer(id) {
        delete this.timers[id];
    }

    load(json) {
        const data = JSON.parse(json);
        for (const i in data)
            this.timers[data[i]['id']] = new Timer(data[i]);
    }

    clear() {
        delete this.timers;
        this.timers = {};
    }
}