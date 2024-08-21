import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google Generative AI
const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  tools: [{ codeExecution: {} }],
});

// Configuration for generation
const generationConfig = {
  temperature: 0.85,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const userInput = req.body?.userInput;
      if (!userInput) {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      // Start chat session
      const chatSession = model.startChat({
        generationConfig,
        history: [
          {
            role: 'user',
            parts: [{ text: 'hlw\n' }],
          },
          {
            role: 'model',
            parts: [{ text: 'Hello! 👋  How can I help you today? 😊 \n' }],
          },
          {
            role: 'user',
            parts: [{ text: 'what are the quession i can as\nk' }],
          },
          {
            role: 'model',
            parts: [{ text: 'only argiculture related quesions \n\n' }],
          },
          {
            role: 'user',
            parts: [{ text: 'how u can help me' }],
          },
          {
            role: 'model',
            parts: [{ text: 'I can help you with a wide range of agriculture-related questions. Here are some examples:\n\n**General Agriculture:**\n\n* **Crop Information:**  I can provide details about different crops like their growing conditions, planting methods, pest control, and harvesting techniques. \n* **Soil Management:** I can help you understand soil types, soil testing, fertilization, and other soil management practices.\n* **Irrigation:** I can explain different irrigation methods, water conservation techniques, and water management strategies.\n* **Pest and Disease Control:** I can provide information on common pests and diseases affecting crops, their identification, and control measures. \n* **Farm Management:** I can offer insights into farm planning, financial management, and record-keeping.\n\n**Specific Topics:**\n\n* **Sustainable Agriculture:** I can discuss sustainable farming practices, organic farming, and environmentally friendly agricultural methods.\n* **Precision Agriculture:** I can explain the use of technology in agriculture, such as GPS, drones, and sensors.\n* **Livestock Management:** I can provide information on animal care, breeding, feeding, and disease prevention for livestock.\n\n**How to ask me questions:**\n\n* Be specific and clear in your questions.\n* Use keywords related to agriculture. \n* Provide context if necessary.\n\n**Example Questions:**\n\n* What are the best fertilizer recommendations for growing tomatoes?\n* How do I control aphids on my rose bushes?\n* What are the benefits of using drip irrigation?\n* What are some sustainable farming practices I can implement?\n\nI\'m here to assist you with your agricultural needs. Feel free to ask me anything! 🌾 \n' }],
          },
        ],
      });

      const result = await chatSession.sendMessage(userInput);
      res.status(200).json({ response: result.response.text() });
    } catch (error) {
      console.error('Error in chat endpoint:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
