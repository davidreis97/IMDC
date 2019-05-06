import { Component, OnInit, AfterViewInit, Sanitizer } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {

  movie: any = 
  {
    'imdbID': '',
    'date_seen': '',
    'where': '',
    'claudsmeter': -1
  };

  cmButtons: NodeListOf<Element>;
  movieImage: Element;
  imdbID: String = '';
  movieTitle: String = '';
  padding: any = {};

  constructor(private imdb: IMDBService, private alertController: AlertController, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.cmButtons = document.querySelectorAll('.claudsmeter ion-button');
    this.movieImage = document.querySelector('#movieImage');

    try{
      let editImdbID = this.router.getNavigatedData()[0];

      for(let movie of this.imdb.movies){
        if(movie.imdbID == editImdbID){
          this.movie = movie;
        }
      }
      this.movieTitle = this.movie.imdb.Title;
      this.imdbID = this.movie.imdbID;
      this.updateMovie();
      this.updateClaudsmeter(this.movie.claudsmeter);
    }catch{
      this.resetClaudsmeter();
    }
  }

  resetClaudsmeter(){
    this.cmButtons.forEach((button) => {
      button.setAttribute('fill','outline');
    });
  }

  updateMovie(){
    if(this.imdbID != null && this.imdbID != undefined && this.imdbID != '') {
      this.imdb.searchMovieIMDBID(this.imdbID).subscribe(data => {
        this.callbackUpdatedMovie(data.json());
      });
    }else if(this.movieTitle != null && this.movieTitle != undefined && this.movieTitle != ''){
      this.imdb.searchMovieTitle(this.movieTitle).subscribe(data => {
        this.callbackUpdatedMovie(data.json());
      });
    }else{
      this.semDados();
    }
  }

  callbackUpdatedMovie(data){
    if('Error' in data){
      this.erro(data.Error);
      return;
    }

    this.movie.imdbID = data.imdbID;
    this.movie.imdb = data;
    this.movieImage.setAttribute('src',data.Poster);
  }

  updateClaudsmeter(value){
    this.movie.claudsmeter = value;
    const selectedButton = document.querySelector('#' + value);
    this.cmButtons.forEach((button) => {
      button.setAttribute('fill','outline');
    });
    selectedButton.setAttribute('fill','solid');
  }

  confirmMovie(){
    let errorString = '<ul style="padding:0em 0em 0em 1em; margin:0">';
    if(this.movie.imdbID == ''){
      errorString += '<li>Falta escolher o filme.</li>';
    }
    if(this.movie.date_seen == ''){
      errorString += '<li>Falta escolher a data.</li>';
    }else{
      const date = Date.parse(this.movie.date_seen);
      if(date > Date.now()){
        errorString += '<li>Data escolhida é no futuro. Andamos a viajar no tempo ultimamente?</li>'
      }
    }
    if(this.movie.where == ''){
      errorString += '<li>Falta indicar o localizamento.</li>';
    }
    if(this.movie.claudsmeter == -1){
      errorString += '<li>Falta preencher o ClaudsMeter.</li>';
    }

    if(errorString != '<ul style="padding:0em 0em 0em 1em; margin:0">'){
      this.notValid(errorString + '</ul>');
      return;
    }

    this.imdb.addMovie(this.movie);
    this.router.navigate(['/edit-list']);
  }

  async semDados() {
    const alert = await this.alertController.create({
      header: 'Ai ai ai 😐😐😐😐',
      message: 'Sabes bem que não preencheste nenhum dos campos, para de me tentar estragar a app pls, ty.',
      buttons: ['OK papa davis mb']
    });

    await alert.present();
  }

  async erro(texto) {
    const alert = await this.alertController.create({
      header: 'Errito, alguem fez 💩🤭🤭',
      message: texto,
      buttons: ['Tchii rip okok']
    });

    await alert.present();
  }

  async notValid(errorString) {
    const alert = await this.alertController.create({
      header: 'Errito, alguem fez 💩🤭🤭',
      message: errorString,
      buttons: ['Bora la preencher direito']
    });

    await alert.present();
  }
}
