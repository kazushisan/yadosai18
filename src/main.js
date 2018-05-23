window.onload = () => {
	const navMenu = document.querySelector("header#globalHeader img.nav");
	const nav = document.querySelector("header#globalHeader div.nav");
	const headerH1 = document.querySelector("header#globalHeader h1");
	
	console.log(navMenu);
	
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
}



import axios from 'axios';
import Vue from 'vue';
// import VueRouter from 'vue-router';

// Vue.use(VueRouter);


var app = new Vue({
	el: '#app',
	data: {
		"booth": "",
		"showBoothWindow": false,
		"booths": [],
		"stage": [],
		"query": '',
		"sample": '',
		"location": "メインステージ",
		"isSelectedLocation": false
	},
	mounted(){
		axios.get("./data/data.json").then(response => {
			this.booths = response.data.booths;
			this.stage = response.data.stage;		
		})
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
		},
		scheduleForLocation1: function(){
			let stage = this.stage;
			let location = this.location;
			var modifiedArray = stage.day1.find(function(object){
				if(object.title == location){
					return true;
				}
			})
			modifiedArray.events.forEach(event => {
				if(event.hasOwnProperty("end_time")){
					event.time = event.start_time + ' - ' + event.end_time;
				} else {
					event.time = event.start_time;
				}
			});
			return modifiedArray;
		},
		scheduleForLocation2: function(){
			let stage = this.stage;
			let location = this.location;
			var modifiedArray = stage.day2.find(function(object){
				if(object.title == location){
					return true;
				}
			})
			modifiedArray.events.forEach(event => {
				if(event.hasOwnProperty("end_time")){
					event.time = event.start_time + ' - ' + event.end_time;
				} else {
					event.time = event.start_time;
				}
			});
			return modifiedArray;
		}
	},
	methods: {
		setLocation: function(location){
			this.location = location;
		},
		setBooth: function(booth){
			this.booth = booth;
			this.showBoothWindow = true;
		},
		closeBoothWindow: function(){
			this.showBoothWindow = false;
		},
		setQuery: function(query){
			this.query = query;
			window.scroll(0,0);
			this.showBoothWindow = false;
		},
		isColor: function(location){
			var result = [];
			if(this.location == location){
				result.push({selected: true});
			}
			return result;
		}
	}
})
