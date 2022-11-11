
import catUsuarios from '../../assets/json/usuarios.json'

class Usuarios {

  static instance = new Usuarios();

  getUsuarios = (usuario, password) => {
    try
    {
        let usuarioLogin = catUsuarios.find(mun => mun.usuario == usuario && mun.password==password);
        return usuarioLogin;
    }
    catch(err) 
    {
        console.log("storage get err", err);
        throw Error(err);
    }
  }
}

export default Usuarios;