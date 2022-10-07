import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SimilarityModel } from 'src/app/model';
import { DandelionService } from 'src/app/services/dandelion.service';

@Component({
  selector: 'app-similarity',
  templateUrl: './similarity.component.html',
  styleUrls: ['./similarity.component.css'],
})
export class SimilarityComponent implements OnInit {
  similarityForm: FormGroup;
  dataAvailable: boolean = false;
  data: SimilarityModel = {
    lang: '',
    time: 0,
    timestamp: '',
    similarity: 0,
  };

  constructor(
    private formBuilder: FormBuilder,
    private dandelionService: DandelionService
  ) {
    this.similarityForm = this.formBuilder.group({
      text1: ['', Validators.required],
      text2: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  textSimilarity() {
    this.dandelionService
      .textSimilarity(
        this.similarityForm.get('text1')?.value,
        this.similarityForm.get('text2')?.value
      )
      .subscribe((data) => {
        console.log(data);
        this.dataAvailable = true;
        this.data = data;
      });
  }
}
