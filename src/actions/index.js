export const authorization = (value) => { 
    return {
        type: 'SIGN_IN',
        payload: value
    }
}