import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro.interface';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-libro-lista',
  imports: [],
  templateUrl: './libro-lista.component.html',
  styleUrl: './libro-lista.component.css'
})

export class LibroListaComponent implements OnInit {

  libros: Libro[] = [];
  libro!: Libro;

  constructor(private libroService: LibroService) {

  }

  ngOnInit(): void {
    this. CargarLibros();
    this.CargarLibroPorId(2);
  }

  // subscribbe() 
  CargarLibros() {
    this.libroService.ObtenerLibros().subscribe(
      {
        next: (response) => {
          // Si el response es True y si es un array
          if (response.success && Array.isArray(response.data)) {
            this.libros = response.data;
            console.log(this.libros);
          }
        },
        error: (err) => {

        }
      }
    );
  }


CargarLibroPorId(id: number) {
    this.libroService.ObtenerLibroPorId(id).subscribe(
      {
        next: (response) => {
          // Si el response es True y si es un array
          if (response.success && response.data) {
            this.libro = response.data as Libro;
            console.log(this.libro);
          }
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }


}
