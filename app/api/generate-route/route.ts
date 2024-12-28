import { GenerateRoute } from '@/application/usecases/generate-route';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {  
  try {
  const formData = await req.formData();
  const origin = formData.get('origin') as string;
  const destination = formData.get('destination') as string;
  const waypoints = JSON.parse(formData.get('waypoints') as string);
  console.log(origin)
  const generateRoute = new GenerateRoute()
  const data = await generateRoute.execute(origin, destination, waypoints)
  console.log(data)

  return new NextResponse(data, {
    headers: {
      'Content-Type': 'application/json', // Altere se for outro tipo de dado
      'Content-Length': data.length.toString(),
    },
  });
  } catch (error) {
    console.error('Error generating Word document:', error);
    return NextResponse.json({ error: 'Error generating Word document' }, { status: 500 });
  }
}