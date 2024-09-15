import { FillPDFUseCase } from "@/application/usecases/FillPDFUseCase";
import { FileReaderService } from "@/infrastructure/services/FileReaderService";
import { PDFService } from "@/infrastructure/services/PDFService";
import { NextResponse } from "next/server";


// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if(!file) return NextResponse.json({ error: 'Arquivo não enviado' }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileReaderService  = new FileReaderService();
    const pdfService = new PDFService();
    const fillPDFUseCase = new FillPDFUseCase(fileReaderService, pdfService);

    try{
        const pdfBytes = await fillPDFUseCase.execute(buffer);

        return new NextResponse(new Blob([pdfBytes], { type: 'application/pdf' }), {
            headers: {
                'Content-Disposition': 'attachment; filename="file.pdf"',
                'Content-Type': 'application/pdf',
            },
        })

    }catch(error) {
        console.log(error)
        return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 });
    }
}