/* 
Form methods
*/
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

    const addPost = (formTag, title, content, image) => {
        formTag.addEventListener('submit',  async event => {
            event.preventDefault();

            // Extract basse64 data
            const postImage = await extarctImage(image);

            new FETCHrequest(
                'http://localhost:6985/api/post', 
                'POST', 
                { title: title.value, content: content.value, image: await resizeImage(postImage.value) }
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
//

/* 
Content methods
*/
const extarctImage = (input) => {
    return new Promise( (resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        return resolve({ 
          value: reader.result, 
          filename: input.files[0].name, 
          filetype: input.files[0].type 
        })
      };
      reader.readAsDataURL(input.files[0]);
    });
  };

  const resizeImage = (base64Str, maxWidth = 300, maxHeight = 300) => {
    return new Promise((resolve) => {
      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        let canvas = document.createElement('canvas')
        const MAX_WIDTH = maxWidth
        const MAX_HEIGHT = maxHeight
        let width = img.width
        let height = img.height
  
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        canvas.width = width
        canvas.height = height
        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        return resolve(canvas.toDataURL())
      }
    })
  }
//




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
            document.querySelector('#image'),
        )
    });
//