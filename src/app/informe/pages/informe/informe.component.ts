import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformeService } from '../../services/informe.service';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.css']
})
export class InformeComponent implements OnInit {

  constructor(private informeService: InformeService, private route: Router) { }

  ngOnInit(): void {
  }

}
