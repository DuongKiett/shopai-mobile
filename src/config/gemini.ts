import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyBch0leX0UEQ8Qu9k6IaFRG080EZS0jwOU'; // Thay bằng key của bạn

const genAI = new GoogleGenerativeAI(API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash', // Model miễn phí, nhanh
  systemInstruction: `Bạn là trợ lý tư vấn mua sắm thông minh của ứng dụng. 
    Hãy trả lời các câu hỏi về sản phẩm, giá cả, so sánh sản phẩm một cách thân thiện và chính xác.
    Trả lời bằng tiếng Việt, ngắn gọn và dễ hiểu.`,
});