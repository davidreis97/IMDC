import { Component } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{

  constructor(public imdb : IMDBService, private statusBar: StatusBar, private iab: InAppBrowser, private router: Router, private alertController: AlertController, private screenOrientation: ScreenOrientation) {
    imdb.fullUpdate();

    this.statusBar.styleLightContent();
    try{  
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }catch{}
  }
  
  ionViewDidEnter(){
    this.imdb.loadSettings();
    this.imdb.saveSettings();
  }

  getRatingFromSource(ratings,source){
    for(let rating of ratings){
      if(rating.Source == source){
        return rating.Value;
      }
    }
    return null;
  }

  getRTIcon(rating){
    const value = parseInt(rating);
    if(value < 50){
      return '/assets/images/rotten_tomatoes/rotten.png';
    }else if(value < 70){
      return '/assets/images/rotten_tomatoes/fresh.png';
    }else{
      return '/assets/images/rotten_tomatoes/certified_fresh.png';
    }
  }

  openIMDB(imdbid){
    this.iab.create("https://www.imdb.com/title/" + imdbid);
  }

  openRottenTomatoes(title){
    this.iab.create("https://www.rottentomatoes.com/search/?search=" + title);
  }

  editMovie(imdbid){
    this.router.navigateByData({
      url: ['/add-movie'],
      data: [imdbid]
    });
  }

  listMovies(){
    if(this.imdb.movies && this.imdb.movies.length > 0){
      this.router.navigate(['/edit-list']);
    }else{
      this.fakeError();
    }
  }

  async fakeError() {
    const alert = await this.alertController.create({
      header: 'CRITICAL ERROR',
      message: 'TRYING TO ACCESS EMPTY ARRAY AT INDEX 1',
      buttons: ['OK']
    });

    alert.onDidDismiss().finally(() => {
      this.noMovies();
    });

    await alert.present();
  }

  async noMovies() {
    const alert = await this.alertController.create({
      header: 'Jk, não há erro nenhum 🤭',
      message: 'AHAHAHAHA apanhei-te. Fora de tangas, vais para a página de editar a lista tal como pediste, mas aviso já que vai estar vazia...',
      buttons: ['Bora la, tou pa ber']
    });

    alert.onDidDismiss().finally(() => {
      this.router.navigateByData({
        url: ['/edit-list'],
        data: [true]
      });
    });

    await alert.present();
  }

  addMovie(){
    console.log("Add Movie Cenas");
  }

  editList(){
    console.log("Edit List Cenas");
  }

  doRefresh(event) {
    this.imdb.fullUpdate();

    setTimeout(() => {
      event.target.complete();
    }, 300);
  }
}
