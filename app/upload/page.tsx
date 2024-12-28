/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";


import 'primeicons/primeicons.css';
        
import { useRouter } from "next/navigation";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from 'primereact/fileupload';
        
                        

interface document {
  url: string;
  name: string
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [documents, setDocuments] = useState<document[]>([])
  const router = useRouter();
  const [empresa, setEmpresa] = useState<string>('TechFrio');


  const onUpload = (e: any) => {
    const file = e.files[0];  // Pega o primeiro arquivo selecionado
    // setUploadedFile(file);
    setFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    if (!file) return alert('Selecione um arquivo')

    const formData = new FormData()
    formData.append('file', file)

    await handleFetch('/api/generate-form-acess', formData, 'Formulario de Acesso', setDocuments);

  }

  const handleDownloadAll = () => {
    documents.forEach(doc => {
      fetch(doc.url).then(response => response.blob()).then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        a.click();
      });
    });
  };

  const handleFetch = async (url: string, formData: FormData, documentName: string, setDocuments: React.Dispatch<React.SetStateAction<any[]>>) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const blob = await response.blob();
        setDocuments(prevDocuments => [...prevDocuments, { url: URL.createObjectURL(blob), name: documentName }]);
      } else {
        alert(`Erro ao gerar PDF para ${documentName}`);
      }
    } catch (error) {
      console.error(`Erro ao fazer fetch para ${documentName}:`, error);
      alert(`Erro ao gerar PDF para ${documentName}`);
    }
  };

  const body = (rowData: document) => {
    return (
      <Button icon="pi pi-download" onClick={() => {
        fetch(rowData.url).then(response => response.blob()).then(blob => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = rowData.name
          a.click()
        })
      }} />
    )
  }

  return (
    <div className="flex flex-column w-full h-full">
      <div className="flex w-full gap-4 bg-cyan-900 justify-content-between align-items-center ">
        <div className="flex align-items-center gap-4 ml-4">
          <Dropdown emptyMessage="Selecione uma empresa" placeholder="Selecione uma empresa" value={empresa}                               
          options={[{ label: 'TechFrio', value: 'TechFrio' }, { label: '+Solar', value: '+Solar' }]} 
          onChange={(e) => setEmpresa(e.value)}
          />
        </div> 
        <div className="flex align-items-center gap-4">
          <h3><Button>Gerar rotas</Button></h3>
          <h3 className=" m-0 mr-3 text-white font-medium ">{'nome do usuario'}</h3>
          <Button icon="pi pi-sign-out" label="Sair" rounded text className="text-white" onClick={() => {router.push('/')}}  aria-label="Logout" />
        </div>
      </div>
      <div className="flex p-4 flex-column justify-content-center align-items-center w-full">
        <h2 className="align-self-start">Arquivo com as variáveis</h2>
        <h3>Gerando arquivos para {empresa}</h3>
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
          <div className="flex  w-full">
          <FileUpload className="w-full"
          name="file"
          customUpload
          accept=".txt"
          maxFileSize={10000000} 
          auto
          chooseLabel="Selecione um arquivo"
          uploadLabel="Carregar"
          onSelect={onUpload}
          emptyTemplate={<p className="m-0">Arraste e solte um arquivo aqui ou clique para fazer upload.</p>}
        />
          </div>
        <div className="flex flex-column gap-2 w-full">
          <div className="flex gap-2">
            <Button className="w-full" type="submit">Gerar Acesso</Button>
            
            <Button className="w-full" type="button" onClick={
              async () => {
                if (!file) return alert('Selecione um arquivo')

                const formData = new FormData()
                formData.append('file', file)
                await handleFetch('/api/generate-beneficiaries', formData, 'Lista de UC Participantes', setDocuments);
              }} >Gerar Beneficiario</Button>
          </div>
          <div className="flex gap-2">        
          <Button className="w-full" type="button" onClick={
            async () => {
              if (!file) return alert('Selecione um arquivo')

              const formData = new FormData()
              formData.append('file', file)

              await handleFetch('/api/generate-procuration', formData, 'Procuração', setDocuments);

            }} >Gerar Procuração</Button>          
            <Button className="w-full" type="button" onClick={
            async () => {
              if (!file) return alert('Selecione um arquivo')

              const formData = new FormData()
              formData.append('file', file)
              await handleFetch('/api/generate-dados-registro', formData, 'Dados de Registro da Central Geradora', setDocuments);

            }} >Gerar Dados de Registro da Central Geradora</Button>
          </div>    
          <div className="flex gap-2">
            <Button className="w-full" type="button" onClick={
            async () => {
              if (!file) return alert('Selecione um arquivo')
              const formData = new FormData()
              formData.append('file', file)
              await handleFetch('/api/generate-descript-memorial', formData, 'Memorial Descritivo', setDocuments);

            }} >Gerar Memorial Descritivo</Button>          
            <Button className="w-full" type="button" onClick={
            async () => {
              if (!file) return alert('Selecione um arquivo')
              const formData = new FormData()
              formData.append('file', file)
              await handleFetch('/api/generate-up-carga', formData, 'Levantamento de Carga', setDocuments);
            }} >Gerar Levantamento de Carga</Button>          
          </div>
          <Button className="w-full justify-content-center" type="button" onClick={async ()=>{
            if (!file) return alert('Selecione um arquivo')
              const formData = new FormData()
              formData.append('file', file)
              await handleFetch('/api/generate-form-acess', formData, 'Formulario de Acesso', setDocuments);
              await handleFetch('/api/generate-beneficiaries', formData, 'Lista de UC Participantes', setDocuments);
              await handleFetch('/api/generate-procuration', formData, 'Procuração', setDocuments);
              await handleFetch('/api/generate-dados-registro', formData, 'Dados de Registro da Central Geradora', setDocuments);
              await handleFetch('/api/generate-descript-memorial', formData, 'Memorial Descritivo', setDocuments);
              await handleFetch('/api/generate-up-carga', formData, 'Levantamento de Carga', setDocuments);
          }} >Gerar Todos</Button>    
        </div>
        </form>     
        <div className="flex h-full justify-content-center align-items-center  w-full mt-8">
        <div className="flex justify-content-center align-items-center flex-column w-full">
          <h3> Documentos gerados </h3>
          <div className="flex flex-column">
          <Button className="flex w-max mb-2 align-self-end gap-2" onClick={handleDownloadAll}>
            Download All <i className="pi pi-download" ></i>
            </Button>  
              <DataTable className="flex justify-content-center w-full" emptyMessage={"Sem documentos"} value={documents} tableStyle={{ minWidth: '50rem' }}>
                  <Column field="name" header="Documento"></Column>
                  <Column header="Download" body={body}></Column>
              </DataTable>
          </div>
          </div>
        </div>

      </div>
    </div>
  )

}




      {/* {pdfUrl && (
        <div>
          <h2>Download do Formulario de Acesso</h2>
          <a href={pdfUrl} download="01 Formulário de Solicitação de Acesso.docx">Baixar Formulario de acesso</a>
        </div>
      )}
      {beneficiariesUrl && (<div>
          <h2>Download do documento de beneficiarios</h2>
          <a href={beneficiariesUrl} download="09 Lista de UC Participantes.docx">Baixar Documento</a>
        </div>)}
        {procurationUrl && (<div>
          <h2>Download da Procuração</h2>
          <a href={procurationUrl} download="Procuração.docx">Baixar Procuração</a>
        </div>)} */}