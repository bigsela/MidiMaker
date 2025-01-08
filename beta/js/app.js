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

// Add event listener for Generate MIDI button
document.getElementById("generateMidiBtn").addEventListener("click", async () => {
  generateDynamicMidi();

  // Increment MIDI counter
  if (!isLocalHost) {
    await incrementCounter("midiGenerator");
    await updateCounterDisplay();
  }
});
