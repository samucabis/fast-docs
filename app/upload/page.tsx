/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";


import 'primeicons/primeicons.css';
        
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { FileUpload } from 'primereact/fileupload';
        

interface document {
  url: string;
  name: string
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [documents, setDocuments] = useState<document[]>([])



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

    const response = await fetch('/api/generate-form-acess', {
      method: 'POST',
      body: formData
    })

    if (response.ok) {
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setDocuments([...documents, { url, name: 'Formulario de Acesso' }])
    } else {
      alert('Erro ao gerar PDF')
    }
  }

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
    <div className="flex flex-column justify-content-center align-items-center w-full">
      <h1 className="align-self-start">Upload do Arquivo de Texto</h1>
      <form className="flex w-full gap-2" onSubmit={handleSubmit}>
        {/* <input type="file" onChange={handleFileChange} accept=".txt" /> */}
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

        <Button type="submit">Gerar Acesso</Button>
        
        <Button type="button" onClick={
          async () => {
            if (!file) return alert('Selecione um arquivo')

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/generate-beneficiaries', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const blob = await response.blob()
              const url = URL.createObjectURL(blob)
              // setBeneficiariesUrl(url)
              setDocuments([...documents, { url, name: 'Lista de UC Participantes' }])
            } else {
              alert('Erro ao gerar PDF')
            }
          }} >Gerar Beneficiario</Button>
        
        <Button type="button" onClick={
          async () => {
            if (!file) return alert('Selecione um arquivo')

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/generate-procuration', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const blob = await response.blob()
              const url = URL.createObjectURL(blob)
              // setprocurationUrl(url)
              setDocuments([...documents, { url, name: 'Procuração' }])              
            } else {
              alert('Erro ao gerar PDF')
            }
          }} >Gerar Procuração</Button>
          
          <Button type="button" onClick={
          async () => {
            if (!file) return alert('Selecione um arquivo')

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/generate-dados-registro', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const blob = await response.blob()
              const url = URL.createObjectURL(blob)
              setDocuments([...documents, { url, name: 'Dados de Registro da Central Geradora' }])              

              // setprocurationUrl(url)
            } else {
              alert('Erro ao gerar PDF')
            }
          }} >Gerar Dados de Registro da Central Geradora</Button>
          
          <Button type="button" onClick={
          async () => {
            if (!file) return alert('Selecione um arquivo')

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/generate-descript-memorial', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const blob = await response.blob()
              const url = URL.createObjectURL(blob)
              // setprocurationUrl(url)
              setDocuments([...documents, { url, name: 'Memorial Descritivo' }])
            } else {
              alert('Erro ao gerar PDF')
            }
          }} >Gerar Memorial Descritivo</Button>
          
          <Button type="button" onClick={
          async () => {
            if (!file) return alert('Selecione um arquivo')

            const formData = new FormData()
            formData.append('file', file)

            const response = await fetch('/api/generate-up-carga', {
              method: 'POST',
              body: formData
            })

            if (response.ok) {
              const blob = await response.blob()
              const url = URL.createObjectURL(blob)
              // setprocurationUrl(url)
              setDocuments([...documents, { url, name: 'Levantamento de Carga' }])
            } else {
              alert('Erro ao gerar PDF')
            }
          }} >Gerar Levantamento de Carga</Button>
      </div>
      </form>     
      <div className="flex h-full mt-10">

      <div className="flex mt-8 bg-black-alpha-90 w-full">
            <DataTable value={documents} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Documento"></Column>
                <Column header="Download" body={body}></Column>
            </DataTable>
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