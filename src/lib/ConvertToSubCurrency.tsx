export default function convertToSubCurrency(
  amount: number,
  factor = 100
): number {
  const convertedValue = Math.round(amount * factor);
  console.log("Converted Value:", convertedValue); // Display in console
  return convertedValue; // Return the value
}

// Example usage
const result = convertToSubCurrency(12.34);
console.log("Returned Value:", result);
