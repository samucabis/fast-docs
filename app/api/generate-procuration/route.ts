import { FillWordTemplateUseCase } from '@/application/usecases/FillWordTemplateUseCase';
import { WordEditorService } from '@/infrastructure/services/WordEditorService';
import { NextResponse } from 'next/server';
import { LoadData } from '../utils/documentReaderUtils';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const data = await LoadData(file, true);

  const wordEditorService = new WordEditorService();
  const fillWordTemplateUseCase = new FillWordTemplateUseCase(wordEditorService);

  try {
    const wordBuffer = await fillWordTemplateUseCase.execute(data, 'procuration');

    return new NextResponse(new Blob([wordBuffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="filled.docx"',
      },
    });
  } catch (error) {
    console.error('Error generating Word document:', error);
    return NextResponse.json({ error: 'Error generating Word document' }, { status: 500 });
  }
}