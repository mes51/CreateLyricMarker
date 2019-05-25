class Tempo {
    constructor(tick, totalTime, tempo, resolution) {
        this.tick = tick;
        this.totalTime = totalTime;
        this.tickPerTime = 1.0 / (60.0 / tempo / resolution);
    }
    
    tickToTime(tick) {
        return this.totalTime + (tick - this.tick) / this.tickPerTime;
    }
}

class Track {
    constructor(name, parts) {
        this.name = name;
        this.parts = parts;
    }
}

class Part {
    constructor(trackPosition, playTime, notes) {
        this.trackPosition = trackPosition;
        this.playTime = playTime;
        this.notes = notes;
    }
}

class Note {
    constructor(character, position, duration) {
        this.character = character;
        this.position = position;
        this.duration = duration;
    }
}

module.exports = {
    Tempo: Tempo,
    Track: Track,
    Part: Part,
    Note: Note
};