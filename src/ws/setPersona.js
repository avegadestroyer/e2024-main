async function  setPersona (persona) {

    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/persona`;
    
    let params = {
        "userid": persona.userid,
        "usuarioid": persona.userid,
        "curp": persona.curp,
        "nombre": persona.nombre,
        "primerap": persona.primerap,
        "segundoap": persona.segundoap,
        "genero": persona.genero,
        "lugarnacimiento": persona.lugarnacimiento,
        "fechanacimiento" : persona.fechanacimiento,
        "claveelector": persona.claveelector,
        "cargo": persona.cargo,
        "imagen": persona.imagen,
        "estado" : persona.estado,
        "municipio": persona.municipio,
        "distritofederal": persona.distritofederal,
        "seccion": persona.seccion,
        "responsabilidad": persona.responsabilidad,
        "otro":persona.otro,
        "distritolocal" : persona.distritofederal 
    };

    // console.log("params",params)

    let data = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa"
        }),
        body: JSON.stringify(params)
    }
    console.log(data)
    let res = await fetch(url, data)
                    .then((response) => response.json())
                    .then(usuario => {
                            
                        return {
                            respuesta: usuario
                        }
                    })
                    .catch((error) => {
                        console.error("erro" + error);
                    });

    return res;
}

export {
    setPersona
}