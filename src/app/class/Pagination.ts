export class Pagination {
    cur: number;
    first: number;
    last: number;
    range: number;
    callbackfunc: any;

    getPrev(): number {
        if (this.first == this.cur) return this.first;
        this.cur--;
        return this.cur;
    }
    getNext(): number {
        this.cur++;
        return this.cur;
    }

    getCurrent(val: number) {
        this.cur = val;
        return val;
    }
    lasta: number[] = [];

    getRange(): Array<number> {
        let a: number[] = [];
        let start = Math.floor(this.cur / this.range) * this.range;
        if (this.cur % this.range == 0) {
            start = start - this.range;
        }
        let val = start + this.range;
        start += 1;
        if (val > this.last) val = this.last;
        if (this.last == 1) {
            a.push(1);
            return a;
        }
        if (this.lasta.length > 1 && this.lasta[0] == start) {
            return this.lasta;
        }
        if (start >= val) {
            return this.lasta;
        }

        for (let i = start; i <= val; i++)
            a.push(i);

        this.lasta = a;
        return a;
    }
}