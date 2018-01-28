class Queue {
    constructor() {
        this._storage = [];
    }

    peek() {
        return this._storage[0];
    }

    getSize() {
        return this._storage.length;
    }

    getQueueContents(){
        return this._storage;
    }

    isQueueEmpty() {
        return this._storage.length ? false : true;
    }

    enqueue(object) {
        this._storage.push(object);
    }

    dequeue() {
        return this._storage.shift();
    }
}

export default Queue;