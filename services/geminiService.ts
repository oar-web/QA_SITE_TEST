
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const summarizeIssue = async (title: string, description: string) => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please summarize the following issue for a QA report in 2-3 sentences: Title: ${title}, Description: ${description}`,
    });
    return response.text;
  } catch (error) {
    console.error("AI summarization failed", error);
    return "Summarization currently unavailable.";
  }
};

export const generateReleaseNotes = async (releaseVersion: string, issues: any[]) => {
  try {
    const ai = getAIClient();
    const issueList = issues.map(i => `- [${i.type}] ${i.title}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional release note summary for version ${releaseVersion} based on these issues:\n${issueList}`,
    });
    return response.text;
  } catch (error) {
    console.error("AI Release note generation failed", error);
    return "Failed to generate release notes automatically.";
  }
};
