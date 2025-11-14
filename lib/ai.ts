import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export class AIService {
  static async generateQuiz(
    topic: string,
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
    count: number = 5
  ) {
    try {
      const prompt = `Generate ${count} multiple choice questions about ${topic} at ${difficulty} level for Bangladeshi students.

Return as JSON array with this exact structure:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Option A",
    "explanation": "Brief explanation why this is correct"
  }
]

Requirements:
- Questions should be in Bangla language
- Each question must have exactly 4 options
- One option must be clearly correct
- Include explanation for the correct answer
- Difficulty should match: ${difficulty}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const text = response.text;

      if (!text) {
        throw new Error("Empty AI response");
      }

      // Clean the response to extract JSON
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Invalid AI response format");
      }

      const questions = JSON.parse(jsonMatch[0]);
      return questions;
    } catch (error) {
      console.error("AI Quiz Generation Error:", error);
      throw new Error("Failed to generate quiz questions");
    }
  }

  static async chatTutor(question: string, subject: string, context?: string) {
    try {
      const prompt = `You are an expert tutor for ${subject} helping Bangladeshi students. Answer this question clearly and helpfully.

Question: ${question}
${context ? `Context: ${context}` : ""}

Guidelines:
- Answer in Bangla language
- Explain concepts step by step
- Use simple language
- Be encouraging and patient
- If the question is unclear, ask for clarification`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.error("AI Chat Error:", error);
      throw new Error("Failed to get AI response");
    }
  }

  static async generateSummary(content: string, subject: string) {
    try {
      const prompt = `Summarize this ${subject} content for Bangladeshi students in 3-5 key points.

Content: ${content}

Return as JSON with this structure:
{
  "summary": ["Point 1", "Point 2", "Point 3"],
  "keyConcepts": ["Concept 1", "Concept 2"],
  "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED"
}

Requirements:
- Summary points in Bangla
- Identify main concepts
- Assess difficulty level`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const text = response.text;

      const jsonMatch = text?.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Invalid AI response format");
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("AI Summary Error:", error);
      throw new Error("Failed to generate summary");
    }
  }

  static async recommendCourses(
    userHistory: string[],
    availableSubjects: string[]
  ) {
    try {
      const prompt = `Based on this learning history, recommend next courses for a Bangladeshi student.

Learning History: ${userHistory.join(", ")}

Available Subjects: ${availableSubjects.join(", ")}

Return as JSON array of recommendations:
[
  {
    "subject": "Mathematics",
    "reason": "Why this subject next",
    "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
    "priority": "HIGH|MEDIUM|LOW"
  }
]

Consider:
- Build upon existing knowledge
- Fill knowledge gaps
- Student learning progression
- Bangladeshi curriculum relevance`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });
      const text = response.text;

      const jsonMatch = text?.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error("Invalid AI response format");
      }

      return JSON.parse(jsonMatch[0]);
    } catch (error) {
      console.error("AI Recommendation Error:", error);
      throw new Error("Failed to generate recommendations");
    }
  }
}
