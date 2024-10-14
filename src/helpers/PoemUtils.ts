export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): string {
  // Split the text by spaces to count the words
  const wordCount = text.trim().split(/\s+/).length;

  // Calculate the reading time in minutes
  const readingTimeInMinutes = wordCount / wordsPerMinute;

  // Convert to minutes and seconds
  let minutes = `${Math.floor(readingTimeInMinutes)}`;

  if(+minutes < 1) minutes = "Less than 1"

  // Return the formatted string
  return `${minutes} minute`;
}
