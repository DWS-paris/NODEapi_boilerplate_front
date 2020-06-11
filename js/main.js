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

const login = (formTag, email, password) => {
    formTag.addEventListener('submit',  event => {
        event.preventDefault();

        new FETCHrequest(
            'http://localhost:6985/api/auth/register', 
            'POST', 
            { email, password }
        )
        .sendRequest()
        .then( apiResponse => {
            console.log(apiResponse)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        })
        .catch( apiResponse => {
            console.log(apiResponse)
        })
    })
}

const checkUser = () => {
    if( localStorage.getItem('email') && localStorage.getItem('password') ){
        new FETCHrequest(
            'http://localhost:6985/api/auth/register', 
            'POST', 
            { email: localStorage.getItem('email'), password: localStorage.getItem('password') }
        )
        .sendRequest()
        .then( apiResponse => {
            console.log(apiResponse)
            localStorage.setItem('email', email)
            localStorage.setItem('password', password)
        })
        .catch( apiResponse => {
            console.log(apiResponse)
        })
    }
    else{
        console.log('No localStorage')
    };
};

/* 
Start interface
*/
    document.addEventListener('DOMContentLoaded', () => {
        // Check user email/password
        checkUser();

        // Get form register
        register(
            document.querySelector('#formRegister'),
            document.querySelector('#name').value,
            document.querySelector('#email').value,
            document.querySelector('#password').value
        );

        // Get form login
        login(
            document.querySelector('#formLogin'),
            document.querySelector('#emailLogin').value,
            document.querySelector('#passwordLogin').value
        );
    });
//