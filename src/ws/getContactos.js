function getContactos(token) {


    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/persona`;
    

    

    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer AAAA829DuOc:APA91bGsoIydZYiYo7fFOPhgggMQxCRvDHp5t940f0dyj43M4sSQWTmzhsUlBNR3X65p72f4rMeJphmPxmsFqXqdsJRrCGg_18hpfD6QS33r_nNgpYxgOHzPVHPiziTk8GhcrjWF5pZa");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", token);
   console.log(url)
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
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log(requestOptions)
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
    getContactos
}