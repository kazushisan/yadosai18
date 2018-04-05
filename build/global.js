const navMenu = document.querySelector("header#globalHeader img.nav");
const nav = document.querySelector("header#globalHeader div.nav");

navMenu.onclick = function(){
    nav.classList.toggle("on");
}