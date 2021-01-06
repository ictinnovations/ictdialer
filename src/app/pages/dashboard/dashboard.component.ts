import {Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { DashboardService } from './dashboard.service';
import { Router } from '@angular/router';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  stat: any;
  length: number;
  con_t: any;
  con_pr: any;
  cam_t: any;
  cam_actv: any;

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService, private dashboard_service: DashboardService,
  public router: Router) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

  }

  ngOnInit() {
    this.getStat();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getStat(): void {
    this.dashboard_service.get_Statistics().then(response => {
    this.stat = response;
    const campaign_total = this.abbreviateNumber(this.stat.campaign_total);
    const campaign_active = this.abbreviateNumber(this.stat.campaign_active);
    const contact_total = this.abbreviateNumber(this.stat.contact_total);
    const spool_total = this.abbreviateNumber(this.stat.spool_total);
    this.con_t = contact_total;
    this.con_pr = spool_total;
    this.cam_t = campaign_total;
    this.cam_actv = campaign_active;
    });
  }

 abbreviateNumber(value) {
  let newValue = value;
  if (value >= 1000) {
      const suffixes = ['', 'k', 'm', 'b', 't'];
      const suffixNum = Math.floor( ('' + value).length / 3 );
      let shortValue: any;
      let shortNum: any;
      for (let precision = 2; precision >= 1; precision--) {
          shortValue = parseFloat( (suffixNum !== 0 ? (value / Math.pow(1000, suffixNum) ) : value).toPrecision(precision));
          const dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
          if (dotLessShortValue.length <= 2) { break; }
      }
      if (shortValue % 1 !== 0) {
        shortNum = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
      }
  }
  return newValue;
 }
}
