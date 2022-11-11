function login(usuario,password) {
    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/login`;
    //lc = "b8b04be4fbb545cdaf78883d147f1a48"
    let data = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }),
        body: JSON.stringify({
            "username": usuario,
            "password": password
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
    login
}