import { Component, OnInit } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.page.html',
  styleUrls: ['./edit-list.page.scss'],
})
export class EditListPage implements OnInit {

  delete : Boolean = false;

  vemDoTroll : Boolean = false;

  constructor(public imdb:IMDBService, private router:Router, private alertController: AlertController) {}

  ngOnInit() {
    try{
      if(this.router.getNavigatedData()[0]){
        this.vemDoTroll = true;
      }
    }catch{}
  }

  async deleteItemConfirmation(title,index) {
    const alert = await this.alertController.create({
      header: 'Eish, o filme foi assim tão mau? 🤦‍♂️',
      message: "Queres mesmo apagar o filme <strong>'" + title + "'</strong>? ",
      buttons: [{
        text: 'Nah deixa lá',
        role: 'cancel',
      }, {
        text: 'Yah apaga pls',
        handler: () => {
          this.imdb.movies.splice(index, 1);
        }
      }]
    });

    await alert.present();
  }

  deleteItem(index){
    this.deleteItemConfirmation(this.imdb.movies[index].imdb.Title,index);
  }

  reorderItems(event){
    let itemToMove = this.imdb.movies.splice(event.detail.from,1)[0];
    this.imdb.movies.splice(event.detail.to,0,itemToMove);
    event.detail.complete();
  }

  saveMovies(){
    this.delete = false;
    if (this.imdb.sendMovieList() == true){
      this.router.navigate(['/home']);
    }else{
      this.connectError();
    }
  }

  cancel(){
    this.imdb.fullUpdate();
    this.delete = false;
    this.router.navigate(['/home']);
  }

  async connectError() {
    const alert = await this.alertController.create({
      header: 'Mim não ligar, tu sem net?',
      message: 'Erro ao enviar lista de filmes para o servidor.',
      buttons: ['Okok 😔']
    });

    await alert.present();
  }

}
