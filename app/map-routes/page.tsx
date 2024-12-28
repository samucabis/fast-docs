/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from "react";


import 'primeicons/primeicons.css';
        
import { Button } from 'primereact/button';

import { useRouter } from "next/navigation";
import 'primeicons/primeicons.css';
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
        
export default function UploadPage() {
  const router = useRouter();
  const [inputs, setInputs] = useState<string[]>([]);
  const [mapUrl, setMapUrl] = useState<string | null>(null);


  const handleSubmit = async () => {
    const origin = 'Rua Pinto Martins, 1146 - Aeroporto, Boa Vista - RR';
    let destination = ''
    const waypoints = []
    for (const waypoint of inputs) {
        if (destination === '') destination = waypoint
        waypoints.push(waypoint)
    }
    const formData = new FormData()
    formData.append('origin', origin)
    formData.append('destination', destination)
    formData.append('waypoints', JSON.stringify(waypoints))
    const response = await fetch('/api/generate-route', {
        method: 'POST',
        body: formData
      });
      console.log(response)
    if(response.ok){
        const blob = await response.blob();
        setMapUrl(URL.createObjectURL(blob));
    }
    // await handleFetch('/api/generate-form-acess', formData, 'Formulario de Acesso', setDocuments);

  }
//   const handleFetch = async (url: string, formData: FormData, documentName: string, setDocuments: React.Dispatch<React.SetStateAction<any[]>>) => {
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         body: formData
//       });
  
//       if (response.ok) {
//         const blob = await response.blob();
//         setDocuments(prevDocuments => [...prevDocuments, { url: URL.createObjectURL(blob), name: documentName }]);
//       } else {
//         alert(`Erro ao gerar PDF para ${documentName}`);
//       }
//     } catch (error) {
//       console.error(`Erro ao fazer fetch para ${documentName}:`, error);
//       alert(`Erro ao gerar PDF para ${documentName}`);
//     }
//   };


  const addNewInput = () => {
    // Adiciona um novo campo ao estado
    setInputs([...inputs, '']);
  };

  const handleInputChange = (index: number, value: string) => {
    // Atualiza o valor de um campo específico
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };

  return (
    <div className="flex flex-column w-full h-full">
      <div className="flex w-full gap-4 bg-cyan-900 justify-content-end align-items-center "> 
        <h3><Button>Gerar rotas</Button></h3>
        <h3 className=" m-0 mr-3 text-white font-medium ">{'nome do usuario'}</h3>
        <Button icon="pi pi-sign-out" label="Sair" rounded text className="text-white" onClick={() => {router.push('/')}}  aria-label="Logout" />
      </div>
      <div className="flex p-4 flex-column justify-content-center align-items-center w-full">
        <h2 className="align-self-start">Gerar rotas</h2>
        <div className="flex align-self-start gap-4">

        <Button type="button" onClick={addNewInput}>Novo endereço</Button>
        <Button type="button" onClick={handleSubmit}>Gerar Rota</Button>
        </div>
        
        <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <div className="card flex flex-column justify-content-center mt-4">
                {inputs.map((value, index) => (
                    <FloatLabel key={index} > 
                    <InputText
                        id={`input-${index}`}
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(index, e.target.value)
                        }
                    />
                    <label htmlFor={`input-${index}`}>Endereço {index + 1}</label>
                    </FloatLabel>
                ))}
            </div>
            <div className="flex"> 
            {mapUrl && <img src={mapUrl} alt="Mapa da Rota" />} </div>
        </form>     
        <div className="flex h-full justify-content-center align-items-center  w-full mt-8">
       
        </div>

      </div>
    </div>
  )

}

// className="mb-4">


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