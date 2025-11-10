import { NextRequest, NextResponse } from 'next/server'
import { ScraperService } from '../../../lib/services/scraperService'

function validateUrl(u?: string) {
  if (!u) return false
  try {
    const parsed = new URL(u)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url') || ''
  const userAgent = req.nextUrl.searchParams.get('userAgent') || undefined

  if (!validateUrl(url))
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

  const service = new ScraperService()

  try {
    const payload = await service.scrape(url, userAgent)
    return NextResponse.json({
      title: payload.title,
      metaDescription: payload.metaDescription,
      h1: payload.h1,
      status: 200,
    })
  } catch (err: any) {
    if (err.name === 'TimeoutError')
      return NextResponse.json({ error: 'Timeout' }, { status: 504 })
    return NextResponse.json({ error: 'scrape failed' }, { status: 500 })
  }
}
