import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGING_FACE_API_KEY);
const MODEL = 'mistralai/Mistral-Nemo-Instruct-2407';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const prompt = `
      Based on this query: "${query}",
      generate 3 innovative and unique project ideas suitable for showcasing creativity and problem-solving skills.
      Each idea should:
      1. Be numbered (e.g., "1. Idea Name - Description").
      2. Be relevant to current trends or address real-world problems.
      3. Be clearly formatted as a list.

      Provide only the ideas as output.
    `;

    const response = await hf.textGeneration({
      model: MODEL,
      inputs: prompt,
      parameters: {
        max_new_tokens: 250,
        temperature: 0.8,
        top_p: 0.9,
        do_sample: true,
        return_full_text: false
      }
    });

    const generatedText = response.generated_text || '';
    const ideas = generatedText
      .split('\n')
      .filter(line => /^\d\./.test(line.trim()))
      .join('\n');

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}
