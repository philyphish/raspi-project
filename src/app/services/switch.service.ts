import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as gpioActions from '../store/gpio.actions';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor(private store: Store<any>) { }

  public ledSwitch() {
    let gpioSwitch: string;

    this.store.select('SendMessage')
      .subscribe(state => (gpioSwitch = state.message)
    );
    console.log('GPIO SWITCH: ', gpioSwitch);
    gpioSwitch === 'off' ? gpioSwitch = 'on' : gpioSwitch = 'off';

    this.store.dispatch(new gpioActions.SendMessage(gpioSwitch));

    console.log(`turn ${gpioSwitch} led!`);
    return gpioSwitch;
  }

  public connectWs() {
    this.store.select('SendMessage')
      .subscribe(state => {
        console.log(`Connected: ${state.message}`);
        
      });

    this.store.dispatch(new gpioActions.GetConnected('connect'));
  }

}
