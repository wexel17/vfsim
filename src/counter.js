class Counter {

    constructor() {
        this.total = 0;
        this.count = 0;
        this.min = Number.MAX_VALUE;
        this.max = Number.MIN_VALUE;
    }

    add(n) {
        this.count++;
        this.total += n;
        if (n < this.min) this.min = n;
        if (n > this.max) this.max = n;
    }

    combine(counter) {
        let combined = new Counter();
        combined.total = this.total + counter.total;
        combined.count = this.count + counter.count;
        combined.min = Math.min(this.min, counter.min);
        combined.max = Math.max(this.max, counter.max);
        return combined;
    }

    get mean() {
        return this.total / this.count;
    }

}

export default Counter;
