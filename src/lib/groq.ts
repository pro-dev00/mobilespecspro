import Groq from 'groq-sdk';
import { MOCK_PHONES } from '../data';
import { Phone } from '../types';

// Initialize the Groq SDK with the API key from environment variables
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    // WARNING: Allowing browser access exposes the key. This is acceptable for this frontend-only demo
    dangerouslyAllowBrowser: true,
});

const getPhoneContextStr = () => {
    // We only send the top a few phones to save tokens
    const lightweightPhones = MOCK_PHONES.map(p =>
        `- ${p.name} (${p.brand}) at ${p.price}: ${p.specs.memory.ram} RAM, ${p.specs.memory.internal} storage, ${p.specs.camera.main} camera, ${p.specs.processor.chipset}`
    );

    // Join phones and strictly enforce a max character limit (e.g. 1000 characters) to avoid quota errors
    const fullContext = lightweightPhones.join('\n');
    if (fullContext.length > 900) {
        // Cut it off cleanly at the last full line within the budget
        const truncated = fullContext.substring(0, 900);
        const lastNewline = truncated.lastIndexOf('\n');
        return lastNewline > 0 ? truncated.substring(0, lastNewline) + "\n... (more phones available)" : truncated;
    }

    return fullContext;
};

const SYSTEM_PROMPT = `You are a highly knowledgeable and enthusiastic AI Phone Advisor for "MobileSpec Pro".
Your job is to recommend, compare, and explain mobile phones from our specific database.

Here is a subset of the phones currently in our database:
${getPhoneContextStr()}

RULES:
1. ONLY recommend phones from the list provided or general well-known models if asked broadly, but prioritize our catalog.
2. Keep your answers concise, formatted in markdown, and helpful.
3. Be enthusiastic and professional.
`;

export type ChatMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

/**
 * Sends a list of messages to the Groq API and returns the AI's response text.
 */
export async function getGroqChatCompletion(messages: Omit<ChatMessage, 'system'>[]) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...messages
            ],
            // Using the ultra-fast Llama 3.1 8B model
            model: "llama-3.1-8b-instant",
            temperature: 0.7,
            max_tokens: 512,
        });

        return chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't formulate a response right now.";
    } catch (error) {
        console.error("Groq API Error:", error);
        return "I apologize, but I am currently experiencing technical difficulties connecting to my brain. Please try again later.";
    }
}

/**
 * Generates a specific insight for a single phone
 */
export async function getGroqPhoneInsight(phone: Phone, userQuestion: string) {
    try {
        const phoneContext = `Phone: ${phone.name} (Brand: ${phone.brand}) Price: ${phone.price}
Specs: ${phone.specs.processor.chipset}, ${phone.specs.memory.ram} RAM, ${phone.specs.battery.type}, Camera: ${phone.specs.camera.main}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are an AI expert reviewing the following phone: ${phoneContext}. Answer the user's specific question about this device concisely in 1-3 sentences.`
                },
                {
                    role: 'user',
                    content: userQuestion
                }
            ],
            model: "llama-3.1-8b-instant",
            temperature: 0.5,
            max_tokens: 150,
        });

        return chatCompletion.choices[0]?.message?.content || "No insight available.";
    } catch (error) {
        console.error("Groq Insight Error:", error);
        return "Insight generation failed.";
    }
}
