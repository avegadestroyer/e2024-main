
import catMunicipios from '../../../assets/json/municipios.json'

class Municipios {

  static instance = new Municipios();

  slugify = text => text
  .replace(/\s|_|\(|\)/g, " ")
  .normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .toUpperCase()


  getMunicipios = (estado) => {
    try
    {
        let estadoNorma = this.slugify (estado);
        console.log("estadoNorma", estadoNorma)
        let municipios_listado = catMunicipios.filter(mun => mun.estado ==estadoNorma);
        return municipios_listado;
    }
    catch(err) 
    {
        console.log("getMunicipios get err", err);
        throw Error(err);
    }
  }
}

export default Municipios;