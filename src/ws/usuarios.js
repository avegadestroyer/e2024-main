function getUsuarios() {

    const prod ="https://redesclaudia.mx/service/api"
    //const develop ="https://estudios024.azurewebsites.net/api"
    
    const url = `${prod}/xUs`
    console.log(url)
    let data = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa"
        })
    }

    return fetch(url, data)
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
    getUsuarios
}