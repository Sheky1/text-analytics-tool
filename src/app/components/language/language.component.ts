import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageModel } from 'src/app/model';
import { DandelionService } from 'src/app/services/dandelion.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  languageForm: FormGroup;
  data: LanguageModel = {
    detectedLangs: [
      {
        lang: '',
        confidence: 0,
      },
    ],
    time: 0,
    timestamp: '',
  };
  dataAvailable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dandelionService: DandelionService
  ) {
    this.languageForm = this.formBuilder.group({
      languageText: ['', Validators.required],
      cleanText: [],
    });
  }

  ngOnInit(): void {}

  detectLanguage() {
    this.dandelionService
      .languageDetection(
        this.languageForm.get('languageText')?.value,
        this.languageForm.get('cleanText')?.value
      )
      .subscribe((data) => {
        console.log(data);
        this.data = data;
        this.dataAvailable = true;
      });
  }
}
