import Midi from "./jsmidgen.js";

/**
 * Generate a MIDI file based on the user input.
 * @param {Object} options - Configuration for the MIDI generation.
 * @param {Array} options.notes - Array of note objects with details.
 * @param {number} options.tempo - Tempo in BPM.
 * @returns {Uint8Array} - MIDI file data.
 */
export function generateMidi({ notes, tempo }) {
  const file = new Midi.File();
  const track = new Midi.Track();
  file.addTrack(track);
  track.setTempo(tempo);

  notes.forEach(({ note, startTick, durationTicks, velocity }) => {
    track.addNote(0, note, durationTicks, startTick, velocity);
  });

  return new Uint8Array(file.toBytes());
}
