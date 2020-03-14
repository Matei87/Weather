"use strict";

window.addEventListener('load', () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector('.temperature-description');
        let temperatureDegree = document.querySelector('.temperature-degree');
        let locationTimezone = document.querySelector('.location-timezone');
        let iconsSet = document.querySelector('.icon');
        let temperatureSection = document.querySelector('.temperature');
        const temperatureSpan = document.querySelector('.temperature span');
        let humiditySection = document.querySelector('.humidity');
        let precipitatiiSection = document.querySelector('.precipitatii');
        let tipPrecipitatii = document.querySelector('.tip-precipitatii');
        let vant = document.querySelector('.vant');
        let temperaturaMaxima = document.querySelector('.maxima');
        let temperaturaMinima = document.querySelector('.minima');
        let uv = document.querySelector('.uv-index');
        let vizibilitate = document.querySelector('.vizibilitate');
        let timp = document.querySelector('.timp');
        let sumar = document.querySelector('.summary');


        if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position => {
                    long = position.coords.longitude;
                    lat = position.coords.latitude;

                    //const proxy = "https://cors-anywhere.herokuapp.com/";
                        const proxy = "http://ipinfo.io/json";
                    const api = `${proxy}https://api.darksky.net/forecast/d752ff602d7b3ef048b346636958fc67/${lat},${long}`;

                    fetch(api)
                        .then( res => res.json())
                        .then( data => {
                            
                        const {temperature, summary, icon, humidity, precipProbability, precipType, windSpeed, uvIndex, visibility, time} = data.currently;
                        const {temperatureMin, temperatureMax} = data.daily.data[0];
                        const suma = data.daily.summary;

                        //Set DOM elements from API
                            temperatureDegree.textContent = Math.round((temperature - 32) * (5 / 9)) + '°';
                            locationTimezone.textContent = data.timezone;
                            temperatureDescription.textContent = summary;
                            humiditySection.textContent = 'Umiditate: ' + Math.round(humidity * 100) + '%';
                            precipitatiiSection.textContent = 'Precipitatii: ' + precipProbability * 100 + '%';
                            let znow = `<i class="fas fa-snowflake"></i>`;
                            let rein = `<i class="fas fa-tint"></i>`;
                            if (precipType === undefined) {
                                tipPrecipitatii.textContent = 'Tip Precipitatii: ' + '-';
                            } if (precipType === 'rain'){
                                tipPrecipitatii.innerHTML = 'Tip Precipitatii: ' + rein;
                            } else if (precipType === 'snow') {
                                tipPrecipitatii.innerHTML = 'Tip Precipitatii: ' + znow;
                            }

                            vant.textContent = 'Viteza vant: ' + Math.round(windSpeed * 1.6) + ' km/h';
                            temperaturaMaxima.textContent = Math.round((temperatureMax - 32) * (5 / 9)) + '°';
                            temperaturaMinima.textContent = Math.round((temperatureMin - 32) * (5 / 9)) + '°' + '/ ';
                            if (uvIndex <=2){
                                uv.style.backgroundColor = 'green';
                            } else if (3 >= uvIndex <= 5){
                                uv.style.backgroundColor = 'yellow';
                            } else if (6 >= uvIndex <= 7){
                                uv.style.backgroundColor = 'orange';
                            } else if (8 >= uvIndex <= 10){
                                uv.style.backgroundColor = 'red';
                            } else if (uvIndex >= 11){
                                uv.style.backgroundColor = 'blueviolet';
                            }
                            uv.textContent = 'UV Index: ' + uvIndex;
                            vizibilitate.textContent = 'Vizibilitate: ' + Math.round(visibility) + '+ km';

                            let unix_timestamp = time;
                            let date = new Date(unix_timestamp * 1000);
                            let showDay = date.getDate();
                            let days = ['Duminica', 'Luni',  'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
                            let showDays = days[date.getDay()];
                            let months = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
                            let showMonth = months[date.getMonth()];
                            let formatDay = showDay + ' ' + showMonth;
                            timp.textContent = showDays + ' ' + formatDay;

                            //Forecast
                            sumar.textContent = suma;

                            //temperaturi sumar Vant precipitatii Vizibilitate UVIndex zile iconite

                            //Temperatura Minima & Maxima
                            (function temperaturi() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let tempMin = Math.round((data.daily.data[i].temperatureMin - 32) * (5 / 9)) + '°'  + '/ ';
                                    let tempMax = Math.round((data.daily.data[i].temperatureMax - 32) * (5 / 9)) + '°';
                                    let str = i.toString();
                                    $('.forecast-minima' + i).html(tempMin);
                                    $('.forecast-maxima' + i).html(tempMax);
                                    
                                };
                            })();

                            //Sumar
                            (function summar() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let str = i.toString();
                                    $('.forecast-summary' + i).html(data.daily.data[i].summary);
                                    
                                }
                            } )();

                            //Vant
                            (function vant() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let vant = Math.round(data.daily.data[i].windSpeed * 1.6);
                                    let str = i.toString();
                                    $('.forecast-vant' + i).html('Viteza vant: ' + vant + ' km/h');
                                    
                                }
                            } )();

                            //Precipitatii
                            (function precipitatii() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let znow = `<i class="fas fa-snowflake"></i>`;
                                    let rein = `<i class="fas fa-tint"></i>`;
                                    let precipitatii = data.daily.data[i].precipType;
                                    let str = i.toString();
                                    if (precipitatii === undefined) {
                                        $('.forecast-precipitatii' + i).html('Tip Precipitatii: ' + '-');
                                    } else if (precipitatii === 'rain'){
                                        $('.forecast-precipitatii' + i).html('Tip Precipitatii: ' + rein);
                                    } else if (precipitatii === 'snow') {
                                        $('.forecast-precipitatii' + i).html('Tip Precipitatii: ' + znow);
                                    }
                                    
                            } })();

                            //Vizibilitate
                            (function vizibilitate() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let vizibilitate = Math.round(data.daily.data[i].visibility);
                                    let str = i.toString();
                                     $('.forecast-vizibilitate' + i).html('Vizibilitate: ' + vizibilitate + '+ km');
                                    
                                } })();

                            //UV Index
                            (function uvIndex() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let uvindex = data.daily.data[i].uvIndex;
                                    let str = i.toString();
                                    if (uvindex <=2){
                                        $('.forecast-uv-index' + i).css('background', 'green');
                                    } else if (3 >= uvindex <= 5){
                                        $('.forecast-uv-index' + i).css('background', 'yellow');
                                    } else if (6 >= uvindex <= 7){
                                        $('.forecast-uv-index' + i).css('background', 'orange');
                                    } else if (8 >= uvindex <= 10){
                                        $('.forecast-uv-index' + i).css('background', 'red');
                                    } else if (uvindex >= 11){
                                        $('.forecast-uv-index' + i).css('background', 'blueviolet');
                                    }
                                    $('.forecast-uv-index' + i).html('UV Index: ' + uvindex);
                                    
                                } })();

                            //zile
                            (function zile() {
                                for (let i = 0; i < data.daily.data.length; i++){

                                    let unix_timestamp = data.daily.data[i].time;
                                    let date = new Date(unix_timestamp * 1000);
                                    let showDay = date.getDate();
                                    let days = ['Duminica', 'Luni',  'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata'];
                                    let showDays = days[date.getDay()];
                                    let months = ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'];
                                    let showMonth = months[date.getMonth()];
                                    let formatDay =  showDays + ' ' + showDay + ' ' + showMonth;

                                    let str = i.toString();
                                    $('.forecast-zi' + i).html(formatDay);

                                    
                                } })();

                            //iconite
                            (function iconite() {
                                for (let i = 0; i < data.daily.data.length; i++){
                                    let str = i.toString();
                                    setIcons(data.daily.data[i].icon, document.querySelector('.forecast-icon' + i));

                                } })();

                         //Set Icons
                         setIcons(icon, iconsSet);
                        })
                        .catch( err => {
                            console.log("Error ==>> ", err);
                        });

                });
        } else {
            alert("Your browser does not support geolocation services.");
        }
function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "yellow"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
}
});
