import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SentimentModel } from 'src/app/model';
import { DandelionService } from 'src/app/services/dandelion.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  sentimentForm: FormGroup;
  data: SentimentModel = {
    lang: '',
    sentiment: {
      score: 0,
      type: '',
    },
    time: 0,
    timestamp: '',
  };
  dataAvailable: boolean = false;
  sentimentColor = 'blue';

  constructor(
    private formBuilder: FormBuilder,
    private dandelionService: DandelionService
  ) {
    this.sentimentForm = this.formBuilder.group({
      sentimentText: ['', Validators.required],
      lang: [],
    });
  }

  ngOnInit(): void {}

  analizeSentiment() {
    this.dandelionService
      .sentimentAnalysis(
        this.sentimentForm.get('sentimentText')?.value,
        this.sentimentForm.get('lang')?.value
      )
      .subscribe((data) => {
        console.log(data);
        this.data = data;
        this.setColor(data.sentiment.score);
        this.dataAvailable = true;
      });
  }

  setColor(score: number) {
    let normalizedScore = (score + 1) / 2;

    let normalizedRed = 255 + (0 - 255) * normalizedScore;
    let normalizedGreen = 0 + (255 - 0) * normalizedScore;
    let normalizedBlue = 0 + (0 - 0) * normalizedScore;

    let red = normalizedRed * 2 - 1;
    let green = normalizedGreen * 2 - 1;
    let blue = normalizedBlue * 2 - 1;

    this.sentimentColor = `rgb(${red},${green},${blue})`;
    console.log(this.sentimentColor);
  }
}
