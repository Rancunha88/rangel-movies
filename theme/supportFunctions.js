export const breakAtNearestSpace = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    const substring = str.slice(0, maxLength); // Get substring up to max length
    const lastSpaceIndex = substring.lastIndexOf(' '); // Find last space in substring
    if (lastSpaceIndex === -1) {
      // No spaces found in substring, split at max length
      return `${str.slice(0, maxLength)}\n${str.slice(maxLength)}`;
    }
    // Split at the last space
    return `${str.slice(0, lastSpaceIndex)}\n${str.slice(lastSpaceIndex + 1)}`;
  };