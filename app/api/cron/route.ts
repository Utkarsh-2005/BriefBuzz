// app/api/data/route.ts
import { NextResponse } from 'next/server';
import {
  GoogleGenerativeAI
} from "@google/generative-ai";
import { prisma } from '@/lib/prisma'


// const prisma = new PrismaClient();


const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined in the environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt: string) {
  try {
    const chatSession = model.startChat({ generationConfig });
    const result = await chatSession.sendMessage(prompt);
    if (!result || !result.response) {
      throw new Error('Empty or invalid response from the model');
    }
    return result;
  } catch (error) {
    console.error('Error in run function:', error);
    throw error;
  }
}

export async function GET() {
  try {
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=2d6a75aacad645469ef07fbdf13cb522', { next: { revalidate: 0 } });
  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }

  const data = await response.json();
  const TransformedArticles = data.articles.map((article:any) => ({
    author: article.author,
    title: article.title,
    description: article.description,
    content: article.content,
    image: article.urlToImage,
  }))
  // console.log(data)
  const dataStr200 = JSON.stringify(TransformedArticles) + " Summarize this news into 200 words. Add '##' before starting. Add ' \n' at the start of a new topic and after it."
  const dataStr350 = JSON.stringify(TransformedArticles) + " Summarize this news into 350 words.Add '##' before starting. Add ' \n' at the start of a new topic and after it."
  const dataStr500 = JSON.stringify(TransformedArticles) + " Summarize this news into 500 words. Add ' \n' at the start of a new topic and after it." 
  const dataStr1000 = JSON.stringify(TransformedArticles) + " Summarize this news into 1000 words. Add ' \n' at the start of a new topic and after it."
  const cards = JSON.stringify(TransformedArticles) + " Create an array of objects. Distribute this news topic wise in objects of keys- topic (genre i.e. Health, Finance, Sports, etc), image (which has the image url) and description."

  const textCard = await run(cards);
  const text200 = await run(dataStr200);
  const text350 = await run(dataStr350);
  const text500 = await run(dataStr500);
  const text1000 = await run(dataStr1000);
  
console.log('textCard:', textCard);
  console.log('Response for cards:', textCard?.response?.text());
  const Cardtext = textCard?.response?.text();
  await prisma.article.create({
    data: {
      card: (Cardtext ? (typeof Cardtext === 'string' ? Cardtext : Cardtext[0]) : 'No data'),
      twoHundred: text200.response.text(),
      threeFifty: text350.response.text(),
      fiveHundred: text500.response.text(),
      oneThousand: text1000.response.text(),
    },
  });
  // .replace(/(\n|\s)+/g, ' ')
  const oldestObject = await prisma.article.findFirst({
    orderBy: {
      createdAt: 'asc', // Fetches the first created (oldest) object
    },
  });
  if (oldestObject) {
    await prisma.article.delete({
      where: {
        id: oldestObject.id, // Assuming `id` is the primary key
      },
    });
  }
    

  return NextResponse.json(data);
}catch (error:any) {
  console.error('Error in GET function:', error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}
