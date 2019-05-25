require("./polyfill");
require("./array-extensions");
const { XmlParser, XmlElement } = require("./xml-parser");
const { Vsq4 } = require("./vsqx");
const { Tempo, Track, Part, Note } = require("./parsed-vsqx");

function writeInfo(text) {
    clearOutput();
    writeLn("CreateLyricMarker");
    writeLn(text);
};

function readVsqx(file) {
    let text = "";
    file.encoding = "UTF-8";
    file.open("r");
    while (!file.eof) {
        text += file.readln() + "\n";
    }
    file.close();

    return XmlParser.parse(text)[0];
}

function parseVsqx(xml) {
    const vsqx = new Vsq4(xml);
    const resolution = vsqx.masterTrack.resolution;
    const measureTicks = resolution * 4;

    let preMeasureTicks = 0;
    // NOTE: reduceが正しく変換されないため自分でreduce
    new Array(vsqx.masterTrack.preMeasure)
        .fill(0)
        .map((_, i) => vsqx.masterTrack.timeSig.find(sig => sig.measure <= i))
        .map(sig => measureTicks / sig.denominator * sig.nume)
        .forEach(v => preMeasureTicks += v);

    const firstTempo = vsqx.masterTrack.tempo.skipWhile(t => t.tick <= preMeasureTicks).append(vsqx.masterTrack.tempo[0])[0];
    firstTempo.tick = preMeasureTicks;
    const tempo = vsqx.masterTrack.tempo.skipWhile(t => t.tick < preMeasureTicks)
        .mapReferencePrev(
            (v, prev) => 
                new Tempo(
                    v.tick - preMeasureTicks,
                    prev != null ? prev.totalTime + (v.tick - preMeasureTicks - prev.tick) * prev.tickPerTime : 0,
                    v.bpm * 0.01,
                    resolution
                )
        );
    const findTempo = tick => (tempo.findLast(t => t.tick <= tick) || tempo[0]);
    
    return vsqx.track.map(t => {
        const parts = (t.part || []).map(p => {
            const partTick = p.tick - preMeasureTicks;
            const partStartTime = findTempo(partTick).tickToTime(partTick);
            const playTimeTick = partTick + p.playTime;
            const notes = p.note.map(n => {
                const tick = partTick + n.tick;
                const time = findTempo(tick).tickToTime(tick);
                const length = findTempo(tick + n.duration).tickToTime(tick + n.duration) - time;
                return new Note(n.character, time - partStartTime, length);
            });

            return new Part(
                partStartTime,
                findTempo(playTimeTick).tickToTime(playTimeTick) - partStartTime,
                notes
            );
        });

        return new Track(t.name, parts);
    });
}

function main() {
    const compItem = app.project.activeItem;
    if (!(compItem instanceof CompItem)) {
        alert("not select comp");
        return;
    }

    const file = File.openDialog("Select vsqx file", "vsqx file:*.vsqx");
    if (file == null) {
        return;
    }

    writeInfo("Read vsqx");
    const vsqx = readVsqx(file);
    writeInfo("Parse vsqx");
    const tracks = parseVsqx(vsqx);
    
    tracks.forEach(t => {
        writeInfo(`create ${t.name} track: `);
        const textLayer = compItem.layers.addText("");
        textLayer.name = t.name;
        const markers = textLayer.property("Marker");
        const sourceText = textLayer.text.sourceText;
        t.parts.forEach(p => {
            const notes = p.notes;
            for (let i = 0; i < notes.length && notes[i].startTime < p.playTime; i++) {
                writeInfo(`create ${t.name} track: ${notes[i].character}`);
                markers.setValueAtTime(p.trackPosition + notes[i].position, new MarkerValue(notes[i].character));
            }
        });
    });
}

main();