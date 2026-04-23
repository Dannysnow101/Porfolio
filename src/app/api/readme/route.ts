import { NextResponse } from 'next/server';

export const revalidate = 3600;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const owner = searchParams.get('owner');
    const repo = searchParams.get('repo');

    if (!owner || !repo) {
        return NextResponse.json({ message: 'Missing owner/repo' }, { status: 400 });
    }

    const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

    const headers: Record<string, string> = {
        Accept: 'application/vnd.github.raw',
        'User-Agent': 'snow-portfolio',
    };

    const token = process.env.GITHUB_TOKEN;
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        headers,
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        return NextResponse.json({ message: 'unavailable for now' }, { status: response.status });
    }

    const markdown = await response.text();

    return new NextResponse(markdown, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}