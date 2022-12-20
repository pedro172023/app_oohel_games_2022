import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {
  transform(arreglo: any[], texto: string, columnas: any[]): any[] {
    if (texto == '') {
      return arreglo;
    }
    if (columnas.length == 0) {
      return arreglo;
    }
    texto = texto.toLowerCase()
    var results: any
    try {
      return arreglo.filter(item => {
        columnas.forEach((element, index) => {
          if (index == 0) {
            results = item[element].toLowerCase().includes(texto)
          } else {
            results = results || item[element].toLowerCase().includes(texto)
          }
        });
        return results
      })
    } catch (error) {
      return arreglo
    }
  }
}
