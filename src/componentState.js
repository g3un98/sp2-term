import { fetchCtfInfo } from "../api/fetch";

export class CtfListControl {
    constructor() {
        this.newState = [];
    }

    static async updateCtfList(startTime, finishTime) {
        this.newState = await fetchCtfInfo((startTime = startTime, finishTime=finishTime));
        return this.newState;
    }
}

export class MarkedListControl {
    constructor() {
        this.newState = [];
    }

    static async updateMarkedCtfList(startTime, finishTime) {
        this.newState = await fetchCtfInfo((startTime = startTime, finishTime=finishTime));
        return this.newState;
    }

    static deleteMarkedCtfList(id, prevState) {
        console.log(`Delete ID: ${id}`);
        console.log("[DEBUG PREV] " + prevState);
        // add database delete function
        this.newState = prevState.filter(ctf => ctf.id != id);
        console.log("[DEBUG] " + this.newState);
        return this.newState;
    }
}
