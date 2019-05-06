import { Component, OnInit } from '@angular/core';
import { IMDBService } from '../services/imdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(public imdb : IMDBService, private router: Router) { }

  ngOnInit() {
  }

  cancel(){
    this.imdb.loadSettings();
    this.router.navigate(['/home']);
  }

  save(){
    this.imdb.saveSettings();
    this.router.navigate(['/home']);
  }

}
