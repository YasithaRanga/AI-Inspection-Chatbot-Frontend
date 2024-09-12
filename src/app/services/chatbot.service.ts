import axios from 'axios';

interface ChatbotResponse {
  answer: string;
  response: string;
}

const API_URL = process.env.NEXT_APP_API_URL || 'http://127.0.0.1:5000';

export const getChatbotResponse = async (
  query: string,
  isFollowup: boolean
): Promise<ChatbotResponse | null> => {
  try {
    const response = await axios.post<ChatbotResponse>(`${API_URL}/api/query`, {
      query: query,
      is_followup: isFollowup,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    return null;
  }
};
