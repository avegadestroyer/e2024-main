
import catSecciones from '../../../assets/json/catseccion.json'

class Secciones {

  static instance = new Secciones();

  slugify = text => text
  .replace(/\s|_|\(|\)/g, " ")
  .normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .toUpperCase()

  getSecciones = async (estado, municipio, distrito) => {
    try
    {
      let estadoNorma = this.slugify (estado);
      let municipioNorma = this.slugify (municipio);
      let distritoNorma = this.slugify (distrito);

     let lista= await catSecciones.filter(x=> x.entidad == estadoNorma &&  x.municipio == municipioNorma && x.distrito == distritoNorma);
      
      return lista;
    }
    catch(err) 
    {
        console.log("getSecciones get err", err);
        throw Error(err);
    }
  }
}

export default Secciones;