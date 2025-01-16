import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
const MODEL = 'mistralai/Mistral-Nemo-Instruct-2407';

export async function POST(req: Request) {
  try {
    const { selectedIdeas } : { selectedIdeas : string[] } = await req.json();
    const prompt = selectedIdeas
    .map((idea, index) => `Idea ${index + 1}: ${idea}`)
    .join('\n\n') + `\n\nFor each idea, provide detailed suggestions.`;

    const response = await hf.textGeneration({
      model: MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,  
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false
      }
    });

    const suggestions = response.generated_text
      ?.split(/(?=Idea \d+:)/) // Regex to split on "Idea X:"
      .map((section) => section.trim()) || [];

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to expand ideas' }, { status: 500 });
  }
}
