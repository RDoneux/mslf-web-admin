export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): string {
  // Split the text by spaces to count the words
  const wordCount = text.trim().split(/\s+/).length;

  // Calculate the reading time in minutes
  const readingTimeInMinutes = wordCount / wordsPerMinute;

  // Convert to minutes and seconds
  const minutes = Math.floor(readingTimeInMinutes);
  const seconds = Math.floor((readingTimeInMinutes - minutes) * 60);

  // Return the formatted string
  return `${minutes} minute(s) and ${seconds} second(s)`;
}
