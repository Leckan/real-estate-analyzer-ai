// lib/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generatePropertyAnalysis(propertyDetails) {
  try {
    const model = genAI.model("gemini-pro"); // Or the appropriate Gemini model name

    // Construct the prompt for Gemini.  Be as descriptive and specific as possible!
    const prompt = `
      Analyze the following real estate property details and provide a comprehensive analysis, including potential investment opportunities, risks, and a summary.  Consider factors like location, property features, market trends, and any other relevant information.  Format the analysis in Markdown.

      Property Details:
      ${JSON.stringify(propertyDetails, null, 2)} // Use JSON.stringify for cleaner formatting

      Provide the analysis in the following sections:

      ## Summary
      (Provide a brief summary of the property and its potential)

      ## Investment Opportunities
      (Discuss the potential investment opportunities this property presents)

      ## Risks
      (Outline the potential risks associated with this property)

      ## Detailed Analysis
      (Provide a more in-depth analysis, including any relevant calculations or comparisons)

      ## Conclusion
      (Summarize the findings and provide a final recommendation)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    if (response && response.candidates && response.candidates.length > 0) {
      const analysis = response.candidates[0].content.parts[0].text;
      return analysis;
    } else {
      console.error("Gemini API returned an unexpected response:", response);
      return null;
    }


  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}