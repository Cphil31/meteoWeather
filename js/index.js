window.onload = function () {

    let button = document.querySelector('#recup');


    function convert(unix) {
        let months_arr = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Jullet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'];
        let jours_arr = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        let date = new Date(unix * 1000);
        let year = date.getFullYear();
        let month = months_arr[date.getMonth()];
        let day = date.getDate();
        let jour = jours_arr[date.getUTCDay()];
        let hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        let convdataTime = jour + ' ' + day + ' ' + month + ' ' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return convdataTime;
    }


    button.addEventListener("click", function () {
        fetch('http://formation.webboy.fr/liste_des_villes.php')
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                for (t of json) {


                    console.log(t.name);


                    let ville = document.createElement('option');
                    ville.setAttribute("id", `${t.id}`);
                    ville.innerHTML = `${t.name}`;
                    document.querySelector('#select').appendChild(ville);



                } //fin boucle ville

                let dynamique = document.querySelector('.dynamique');

                select.addEventListener('change', function () {
                    let city = select.value;
                    console.log(city);

                    let ville = document.createElement('p');
                    ville.setAttribute('class', " col-md-2  mt-5");
                    ville.innerHTML = city;
                    dynamique.innerHTML = '';
                    dynamique.appendChild(ville);



                    let key = 'cd02f311a655c739700a13f10f3651c3';
                    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},uk,uk&units=metric&APPID=${key}`)
                        .then(response => response.json())
                        .then((json) => {

                            console.log(json);


                            for (let temps of json.weather) {
                                let image = document.createElement("img");
                                image.setAttribute("src", `http://openweathermap.org/img/w/${temps.icon}.png`);
                                dynamique.appendChild(image);
                            }
                            let space = document.createElement('div');
                            space.setAttribute('Class', " col-md-10  mt-5");
                            space.innerHTML = '';
                            dynamique.appendChild(space);



                            let titreTemperature = document.createElement('p');
                            titreTemperature.setAttribute('class', " col-md-4 ");
                            titreTemperature.innerHTML = "Temperature";
                            dynamique.appendChild(titreTemperature);


                            let titreVitesse = document.createElement('p');
                            titreVitesse.setAttribute('class', "col-md-4");
                            titreVitesse.innerHTML = "Vitesse du vent";
                            dynamique.appendChild(titreVitesse);

                            let titreDirection = document.createElement('p');
                            titreDirection.setAttribute('class', "col-md-4");
                            titreDirection.innerHTML = "Direction du vent";
                            dynamique.appendChild(titreDirection);


                            let temperature = document.createElement('p');
                            temperature.setAttribute('class', "col-md-4");
                            temperature.innerHTML = `${Math.round(json.main.temp)}° C`;
                            dynamique.appendChild(temperature);


                            let vitesse = document.createElement('p');
                            vitesse.setAttribute('class', "col-md-4");
                            vitesse.innerHTML = `${Math.round(json.wind.speed*3,6)} km/h`;
                            dynamique.appendChild(vitesse);


                            let direction = document.createElement('img');
                            direction.setAttribute('src', "image/fleche.jpg");
                            direction.setAttribute('alt', "Responsive image");
                            direction.style.height = '10px';
                            direction.style.width = '10px';
                            direction.style.transform = `rotate(${json.wind.deg}deg)`;

                            dynamique.appendChild(direction);

                            let gps = document.createElement('p');
                            gps.setAttribute("class", "col-md-6");
                            gps.innerHTML = `gps :  ${json.coord.lat} N ${json.coord.lon}° `;
                            dynamique.appendChild(gps);

                            let time = document.createElement('p');
                            time.setAttribute("class", "col-md-6");
                            time.innerHTML = `dernier relevé :  ` + convert(json.sys.sunrise);
                            dynamique.appendChild(time);

                        }); // recup api 


                })
            }) //fin du fecth ville
    }) // fin button on click

    let select = document.querySelector('#select');




}