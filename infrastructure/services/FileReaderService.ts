/* eslint-disable @typescript-eslint/no-explicit-any */

import { Document } from '@/domain/document'

export class FileReaderService {
    parseFileBuffer(fileBuffer: Buffer): Record<string,string> {
        const content = fileBuffer.toString('utf-8')
        const lines = content.split('\n').map(line => line.trim());
        const data: Record<string,string> = {}

        lines.forEach((line: any) => {
            const [key, value] = line.split(':').map((item: any) => item.trim())
            if( key && value) data[key] = value
        })

        return data

        // return content.split('\n').map(line => line.trim())
    }

    parseLines(lines: string[]): Document {
        return Document.fromLines(lines)
    }
}