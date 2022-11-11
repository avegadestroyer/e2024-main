function setAdicional(persona) {


    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/datos`;
    

    let params = {
        "curp" : persona.curp,
        "celular" :persona.celular,
        "correo" :persona.correo,
        "redes": persona.redes,
        "twitter": persona.twitter,
        "linkedin": persona.linkedin,
        "instagram" : persona.instagram,
        "estado" : persona.estado,
        "municipio" : persona.municipio,
        "alcaldia": 0,
        "distritofederal": persona.distritofederal,
        "seccion ": persona.seccion,
        "calle" : persona.calle,
        "next" : persona.next,
        "nint" : persona.nint,
        "manzana" : persona.manzana,
        "lote" : "",
        "colonia" : "",
        "cp" : "",
        "categoria" : persona.categoria
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70; ARRAffinitySameSite=a6e48b9e9d2653435be7b61998d8624b44115214104213d6c8b8c526cc56dc70");
 console.log("params",params)
    // let data = {
    //     method: 'POST',
    //     headers: new Headers({
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         Authorization: "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa"
    //     }),
    //     body: JSON.stringify(params)
    // }


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(params),
        redirect: 'follow'
    };
    // console.log(data)
    return fetch(url, requestOptions)
        // .then(response => response.text())
        .then((response) => response.json())
        .then(usuario => {
                
            return {
                respuesta: usuario
            }
        })
        .catch((error) => {
            console.error("erro" + error);
        });
}

export {
    setAdicional
}