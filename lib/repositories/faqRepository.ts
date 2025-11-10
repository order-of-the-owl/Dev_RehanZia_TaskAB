import fs from 'fs/promises'
import path from 'path'


type Faq = { id: string; title: string; body: string }


export class FaqRepository {
    private filePath = path.join(process.cwd(), 'data', 'faqs.json')


    async getAll(): Promise<Faq[]> {
        const raw = await fs.readFile(this.filePath, 'utf-8')
        return JSON.parse(raw) as Faq[]
    }
}