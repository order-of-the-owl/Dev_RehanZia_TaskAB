import { chromium } from 'playwright'

export class ScraperService {
    async scrape(url: string, userAgent?: string) {
        const browser = await chromium.launch({ headless: true })
        const context = await browser.newContext({
            userAgent: userAgent ?? 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        const page = await context.newPage()
        try {
            const timeout = 30000
            await page.goto(url, { waitUntil: 'networkidle', timeout })
            
            const h1Elem = page.locator('h1').first()
            const h1 = (await h1Elem.count()) > 0 ? (await h1Elem.innerText()).trim() : ''

            const metaElem = page.locator('meta[name="description"]')
            const metaDescription = (await metaElem.count()) > 0 
                ? (await metaElem.getAttribute('content')) || '' 
                : ''

            const title = (await page.title()) || ''

            return { title, metaDescription, h1 }
        } catch (err: any) {
            if (err.name === 'TimeoutError') err.name = 'TimeoutError'
            throw err
        } finally {
            await browser.close()
        }
    }
}
