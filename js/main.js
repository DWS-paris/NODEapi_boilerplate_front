const register = (formTag, name, email, password) => {
    formTag.addEventListener('submit',  event => {
        event.preventDefault();

        new FETCHrequest(
            'http://localhost:6985/api/auth/register', 
            'POST', 
            { name: name.value, email: email.value, password: password.value }
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
            'http://localhost:6985/api/auth/login', 
            'POST', 
            { email: email.value, password: password.value }
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

const addPost = (formTag, title, content) => {
    formTag.addEventListener('submit',  event => {
        event.preventDefault();

        new FETCHrequest(
            'http://localhost:6985/api/post', 
            'POST', 
            { title: title.value, content: content.value }
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

const checkUser = () => {
    new FETCHrequest(
        'http://localhost:6985/api/auth/me', 
        'GET'
    )
    .sendRequest()
    .then( apiResponse => {
        console.log(apiResponse)
        document.querySelector('#formRegister').parentNode.classList.add('hide');
        document.querySelector('#formLogin').parentNode.classList.add('hide');
    })
    .catch( apiResponse => {
        console.log(apiResponse)
    });
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
            document.querySelector('#name'),
            document.querySelector('#email'),
            document.querySelector('#password')
        );

        // Get form login
        login(
            document.querySelector('#formLogin'),
            document.querySelector('#emailLogin'),
            document.querySelector('#passwordLogin')
        );

        // Get add post form submit
        addPost(
            document.querySelector('#formAddPost'),
            document.querySelector('#title'),
            document.querySelector('#content'),
        )
    });
//