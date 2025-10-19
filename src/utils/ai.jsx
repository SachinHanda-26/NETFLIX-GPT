import { GoogleGenAI } from '@google/genai';
import { GenAI_KEY } from './constants';
const GEMINI_API_KEY = GenAI_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default ai;