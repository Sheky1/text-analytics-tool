import { Component, OnInit } from '@angular/core';
import { DandelionService } from 'src/app/services/dandelion.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  requests: string[] = [];

  constructor(private dandelionService: DandelionService) {
    this.requests = this.dandelionService.getHistory();
  }

  ngOnInit(): void {}
}
