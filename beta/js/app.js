import { incrementCounter, updateCounterDisplay } from './firebase.js';
import { generateTemplate } from "./template.js";
import { copyToClipboard } from "./utils.js";
import { generateDynamicMidi } from './midiCreator.js';

// Check if running locally
const isLocalHost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// Increment page views and update counters if not local
if (!isLocalHost) {
  console.log("Running in production; initializing counters...");
  incrementCounter("pageViews");
  updateCounterDisplay();
} else {
  console.log("Counters are disabled in the local environment");
}

// Add event listener for Generate Template button
document.getElementById("generateTemplateBtn").addEventListener("click", async () => {
  const queryInput = document.getElementById("queryInput").value.trim();
  if (!queryInput) {
    alert("Please enter your query or requirements.");
    return;
  }

  // Generate the template
  const template = generateTemplate(queryInput);

  // Display the generated template
  const outputContainer = document.getElementById("outputContainer");
  document.getElementById("generatedTemplate").textContent = template;
  outputContainer.style.display = "block";

  // Increment template counter
  if (!isLocalHost) {
    await incrementCounter("templateGenerator");
    await updateCounterDisplay();
  }
});

// Add event listener for Copy Template button
document.getElementById("copyTemplateBtn").addEventListener("click", () => {
  const templateText = document.getElementById("generatedTemplate").textContent;
  copyToClipboard(templateText);
});



document.getElementById("sendToChatGPTBtn").addEventListener("click", () => {
  console.log("Send to ChatGPT button clicked!");

  const templateText = document.getElementById("generatedTemplate").textContent.trim();

  if (!templateText) {
    alert("No template found to send to ChatGPT.");
    return;
  }

  // Generate the ChatGPT link
  const chatGPTURL = `https://chatgpt.com/?q=${encodeURIComponent(templateText)}`;

  // Open ChatGPT in a new tab
  window.open(chatGPTURL, '_blank');

  // Increment counter for ChatGPT usage if not local
  if (!isLocalHost) {
    incrementCounter("chatGPTUsage");
    updateCounterDisplay();
  }
});

// Add event listener for Generate MIDI button
document.getElementById("generateMidiBtn").addEventListener("click", async () => {
  const midiFileURL = generateDynamicMidi(); // Get the temporary MIDI file URL

  if (midiFileURL) {
    // Set the MIDI file URL for the preview player
    const previewMidiPlayer = document.querySelector("midi-player");
    previewMidiPlayer.src = midiFileURL;

    // Update the MIDI Visualizer source
    const pianoRollVisualizer = document.getElementById("myPianoRollVisualizer");
    pianoRollVisualizer.src = midiFileURL;

    // Show and configure the download button
    const downloadMidiBtn = document.getElementById("downloadMidiBtn");
    downloadMidiBtn.style.display = "inline-block";
    downloadMidiBtn.onclick = () => {
      const downloadLink = document.createElement("a");
      downloadLink.href = midiFileURL;
      downloadLink.download = "dynamic_notes.mid";
      downloadLink.click();
    };
  }

  // Increment MIDI counter
  if (!isLocalHost) {
    await incrementCounter("midiGenerator");
    await updateCounterDisplay();
  }
});

