export const reducer = (prevState, action) => {
    console.log("prevState ", JSON.stringify(prevState))
    console.log("action " , JSON.stringify(action))

    switch (action.type) {
        case 'TO_SIGNUP_PAGE':
            return {
                ...prevState,
                isLoading: false,
                    isSignedUp: false,
                    noAccount: true,
            };
        case 'TO_SIGNIN_PAGE':
            return {
                ...prevState,
                isLoading: false,
                    isSignedIn: false,
                    noAccount: false,
            };
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                    isLoading: false,
            };
        case 'SIGNED_UP':
            return {
                ...prevState,
                isSignedIn: true,
                    isSignedUp: true,
                    isLoading: false,
                    userToken: action.token,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignedOut: false,
                    isSignedIn: true,
                    isSignedUp: true,
                    userToken: action.token,
            };
        case 'SIGN_OUT':

            return {
                ...prevState,
                isSignedOut: true,
                    userToken: null,
            };

        case 'LOAD_APP':
            return {
                ...prevState,
                isLoading: true,
                    userToken: null,
            };
    }
};

export const initialState = {
    isLoading: true,
    isSignedOut: false,
    isSignedUp: false,
    noAccount: false,
    isSignedIn: false,
    userToken: null,
    postulantes: null,
};