const navMenu = document.querySelector("header#globalHeader img.nav");
const nav = document.querySelector("header#globalHeader div.nav");
const headerH1 = document.querySelector("header#globalHeader h1");

navMenu.onclick = function(){
    nav.classList.toggle("on");
}

var wait = false;

window.addEventListener("scroll", function(){
    if(!wait){
		wait = true;		
        setTimeout(function(){
			if(window.pageYOffset <= 50){
				console.log(-window.pageYOffset);
				headerH1.style.marginTop = - window.pageYOffset + "px";
				headerH1.style.opacity = 1-window.pageYOffset/50;
			}else{
				headerH1.style.marginTop = "-50px";
				headerH1.style.opacity = 0;
			}
            wait = false;
        }, 30);
    }
})