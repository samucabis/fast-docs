export interface DirectionsResponse {
    routes: RouteResponse[];
  }

export interface RouteResponse {
    overview_polyline: {
      points: string;
    };
    summary: string;
  }