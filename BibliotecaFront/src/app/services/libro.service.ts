import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { LibroResponse } from '../models/libro.interface';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LibroService {

  //private apiUrl = environment.apiUrl + '/libros';
  private api = `${environment.apiUrl}/libros`;

  constructor(private http: HttpClient) { }

  // LLAMADA A LAS RUTAS DE LOS ENDPOINTS   

  ObtenerLibros(): Observable<LibroResponse> {
    return this.http.get<LibroResponse>(this.api);
  }

  ObtenerLibroPorId(id: number): Observable<LibroResponse> {
    return this.http.get<LibroResponse>(`${this.api}/${id}`);
  }
}
