import "./styles.css";
import "./film.css";
//import * as film from "./film.js";

var page;
var obj;
const api_key = "f9b527e332098a3c5fdbb4884620523c";
const Http = new XMLHttpRequest();
const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
Http.open("GET", url);
Http.send();

Http.onloadend = e => {
  obj = JSON.parse(Http.responseText);
  page = obj.results;
  filmlisrender("app", page);
};

function filmlisrender(divId, data) {
  let ul = document.createElement("ul");
  document.getElementById(divId).appendChild(ul);
  data.forEach(function(data) {
    let li = document.createElement("li");
    li.innerHTML = data.original_title;
    li.id = data.id;
    li.onclick = function(x) {
      displayfilm(data);
    };
    ul.appendChild(li);
  });
}
function displayfilm(data) {
  let mainDiv = document.getElementById("app");
  mainDiv.innerHTML = "";
  let image = document.createElement("img");
  image.className = "image";
  image.src = `https://image.tmdb.org/t/p/w500/${data.poster_path}`;
  let name = document.createElement("div");
  name.innerHTML = data.original_title;
  name.className = "header-film";
  let desc = document.createElement("div");
  desc.innerHTML = data.overview;
  desc.className = "filminfoblock";
  let recList = document.createElement("ul");
  recList.id = "recList";
  mainDiv.appendChild(image);
  mainDiv.appendChild(name);
  mainDiv.appendChild(desc);
  mainDiv.appendChild(recList);
  getRecomendations(api_key, data.id);
}

function getRecomendations(apikey, id) {
  let url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apikey}`;
  Http.open("GET", url);
  Http.send();
  Http.onloadend = e => {
    //console.log(JSON.parse(Http.responseText));
    let obj = JSON.parse(Http.responseText);
    let counter = 4; //Обмеження рекомендацій якщо значення більше ніж кількість елементів в масиві все буде ок
    let recomData = obj.results;
    let ul = document.getElementById("recList");
    recomData.forEach(function(data) {
      if (counter === 0) {
        return;
      }
      let li = document.createElement("li");
      li.innerHTML = data.original_title;
      li.onclick = function(x) {
        displayfilm(data);
      };
      ul.appendChild(li);
      counter--;
    });
  };
}

///По рекомендашкам теж можна по тикати
