export const stateConditionString = state => {

    
    let navigateTo = '';
    if (state.isLoading) {
        
        navigateTo = 'LOAD_APP';
    }
    if (state.isSignedIn && state.isSignedOut) {
        // console.log("1")
        navigateTo = 'LOAD_SIGNOUT';
    }
    
    if (state.isSignedIn && state.userToken && state.isSignedUp) {
        // console.log("3")
        navigateTo = 'LOAD_HOME';
    }
    if (!state.isSignedUp && state.noAccount) {
        // console.log("4")
        navigateTo = 'LOAD_SIGNUP';
    }
    // if (!state.isSignedIn && !state.noAccount) {
    //     console.log("5")
    //     navigateTo = 'LOAD_SIGNIN';
    // }

    return navigateTo;
};