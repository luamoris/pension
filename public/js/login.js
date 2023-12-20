const formLogin = document.getElementById('formLogin')

formLogin.addEventListener('submit', event => {
   event.preventDefault()

   const email = formLogin.querySelector('[name="inLoginEmail"]').value
   const password = formLogin.querySelector('[name="inLoginPassword"]').value
   const formData = `inLoginEmail=${encodeURIComponent(email)}&inLoginPassword=${encodeURIComponent(password)}`

   const xhr = new XMLHttpRequest()
   xhr.open('POST', '/login', true)
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.onload = function () {
      if (xhr.status === 200) {
         window.location.replace("http://localhost/profile")
      } else {
         console.error('Error:', xhr.status, xhr.statusText)
      }
   };

   xhr.send(formData)
})