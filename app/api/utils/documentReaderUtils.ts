import { format } from "date-fns";


export async function LoadData(file: Blob, isProcuration: boolean = false){
    const buffer = Buffer.from(await file.arrayBuffer());
    const content = buffer.toString('utf-8');
    
    const lines = content.split('\n').map(line => line.trim());
    const data: Record<string, string> = {};
    
    lines.forEach(line => {
      const [key, value] = line.split(':').map(part => part.trim());
      if (key && value) {
        if(isProcuration && (key === 'Nome' || key === 'Logradouro' || key === 'Bairro')){ 
          data[key] = value.toUpperCase(); 
        }
        else data[key] = value;
      }
      if(key && value === undefined){
        data[key] = '';
      }
    });
    
    data['Menor'] = await calculateLowestValue(data['Instalada'], data['Pot_inversor']) //Number(data['Instalada']) < Number(data['Pot_inversor']) ? data['Instalada'] : data['Pot_inversor'];
    const today = new Date();
    const formattedDate = format(today, 'dd/MM/yyyy');
    data['Hoje'] = formattedDate;
    return data
}
async function calculateLowestValue(instalada: string, pot_inversor: string){
    let menor = '0'  
    if(isNaN(Number(instalada)) || isNaN(Number(pot_inversor))){
      menor = Number(instalada.replace(',', '.')) < Number(pot_inversor.replace(',', '.')) ? instalada : pot_inversor;
    } else {
      menor = Number(instalada) < Number(pot_inversor) ? instalada : pot_inversor;
    }
      return menor;

}