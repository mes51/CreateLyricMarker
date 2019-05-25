class Vsq4 {
    constructor(xmlElement) {
        this.masterTrack = new Vsq4MasterTrack(xmlElement.findElement("masterTrack"));
        this.track = xmlElement.findAllElements("vsTrack").map(t => new Vsq4Track(t));
    }
}

class Vsq4MasterTrack {
    constructor(xmlElement) {
        this.resolution = xmlElement.findElement("resolution").getInt();
        this.preMeasure = xmlElement.findElement("preMeasure").getInt();
        this.timeSig = xmlElement.findAllElements("timeSig").map(t => new Vsq4TimeSig(t));
        this.tempo = xmlElement.findAllElements("tempo").map(t => new Vsq4Tempo(t));
    }
}

class Vsq4TimeSig {
    constructor(xmlElement) {
        this.measure = xmlElement.findElement("m").getInt();
        this.nume = xmlElement.findElement("nu").getInt();
        this.denominator = xmlElement.findElement("de").getInt();
    }
}

class Vsq4Tempo {
    constructor(xmlElement) {
        this.tick = xmlElement.findElement("t").getInt();
        this.bpm = xmlElement.findElement("v").getInt();
    }
}

class Vsq4Track {
    constructor(xmlElement) {
        this.name = xmlElement.findElement("name").cData[0];
        this.part = xmlElement.findAllElements("vsPart").map(p => new Vsq4Part(p));
    }
}

class Vsq4Part {
    constructor(xmlElement) {
        this.tick = xmlElement.findElement("t").getInt();
        this.playTime = xmlElement.findElement("playTime").getInt();
        this.note = xmlElement.findAllElements("note").map(n => new Vsq4Note(n));
    }
}

class Vsq4Note {
    constructor(xmlElement) {
        this.tick = xmlElement.findElement("t").getInt();
        this.duration = xmlElement.findElement("dur").getInt();
        this.character = xmlElement.findElement("y").cData[0];
    }
}

module.exports = {
    Vsq4: Vsq4,
    Vsq4MasterTrack: Vsq4MasterTrack,
    Vsq4TimeSig: Vsq4TimeSig,
    Vsq4Tempo: Vsq4Tempo,
    Vsq4Track: Vsq4Track,
    Vsq4Part: Vsq4Part,
    Vsq4Note: Vsq4Note
};