import { FileReaderService } from "@/infrastructure/services/FileReaderService";
import { PDFService } from "@/infrastructure/services/PDFService";



export class FillPDFUseCase {
    private fileReaderService: FileReaderService;  
    private pdfService: PDFService;

    constructor(fileReaderService: FileReaderService, pdfService: PDFService) {
        this.fileReaderService = fileReaderService;
        this.pdfService = pdfService;
    }

    async execute(fileBuffer: Buffer): Promise<Uint8Array> {
        // const lines = this.fileReaderService.parseFileBuffer(fileBuffer)
        // const document = this.fileReaderService.parseLines(lines)
        const fieldData = this.fileReaderService.parseFileBuffer(fileBuffer);
        const pdfBytes = await this.pdfService.fillPDF(fieldData);
        return pdfBytes;
    }
}