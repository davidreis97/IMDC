import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ThemeServiceService } from './theme-service.service';

@Injectable({
  providedIn: 'root'
})
export class IMDBService {

  public apiKey: String = 'NULL';

  public ipAddress: String = '127.0.0.1';
  public port: Number = 0;

  public darkMode: Boolean = false;

  movies: any;

  newMovie: any = [];

  constructor(private http: Http, private storage: Storage, public themeService : ThemeServiceService){
    this.fullUpdate();
  }

  setDefaults(){
    this.apiKey = 'NULL';
    this.ipAddress = '127.0.0.1';
    this.port = 0;
    this.darkMode = false;
  }

  saveSettings(){
    this.storage.set('apiKey', this.apiKey);
    this.storage.set('ipAddress', this.ipAddress);
    this.storage.set('port', this.port);
    this.storage.set('darkMode', this.darkMode);

    if(this.darkMode){
      this.themeService.setDarkTheme();
    }else{
      this.themeService.setWhiteTheme();
    }
  }

  loadSettings(){
    this.storage.get('apiKey')
      .then((value) => {
        this.apiKey = value;
      })
      .catch((err) => {
        this.setDefaults();
        this.saveSettings();
      });

    this.storage.get('ipAddress')
      .then((value) => {
        this.ipAddress = value;
      })
      .catch((err) => {
        this.setDefaults();
        this.saveSettings();
      });
      
    this.storage.get('port')
      .then((value) => {
        this.port = value;
      })
      .catch((err) => {
        this.setDefaults();
        this.saveSettings();
      });

    this.storage.get('darkMode')
      .then((value) => {
        this.darkMode = value;
      })
      .catch((err) => {
        this.setDefaults();
        this.saveSettings();
      });
  
  }

  searchMovieTitle(title){
    return this.http.get('http://www.omdbapi.com/?t=' + title + '&apikey=' + this.apiKey);
  }

  searchMovieIMDBID(imdbid){
    return this.http.get('http://www.omdbapi.com/?i=' + imdbid + '&apikey=' + this.apiKey);
  }

  fullUpdate() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if(req.status === 200) {
          this.movies = JSON.parse(req.responseText);
          this.populateMovieInfos();
        }else{
          console.log("Error connecting to the home server");
        }
      }
    }
    req.open('GET', "http://" + this.ipAddress + ":" + this.port + "/");
    req.setRequestHeader("Access-Control-Allow-Origin", "*");
    req.send()
  }

  sendMovieList() {
    const req = new XMLHttpRequest();
    let success = false;
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if(req.status === 200 && req.responseText == "OK") {
          success = true;
        }
      }
    }
    req.open('PUT', "http://" + this.ipAddress + ":" + this.port + "/", false);
    req.setRequestHeader("Access-Control-Allow-Origin", "*");
    req.setRequestHeader("Content-Type","application/json");
    req.send(JSON.stringify(this.movies));
    return success;
  }

  populateMovieInfos() {
    for(let movie of this.movies){
      this.populateMovieInfo(movie.imdbID,movie);
    }
  }

  private populateMovieInfo(imdbID, obj) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if(req.status === 200) {
          const parsed = JSON.parse(req.responseText);
          obj.imdb = parsed;
        }else{
          console.log("Error connecting to imdb api");
        }
      }
    }
    req.open('GET', 'http://www.omdbapi.com/?i=' + imdbID + '&apikey=' + this.apiKey);
    req.send()
  }

  addMovie(movie){
    for(let i = 0; i < this.movies.length; i++){
      if(this.movies[i].imdbID == movie.imdbID){
        this.movies[i] = movie;
        return;
      }
    }
    this.movies.unshift(movie);
  }

  printDate(date) {
    const objdate = new Date(Date.parse(date));
    let month="?";
    if (objdate.getMonth() + 1 == 1) month = "Jan";
    else if (objdate.getMonth() + 1 == 2) month = "Fev";
    else if (objdate.getMonth() + 1 == 3) month = "Mar";
    else if (objdate.getMonth() + 1 == 4) month = "Abr";
    else if (objdate.getMonth() + 1 == 5) month = "Mai";
    else if (objdate.getMonth() + 1 == 6) month = "Jun";
    else if (objdate.getMonth() + 1 == 7) month = "Jul";
    else if (objdate.getMonth() + 1 == 8) month = "Ago";
    else if (objdate.getMonth() + 1 == 9) month = "Set";
    else if (objdate.getMonth() + 1 == 10) month = "Out";
    else if (objdate.getMonth() + 1 == 11) month = "Nov";
    else if (objdate.getMonth() + 1 == 12) month = "Dez";
    return '' + objdate.getDate() + '-' + month + '-' + objdate.getFullYear();
  }
}
