import { DirectionsResponse, RouteResponse } from '@/domain/models/map-routes';
import axios from 'axios';
import path from 'path';
// import dotenv from 'dotenv';

export class GenerateRoute {


async execute (
    origin: string,
    destination: string,
    waypoints: string[]
  ): Promise<Buffer<ArrayBufferLike>> {
    try {
      const apiDirectionKey = process.env.NEXT_PUBLIC_DIRECTION_KEY as string;
      if (!apiDirectionKey) {
        throw new Error('API key não encontrada no arquivo .env');
      }
      console.log(origin, destination, waypoints)
      const directionsBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json';
  
      // 1. Obter os dados da rota pela Directions API
      const directionsParams = {
        origin,
        destination,
        waypoints: waypoints.length > 0 ? `optimize:true|${waypoints.join('|')}` : undefined,
        key: apiDirectionKey,
      };
  
      const { data: directionsData } = await axios.get<DirectionsResponse>(directionsBaseUrl, {
        params: directionsParams,
      });
  
      const routes = directionsData.routes;
      if (routes.length === 0) {
        console.error('Nenhuma rota encontrada.');
        return;
      }
  
      const bestRoute = routes[0];
      console.log('Resumo da Rota:', bestRoute.summary);
      const mapImage = await this.getmap(bestRoute, waypoints, destination, origin);
      return mapImage;
    } catch (error) {
      console.error('Erro ao calcular rota e gerar mapa:', error instanceof Error ? error.message : error);
    }
  };

  async getmap(bestRoute: RouteResponse, waypoints: string[], destination: string, origin: string){
          // 2. Criar uma URL para Static Maps API
          const apiMapsKey = process.env.NEXT_PUBLIC_MAP_STATIC as string;
          const staticMapsBaseUrl = 'https://maps.googleapis.com/maps/api/staticmap';
          
          const routePolyline = bestRoute.overview_polyline.points; // Polyline da rota
          const staticMapParams = {
            size: '800x600', // Tamanho da imagem (largura x altura)
            path: `enc:${routePolyline}`, // Caminho codificado da rota
            key: apiMapsKey,
            markers: [
              `color:red|label:S|${origin}`,
              ...waypoints.map((point, index) => `color:blue|label:${String.fromCharCode(65 + index)}|${point}`),
              `color:green|label:E|${destination}`,
            ].join('&'),
          };
      
          const staticMapUrl = `${staticMapsBaseUrl}?${new URLSearchParams(staticMapParams).toString()}`;
      
          // 3. Fazer download da imagem
          const { data: mapImage } = await axios.get<ArrayBuffer>(staticMapUrl, {
            responseType: 'arraybuffer',
          });
          const imagePath = path.resolve(__dirname, `file-${new Date().getTime()}.png`);
        //   fs.writeFileSync(imagePath, Buffer.from(mapImage));
          console.log(`Mapa da rota salvo como "${imagePath}-${new Date().getTime()}".`);
          return Buffer.from(mapImage);
  }
}