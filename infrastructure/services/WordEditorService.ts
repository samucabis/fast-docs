
import Docxtemplater from 'docxtemplater';
import fs from 'fs';
import PizZip from 'pizzip';

export class WordEditorService {
    async editDocument(templatePath: string, data: Record<string,string>): Promise<Buffer> {

        const templateContent = fs.readFileSync(templatePath, 'binary')

        const zip = new PizZip(templateContent)

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            
        })
        doc.render(data)

        const modifiedDoc = doc.getZip().generate({
            type: 'nodebuffer',
            compression: 'DEFLATE'
        })

        return modifiedDoc

    }

    saveDocument(outputFilePath: string, data: Buffer): void {
        fs.writeFileSync(outputFilePath, data)
    }
}