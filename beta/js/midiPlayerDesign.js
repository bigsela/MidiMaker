// Select the <midi-player> element
const midiPlayer = document.querySelector('midi-player');

// Check if the Shadow DOM is available
if (midiPlayer.shadowRoot) {
  // Create a <style> element
  const customStyle = document.createElement('style');

  // Add your custom styles
  customStyle.textContent = `
    :host {
      display: inline-block;
      width: 100%; /* Make it responsive */
      margin: 10px 0;
      font-family: 'Poppins', Arial, sans-serif;
      font-size: 14px;
    }
    
    .controls {
      background: #222 !important; /* Dark background to match theme */
      color: #fff !important; /* White text */
      border-radius: 8px !important; /* Rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important; /* Add shadow */
    }

    .controls button {
      background: rgba(255, 255, 255, 0.1) !important; /* Subtle button background */
    }

    .controls button:not(:disabled):hover {
      background: rgba(255, 255, 255, 0.2) !important; /* Highlight on hover */
    }

    .controls .seek-bar::-moz-range-track {
      background-color: #555 !important; /* Progress bar track color */
    }

    .controls .seek-bar::-webkit-slider-runnable-track {
      background-color: #555 !important; /* Webkit progress bar */
    }

    .controls.loading .loading-overlay {
      background: linear-gradient(110deg, #444 5%, #777 25%, #444 45%) !important;
    }
  `;

  // Append the <style> element to the Shadow DOM
  midiPlayer.shadowRoot.appendChild(customStyle);
}

// Select the <midi-visualizer> element
const midiVisualizer = document.querySelector('midi-visualizer');

// Check if the Shadow DOM is available
if (midiVisualizer.shadowRoot) {
  // Create a <style> element
  const customStyle = document.createElement('style');

  // Add your custom styles
  customStyle.textContent = `
    :host {
      display: block;
      background: #333 !important; /* Dark background for contrast */
      border-radius: 8px !important; /* Rounded corners */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3) !important; /* Consistent shadow */
      padding: 10px !important; /* Add some padding around the visualizer */
    }

    ::slotted(.piano-roll-visualizer) {
      overflow-x: auto !important; /* Enable horizontal scrolling */
      background: #222 !important; /* Match section background */
      color: #ffcc80 !important; /* Note color */
      border-radius: 8px !important; /* Rounded corners for the inner content */
      padding: 10px !important; /* Add internal padding */
      scrollbar-width: thin; /* Adjust scrollbar width */
      scrollbar-color: #555 #222; /* Dark scrollbar */
    }

    /* Custom scrollbar for WebKit-based browsers */
    ::slotted(.piano-roll-visualizer::-webkit-scrollbar) {
      height: 8px; /* Height of the scrollbar */
    }

    ::slotted(.piano-roll-visualizer::-webkit-scrollbar-track) {
      background: #222; /* Track color */
    }

    ::slotted(.piano-roll-visualizer::-webkit-scrollbar-thumb) {
      background-color: #555; /* Thumb color */
      border-radius: 4px; /* Rounded scrollbar */
    }

    /* Notes in the visualizer */
    .note {
      fill: #ffcc80 !important; /* Default note color */
    }

    .note.active {
      fill: #ff9800 !important; /* Active note highlight */
    }

    /* Optional: Customize grid lines */
    .grid-line {
      stroke: #555 !important; /* Grid line color */
    }
  `;

  // Append the <style> element to the Shadow DOM
  midiVisualizer.shadowRoot.appendChild(customStyle);
}
