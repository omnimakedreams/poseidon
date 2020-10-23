import { ViewChild, Component, OnInit, NgModule } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CalendarComponent  } from 'ionic2-calendar';
import { CalModalPage } from '../cal-modal/cal-modal.page';
@Component({
  selector: 'app-chat',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  providers: [],
})
export class InicioPage implements OnInit {
  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;
  currentDate: string;
  eventSource = [];
  viewTitle:string;
  calendar = {
    mode: 'month',
    currentDate : new Date()
  }
  type: 'string';
  modalReady=false;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
    setTimeout(()=>{
      this.modalReady=true;
    },
    50)
  }

  next(){
    console.log("eres mi perra");
    this.myCal.slideNext();
  }
  back(){
    this.myCal.slidePrev();
  }
  
  onViewTitleChanged(title){
    this.viewTitle = title;
  }

  async presentModal(data) {
    const modal = await this.modalController.create({
      component: CalModalPage,
      componentProps: {
        'data': data
      }
    });
    return await modal.present();
  }

  onTimeSelected(ev){
    if(this.modalReady){
      const result = this.presentModal(ev.selectedTime);
    }
  }
}