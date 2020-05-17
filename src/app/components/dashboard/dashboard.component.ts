import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as gpioActions from 'src/app/store/gpio.actions';
import { SwitchService } from '../../services/switch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public led: string;

  constructor(private store: Store<any>, private switchService: SwitchService) { }

  ngOnInit() {
  }

  public ledSwitch() {
    this.led = this.switchService.ledSwitch();
  }

  // public ledSwitch() {
  //   let gpioSwitch: string;

  //   this.store.select('SendMessage')
  //     .subscribe(state => (gpioSwitch = state.message)
  //   );
  //   console.log('GPIO SWITCH: ', gpioSwitch);
  //   gpioSwitch === 'off' ? gpioSwitch = 'on' : gpioSwitch = 'off';

  //   this.store.dispatch(new gpioActions.SendMessage(gpioSwitch));

  //   console.log(`turn ${gpioSwitch} led!`);
  //   this.led = gpioSwitch;
  // }
}
