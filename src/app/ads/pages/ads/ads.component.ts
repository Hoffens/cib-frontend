import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdsService } from '../../services/ads.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  constructor(private adsService: AdsService, private route: Router) { }

  ngOnInit(): void {
  }

}
