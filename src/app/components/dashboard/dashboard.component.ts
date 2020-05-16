import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as gpioActions from 'src/app/store/gpio.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public led: string;

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  public ledSwitch() {
    let gpioSwitch: string;

    this.store.select('SendMessage')
      .subscribe(state => (gpioSwitch = state.message)
    );
    console.log('GPIO SWITCH: ', gpioSwitch);
    gpioSwitch === 'off' ? gpioSwitch = 'on' : gpioSwitch = 'off';

    this.store.dispatch(new gpioActions.SendMessage(gpioSwitch));

    console.log(`turn ${gpioSwitch} led!`);
    this.led = gpioSwitch;
  }
}
