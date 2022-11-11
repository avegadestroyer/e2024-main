import catDistritoFederal from '../../../assets/json/catdistritofederal.json';
import catDistritoLocal from '../../../assets/json/catdistritolocal.json';

class Distritos {

  static instance = new Distritos();

   slugify = text => text
  .replace(/\s|_|\(|\)/g, " ")
  .normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .toUpperCase()

  getDistritosFederal = (estado, municipio) => {
    try
    {
      
        
        let estadoNorma = this.slugify (estado);
        let municipioNorma = this.slugify (municipio);
        console.log(estadoNorma)
        console.log(municipioNorma)
        let distritos = catDistritoFederal.filter(x=> x.entidad == estadoNorma &&  x.municipio == municipioNorma);

        return distritos;
    }
    catch(err) 
    {
        console.log("getDistritosFederal get err", err);
        throw Error(err);
    }
  }

  getDistritosLocal = (estado, municipio) => {
    try
    {
      let estadoNorma = this.slugify (estado);
        let municipioNorma = this.slugify (municipio);
        let distritos= catDistritoLocal.filter(x=> x.entidad == estadoNorma &&  x.municipio == municipioNorma) ;
        return distritos;
    }
    catch(err) 
    {
        console.log("getDistritosLocal get err", err);
        throw Error(err);
    }
  }
}

export default Distritos;