import { Component, ViewChild, Renderer2, ElementRef, AfterViewInit, AfterViewChecked, OnInit, HostListener} from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import {MdTooltipModule} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('sideMenu', [
      state('opened', style({
        marginLeft: '0px'
      })),
      state('closed', style({
        marginLeft: '-400px'
      })),
      transition('opened <=> closed', animate('100ms ease-in-out'))

    ]),

    trigger('burgerSlide', [
      state('burgerOpened', style ({
        left: '300px'
      })),
      state('burgerClosed', style ({
        left: '30px'
      })),
     transition('burgerOpened <=> burgerClosed', animate('100ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements AfterViewChecked {
  @ViewChild('chat') chatWindow: ElementRef;
  items: FirebaseListObservable<any>;
  name: any;
  msgVal: string = "";
  date: any;
  photo: any;
  stateMenu: string = 'opened';
  burgerState: string = 'burgerOpened';
  firstViewFinished: boolean = false;
  toBottom: boolean = false;
constructor(public af: AngularFire, private tooltip: MdTooltipModule, private render: Renderer2, elementRef: ElementRef){
  this.items = af.database.list('/messages', {
    query: {
      limitToLast: 5
    }
    
  });
  
  this.af.auth.subscribe(auth => {
       if(auth) {
         this.name = auth.facebook.displayName;
         this.photo = auth.facebook.photoURL;
       }
  });
  
}

//@HostListener('window:scroll', ['$event'])
 //  track(event) {
   //     console.log(event);
 //   }

//Lifecycle hooks

   ngAfterViewChecked(){
     if(!this.firstViewFinished){
      this.chatWindow.nativeElement.scrollIntoView(false);
    } else if (this.toBottom){
      this.chatWindow.nativeElement.scrollIntoView(false);
      this.toBottom = false;      
    }
      setTimeout(() =>{
        this.firstViewFinished = true;
        
      }, 2000)
      
   } 
  



 
login () {
  this.af.auth.login ({
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  })
}

logout () {
  this.af.auth.logout();

}
chatSend(theirMessage){
  this.date = new Date().toUTCString().split('').slice(0, -3).join('');
  this.items.push({
    message: theirMessage,
    name: this.name,
    date: this.date,
    photo: this.photo,
  })
  this.msgVal = ""
  this.toBottom = true;
  
}
openSideMenu(){
  this.stateMenu = (this.stateMenu === 'opened'? 'closed' : 'opened');
  this.burgerState = (this.burgerState === 'burgerOpened'? 'burgerClosed' : 'burgerOpened');
  console.log(this.stateMenu);
}
}