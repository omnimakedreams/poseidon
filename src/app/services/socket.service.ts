import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

declare var require: any;
import { Observable } from 'rxjs';
import { Security } from './security.service';
@Injectable({
  providedIn: 'root'
})
export class Socket {
  readonly url = 'http://localhost:3000';
  socket;
  localvideo:any;
  useTrickle = false;
  peer;
  Mystream=null;
  ProcIncomingCall:Boolean = false;
  ProcGetToken:Boolean = false;
  ProcSignal:Boolean = false;
  ProcStream:Boolean = false;
  ProcAvalibleUser:Boolean = false;
  public context: CanvasRenderingContext2D;
  config: any = { audio : true, video : false };
  constructor(private securityService : Security) {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']})
   }
   id=3;
   listenObserver0;
   public inicializar() {
      const data = {
      "id_user": this.id
      }
      this.socket.on('disconnect', (reason) => {
        console.log("Reconnectando..." 
        +reason);
        this.socket.open();
        this.socket.emit('storeClientInfo', data);
      });
      this.socket.on('connect', () => {
          console.log('Conectado con el id Socket: %s', this.socket.id);
          this.socket.emit('storeClientInfo', data);
          this.socket.emit('open_chat', data);
      });
      this.socket.on('connect_timeout', (time) => {
        console.log("connect_timeout..."+time);
      });
      this.socket.on('newNotice', response => {
        console.log(JSON.parse(response));
      });
      this.socket.on('notifications', response => {
        console.log(JSON.parse(response));
      });
      this.socket.on('getOneMoment', response => {
        console.log(JSON.parse(response));
      });
      this.socket.on('momentsUpdate', response => {
        console.log(JSON.parse(response));
      });
      this.socket.on('groups', response => {
        console.log(JSON.parse(response));
        // const res= JSON.parse(this.securityService.decrypt(response, "$2y$10$dNn.mFm.3KAyYplSwkhrBOhvHaaKysugQCFMD0VEe2.SIokrvkuT2"));
        this.listenObserver0.next(response)
        
      });
      return this.getListen0();
      
   }
   getListen0(): Observable<any> {
      return new Observable(observer => {
          this.listenObserver0 = observer;
      });
  }


   listenObserver
    listen(): Observable<any> {
      this.socket.on('chatResponse', (response) => {
        console.log("Llegaron los chats");
        //const res= JSON.parse(this.securityService.decrypt(response));
        this.listenObserver.next(response)
      });
        return this.getListen();
    }
    getListen(): Observable<any> {
        return new Observable(observer => {
            this.listenObserver = observer;
        });
    }


  public listenSocketErrors(){
    this.socket.on('socketError', (response) => {
        console.log(response);
    });
  }


    public updateStatus(request) {
        this.socket.emit('updateStatus', request);
    }
    public notify0(request) {
        this.socket.emit('notifications', request);
    }
    public notify1(request) {
        this.socket.emit('notify', request);
    }
    public moments(request) {
      this.socket.emit('moments', request);
    }

    public sendMessage(request) {
      console.log(request);
      this.socket.emit('addMessage', request);
    }
    public delete_mensaje(request){
      this.socket.emit('deleteMessage', request);
    }
    public deleteChat(request){
      this.socket.emit('deleteChat', request);
    }
  
    shareMomentAux=false;
    public shareMoment(request) {
      this.socket.emit('momentToChat', request);
      if(!this.shareMomentAux){
        this.shareMomentAux=true;
          this.socket.on('momentToChatResponse', (response) => {
            const res= JSON.parse(response);
            console.log(res);
          })
      }
    }
    public newChatP2P(request) {
      this.socket.emit('new_P2P', request);
    }
    public settingsgroups(request) {
      this.socket.emit('groups_settings', request);
    }
    public newChatGroup(request) {
      this.socket.emit('new_group', request);
    }
    public eliminar_chat(request) {
      this.socket.emit('deleteChat', request);
    }
}
