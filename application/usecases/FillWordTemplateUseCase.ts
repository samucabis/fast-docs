import path from 'path';
import { WordEditorService } from '../../infrastructure/services/WordEditorService';


export class FillWordTemplateUseCase {
    private wordEditorService : WordEditorService
    constructor(wordEditorService :WordEditorService){
        this.wordEditorService = wordEditorService
    }

    async execute(data:Record<string,string>, template: string): Promise<Buffer>{
        switch(template){
            case 'acesso':
                const templatePath = path.resolve('./public/template/template-form-acesso.docx')
                const modifiedDoc = await this.wordEditorService.editDocument(templatePath,data)
                return modifiedDoc
            case 'beneficiarios':
                const templateBeneficiarios = path.resolve('./public/template/template-beneficiarios.docx')
                const modifiedDocBeneficiarios = await this.wordEditorService.editDocument(templateBeneficiarios,data)
                return modifiedDocBeneficiarios
            case 'procuration':
                const templateProcuration = path.resolve('./public/template/template-procuration.docx')
                const modifiedDocProcuration = await this.wordEditorService.editDocument(templateProcuration,data)
                return modifiedDocProcuration
            case 'memory-description':
                const templateMemoryDescription = path.resolve('./public/template/template-memory-description.docx')
                const modifiedDocMemoryDescription = await this.wordEditorService.editDocument(templateMemoryDescription,data)
                return modifiedDocMemoryDescription
            case 'up-carga':
                const templateUpCarga = path.resolve('./public/template/template-up-carga.docx')
                const modifiedDocUpCarga = await this.wordEditorService.editDocument(templateUpCarga,data)
                return modifiedDocUpCarga
            case 'dados-registro':
                const templateDadosRegistro = path.resolve('./public/template/template-dados-registro.docx')
                const modifiedDocDadosRegistro = await this.wordEditorService.editDocument(templateDadosRegistro,data)
                return modifiedDocDadosRegistro
            default:
                throw new Error('Template não encontrado')
        }
      
    }
}