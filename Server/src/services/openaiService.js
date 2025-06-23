import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export const analyzeWithAI = async (resumeText) => {
  try {
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = "2025-01-01-preview";
    const deployment = "gpt-4.1";
  
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  
    const prompt = `
      Analyze this resume and provide:
      1. An ATS score (0-100)
      2. Detailed suggestions for improvement
      3. Missing keywords that could be important
      4. Format issues if any
      
      Resume text:
      ${resumeText}
      
      Provide the response in the following JSON format:
      {
        "score": number,
        "suggestions": [string],
        "missingKeywords": [string],
        "formatIssues": [string]
      }
  `;

    const completion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an expert ATS resume analyzer. Analyze resumes and provide detailed feedback. You must respond in JSON format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 800,
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
        response_format: { type: "json_object" },
      },
    );

    const responseContent = completion.choices[0].message.content;
    return JSON.parse(responseContent);
  } catch (error) {
    throw new Error('Error analyzing resume: ' + error.message);
  }
};
