class Timer {
    constructor(input) {
        this.id = input['id']
        this.name = input['name'];
        this.tx_name = input['tx_name'];
        if (input['time'] == null)
            this.time = new Date().getTime();
        else this.time = input['time'];
    }

    get elapsed() {
        let dt = new Date().getTime() - this.time;
        return this.parse(dt);
    }

    get color() {
        let dt = new Date().getTime() - this.time;
        if (dt < 7.2e+6) {
            return 'white';
        } else if (dt < 1.44e+7) {
            return 'yellow';
        } else {
            return 'red';
        }
    }

    parse(dt) {
        let hours = Math.floor((dt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((dt % (1000 * 60 * 60)) / (1000 * 60));
        return String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');
    }

    reset() {
        this.time = new Date().getTime();
    }
}