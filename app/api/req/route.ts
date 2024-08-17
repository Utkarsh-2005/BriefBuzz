// app/api/articles/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parseISO, startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    if (!dateParam) {
      return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
    }

    const date = parseISO(dateParam);
    const articles = await prisma.article.findMany({
      where: {
        createdAt: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });

    return NextResponse.json(articles);
  } catch (error: any) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
