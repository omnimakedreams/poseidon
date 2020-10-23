import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { AsignarPage } from '../asignar/asignar.page';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  @Input() data: string;
  constructor(private modalController: ModalController, private storage: Storage) { }
  events = [];
  ngOnInit() {
    this.storage.get('asignados').then((val) => {
      if(val){
        const newVector = val.filter(e => moment(e.startTime).format('L') == moment(this.data).format('L'));
      this.events = newVector;
      }
      
    });
  }
  delete(id) {
    const newVector = this.events.filter(e => e.id_asignados != id);
    this.events = newVector;
    this.storage.set('asignados', newVector);
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  conversion(time) {
    return moment(time).format('LT');
  }
  asignar() {    
    this.presentModal2();
  }
  async presentModal2(){
    const modal= await this.modalController.create({
      component: AsignarPage,
      componentProps: {
        'data': this.data
      }
    });
    modal.onDidDismiss().then(() => {
      this.storage.get('asignados').then((val) => {
        if(val){
          const newVector = val.filter(e => moment(e.startTime).format('L') == moment(this.data).format('L'));
          this.events = newVector;
        }
      });
    });
    return await modal.present();
  }
}

