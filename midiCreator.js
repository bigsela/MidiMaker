import Midi from "./jsmidgen.js";


/**
 * Generate a MIDI file from user input.
 */
export function generateDynamicMidi() {
  try {
    // Get input values from the HTML
    const inputText = document.getElementById("noteInput").value.trim();
    if (!inputText) {
      alert("Please enter some note lines first!");
      return;
    }

    let tempo = parseInt(document.getElementById("tempoInput").value, 10);
    if (isNaN(tempo) || tempo < 20 || tempo > 300) {
      alert("Invalid tempo. Please enter a value between 20 and 300 BPM.");
      return;
    }

    // Create a new MIDI file and track
    const file = new Midi.File();
    const track = new Midi.Track();
    file.addTrack(track);
    track.setTempo(tempo);

    const lines = inputText.split("\n").map(line => line.trim()).filter(Boolean);
    const pattern = /Note:\s*([A-Ga-g][#b]?\d+)\s*\|\s*Start:\s*([0-9]*\.?[0-9]+)\s*\|\s*Duration:\s*([0-9]*\.?[0-9]+)\s*\|\s*Velocity:\s*(\d+)/i;
    let isValid = true;
    const errorMessages = [];
    const ticksPerBeat = 128;

    const notesArray = [];
    lines.forEach((line, index) => {
      const match = line.match(pattern);
      if (!match) {
        isValid = false;
        errorMessages.push(`Line ${index + 1} is invalid: "${line}"`);
        return;
      }

      let note = match[1].trim();
      const startBeat = parseFloat(match[2]);
      const durationBeat = parseFloat(match[3]);
      const velocity = parseInt(match[4], 10);

      if (isNaN(startBeat) || isNaN(durationBeat) || isNaN(velocity) || velocity < 0 || velocity > 127) {
        isValid = false;
        errorMessages.push(`Line ${index + 1} has invalid values.`);
        return;
      }

      // Adjust the note to be one octave higher
      const noteParts = note.match(/^([A-Ga-g][#b]?)(\d+)$/);
      if (noteParts) {
        const pitch = noteParts[1];
        let octave = parseInt(noteParts[2], 10);
        octave += 1; // Increase octave by 1
        note = `${pitch}${octave}`;
      }

      const startTick = startBeat * ticksPerBeat;
      const durationTicks = durationBeat * ticksPerBeat;

      notesArray.push({ note, startTick, durationTicks, velocity });
    });

    if (!isValid) {
      alert("Errors found in your note lines:\n" + errorMessages.join("\n"));
      return;
    }

    // Sort notes by start time
    notesArray.sort((a, b) => a.startTick - b.startTick);

    const groupedNotes = [];
    let currentGroup = [];
    let currentStartTick = null;
    notesArray.forEach(noteObj => {
      const TOLERANCE = 1e-6;
      if (currentStartTick === null || Math.abs(noteObj.startTick - currentStartTick) < TOLERANCE) {
        currentGroup.push(noteObj);
        currentStartTick = noteObj.startTick;
      } else {
        groupedNotes.push({ startTick: currentStartTick, notes: currentGroup });
        currentGroup = [noteObj];
        currentStartTick = noteObj.startTick;
      }
    });
    if (currentGroup.length > 0) {
      groupedNotes.push({ startTick: currentStartTick, notes: currentGroup });
    }

    console.log("Grouped Notes:", groupedNotes);

    let lastTick = 0;
    groupedNotes.forEach(group => {
      const { startTick, notes } = group;
      const timeDelta = startTick - lastTick;

      if (notes.length === 1) {
        const { note, durationTicks, velocity } = notes[0];
        console.log(`Adding single note ${note} at tick ${startTick}, duration ${durationTicks}, timeDelta ${timeDelta}`);
        track.addNote(0, note, durationTicks, timeDelta, velocity);
      } else {
        const chordNotes = notes.map(note => note.note);
        const velocity = notes[0].velocity; // Assuming uniform velocity
        const duration = Math.max(...notes.map(note => note.durationTicks));
        console.log(`Adding chord at tick ${startTick}, notes: ${chordNotes.join(", ")}, duration: ${duration}, timeDelta ${timeDelta}`);
        track.addChord(0, chordNotes, duration, velocity);
      }

      lastTick = startTick;
    });

    // Convert MIDI to Base64 for downloading
    const midiBytes = file.toBytes();
    const base64 = btoa(
      midiBytes
        .split("")
        .map(char => String.fromCharCode(char.charCodeAt(0) & 0xFF))
        .join("")
    );

    // Trigger download
    const link = document.createElement("a");
    link.href = "data:audio/midi;base64," + base64;
    link.download = "dynamic_notes.mid";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("MIDI file 'dynamic_notes.mid' has been downloaded!");
  } catch (error) {
    console.error("Error generating MIDI:", error);
    alert("An error occurred while generating the MIDI file. Check the console for details.");
  }
}
