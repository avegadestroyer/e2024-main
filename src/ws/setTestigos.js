// https://estudios024.azurewebsites.net/api/testigos
async function  setTestigos (testigo, token) {


    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/testigos`;
    

    
    let params = {
        "userid": testigo.userid,
        "usuarioid": testigo.userid,
        "direccion": testigo.direccion,
        "lat": testigo.lat,
        "lon": testigo.lon,
        "endireccion": testigo.endireccion,
        "estado": testigo.estado,
        "municipio" : testigo.municipio,
        "tipopublicidad": testigo.tipopublicidad,
        "img1": testigo.img1,
        "img2" : testigo.img2,
        "img3": testigo.img3,
        "img4": testigo.img4,
        "img5": testigo.img5,
        "img6": testigo.img6,
        "img7":testigo.img7,
        "img8" : testigo.img8,
        "img9": testigo.img9,
        "img10" : testigo.img10,
        "personaje": testigo.personaje,
        "categoria": testigo.categoria,
        "partidos": testigo.partidos,
        "lonRegistro" : testigo.longRegistro,
        "latRegistro" : testigo.latRegistro,
        "lat2" : testigo.lat2,
        "lon2" : testigo.lon2,
        "idreferencia" : testigo.idreferencia
    };

     console.log("params",params)

    let data = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Authorization": `Bearer ${token}`
            // Authorization: "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa"
        }),
        body: JSON.stringify(params)
    }
    
    let res = await fetch(url, data)
                    // .then((response) => console.log(response))
                    .then((response) => response.json())
                    .then(usuario => {
                            
                        return {
                            respuesta: usuario
                        }
                    })
                    .catch((error) => {
                        console.error("erro" + error);
                        return {
                            respuesta: error
                        }
                    });

    return res;
}

export {
    setTestigos
}