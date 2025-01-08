import { generateTemplate } from "./template.js";
import { copyToClipboard } from "./utils.js";
import { generateDynamicMidi } from './midiCreator.js';


// Check if running locally
const isLocalHost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

// Skip counters for local environment
if (!isLocalHost) {
  console.log("Running in production; initializing counters...");
  document.getElementById("pageViewsCounter").textContent = "0";
  document.getElementById("templateCounter").textContent = "0";
  document.getElementById("midiCounter").textContent = "0";
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