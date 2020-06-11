const register = (formTag, name, email, password) => {
    formTag.addEventListener('submit',  event => {
        event.preventDefault();

        new FETCHrequest(
            'http://localhost:6985/api/auth/register', 
            'POST', 
            { name, email, password }
        )
        .sendRequest()
        .then( apiResponse => {
            console.log(apiResponse)
        })
        .catch( apiResponse => {
            console.log(apiResponse)
        })
    })
    
}

/* 
Start interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Get form register
        register(
            document.querySelector('#formRegister'),
            document.querySelector('#name').value,
            document.querySelector('#email').value,
            document.querySelector('#password').value
        )
    })
//