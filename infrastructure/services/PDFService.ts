import path from "path";
import fs from 'fs';
import { PDFDocument } from "pdf-lib";
export class PDFService {
    async fillPDF(fieldData: Record<string,string>): Promise<Uint8Array> {
        const templatePath = path.resolve('./public/template/template.pdf')
        const existingPdfBytes = fs.readFileSync(templatePath)
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        const form = pdfDoc.getForm()

        Object.keys(fieldData).forEach((key) => {
            const value = fieldData[key]
            const field = form.getTextField(key)
            if(field) field.setText(value)

        })

        // form.getTextField('nome').setText(document.nome)
        // form.getTextField('email').setText(document.email)
        // form.getTextField('valor').setText(document.valor)
    
        form.flatten()

        const pdfBytes = await pdfDoc.save()
        return pdfBytes

    }
}