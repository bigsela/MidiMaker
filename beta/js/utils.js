// utils.js

/**
 * Copy text to clipboard.
 * @param {string} text - The text to copy.
 */
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Clipboard copy failed:", err));
  }
  