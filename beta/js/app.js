import { generateTemplate } from "./template.js";
import { copyToClipboard } from "./utils.js";
import { generateDynamicMidi } from './midiCreator.js';


// Check if running locally
const isLocalHost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// Skip counters for local environment
if (!isLocalHost) {
  console.log("Running in production; initializing counters...");
  const pageViewsCounter = document.getElementById("pageViewsCounter");
  const templateCounter = document.getElementById("templateCounter");
  const midiCounter = document.getElementById("midiCounter");

  if (pageViewsCounter) pageViewsCounter.textContent = "0";
  if (templateCounter) templateCounter.textContent = "0";
  if (midiCounter) midiCounter.textContent = "0";
} else {
  console.log("Counters are disabled in the local environment");
}

// Add event listener for Generate Template button
document.getElementById("generateTemplateBtn").addEventListener("click", () => {
  const queryInput = document.getElementById("queryInput").value.trim();
  if (!queryInput) {
    alert("Please enter your query or requirements.");
    return;
  }

  // Use the imported generateTemplate function
  const template = generateTemplate(queryInput);

  // Display the generated template
  const outputContainer = document.getElementById("outputContainer");
  document.getElementById("generatedTemplate").textContent = template;
  outputContainer.style.display = "block";
});

// Add event listener for Copy Template button
document.getElementById("copyTemplateBtn").addEventListener("click", () => {
  const templateText = document.getElementById("generatedTemplate").textContent;
  copyToClipboard(templateText);
});

document.getElementById("generateMidiBtn").addEventListener("click", () => {
  generateDynamicMidi();
});