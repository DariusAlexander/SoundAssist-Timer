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

class Timer {
    constructor(input) {
        this.id = input['id']
        this.name = input['name'];
        this.tx_name = input['tx_name'];
        if (input['time'] == null)
            this.time = new Date().getTime();
        else this.time = input['time'];
    }

    get dt() {
        return (new Date().getTime() - this.time);
    }

    get elapsed() {
        return Timer.parse(this.dt);
    }

    get color() {
        if (this.dt < 7.2e+6) {
            return 'white';
        } else if (this.dt < 1.44e+7) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    static parse(dt) {
        const hours = Math.floor(dt / (1000 * 60 * 60));
        if (hours > 23) {
            return "--:--";
        }
        const minutes = Math.floor((dt % (1000 * 60 * 60)) / (1000 * 60));
        return String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');
    }

    reset() {
        this.time = new Date().getTime();
    }
}