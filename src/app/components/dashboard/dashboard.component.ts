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
    console.log(window.location.href);
    
  }

  public ledSwitch() {
    this.led = this.switchService.ledSwitch();
  }
}
