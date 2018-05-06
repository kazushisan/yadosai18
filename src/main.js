import axios from 'axios'

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const navMenu = document.querySelector("header#globalHeader img.nav");
const nav = document.querySelector("header#globalHeader div.nav");
const headerH1 = document.querySelector("header#globalHeader h1");

navMenu.onclick = function(){
    nav.classList.toggle("on");
}

//スクロールに応じてヘッダーを変更
var wait = false;

window.addEventListener("scroll", function(){
    if(!wait){
		wait = true;		
        setTimeout(function(){
			if(window.pageYOffset <= 50){
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

var vm = new Vue({
	el: '#app',
	data: {
		"booths": [],
		"query": ""
	},
	mounted(){
		axios.get("./data/booth.json").then(response => { this.booths = response.data.booths })
	},
	computed: {
		boothsResult: function(){
			let booths = this.booths;
			let queryArray = this.query.toLowerCase().split(/\s|　/);
			return booths.filter(booth => (
				queryArray.every(function(query){
					if(booth.title.toLowerCase().indexOf(query) != -1){
						return true;
					} else if(booth.group.toLowerCase().indexOf(query) != -1){
						return true;
					} else if(booth.product.toLowerCase().indexOf(query) != -1){
						return true;
					} else if(booth.description.toLowerCase().indexOf(query) != -1){
						return true;
					} else if(booth.open.some(text => text.toLowerCase().indexOf(query) != -1)){
						return true;
					} else if(booth.category.some(text => text.toLowerCase().indexOf(query) != -1)){
						return true;
					} else {
						return false;
					}
				})
			));
		}
	}
})
