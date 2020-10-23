import { Component, Input, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.page.html',
  styleUrls: ['./asignar.page.scss'],
})
export class AsignarPage implements OnInit {
  @Input() data: string;

  constructor(private modalController: ModalController, private storage: Storage) { }

  users;
  founds;
  mostrar=true;
  selected;
  fechaInicio;
  fechaCierre;
  ngOnInit() {
    
    
    const usuarios = [
      {
        id_user: uuid.v4(),
        nombre: 'Stefany',
        telefono: '09866676',
        pagomovil: '66476674',
        sector: 'guanape'        
      },
      {
        id_user: uuid.v4(),
        nombre: 'Dehiker',
        telefono: '675675245',
        pagomovil: '871234623',
        sector: 'catia'       
      },
      {
        id_user: uuid.v4(),
        nombre: 'claidy',
        telefono: '12487134',
        pagomovil: '664719',
        sector: '23'        
      }
    ];
    this.storage.set('usuarios', usuarios);
    this.storage.get('usuarios').then((val) => {
      
      this.users = val;
    });
  }
  buscar(value) {    
    const newVector = this.users.filter(user => (user.nombre.toLowerCase()).indexOf(value.toLowerCase()) != -1);
    this.founds = newVector;
  }
  pasar(id){    
    this.mostrar=false;
    const newVector=this.users.filter(user => user.id_user == id);
    this.selected = newVector[0];
  }
  obtenHora(fulldate, tipo){
    const horafinal = moment(fulldate).format('HH');
    const minutofinal = moment(fulldate).format('mm');
    let fechaFinal = new Date(this.data);
    fechaFinal.setMinutes(parseInt(minutofinal));
    fechaFinal.setHours(parseInt(horafinal));
    if(tipo==1){
      this.fechaInicio=fechaFinal;
    }else{
      this.fechaCierre=fechaFinal;
    }
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  guardar(){
    this.selected.id_asignados = uuid.v4();
    this.selected.startTime = this.fechaInicio;
    this.selected.endTime = this.fechaCierre;
    console.log(this.selected);

    
    this.storage.get('asignados').then((vector) => {
      if(vector){
        vector.push(this.selected);
        this.storage.set('asignados', vector);
        alert("Asignación exitosa");
        this.dismiss();
      }else{
        const newVector = [];
        newVector.push(this.selected);
        this.storage.set('asignados', newVector);
        alert("Asignación exitosa");
        this.dismiss();
      }
    });
  }





}
