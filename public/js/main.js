// Cookie

function checkCookie(title) {
   const cookies = document.cookie.split(';');
   for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === title) {
         return true;
      }
   }
   return false;
}

// HTML
const avatar = document.getElementById("avatar")
const login = document.getElementById("hLogin")
const unlogin = document.getElementById("hUnlogin")

console.log(checkCookie("user"))

if (checkCookie("user")) {
   avatar.classList.remove("_none")
   unlogin.classList.remove("_none")
   login.classList.add("_none")
} else {
   if (!avatar.classList.contains("_none")) {
      avatar.classList.add("_none")
      unlogin.classList.add("_none")
      login.classList.remove("_none")
   }
}