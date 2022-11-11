function getVersion() {

    const prod ="https://redesclaudia.mx/service/api"
    const develop ="https://estudios024.azurewebsites.net/api"

    const url = `${prod}/versionApp`
    let data = {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json'
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
    getVersion
}