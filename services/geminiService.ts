
import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  // 브라우저 환경에서 process.env가 없을 경우를 대비한 안전 장치
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  return new GoogleGenAI({ apiKey: apiKey || '' });
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
