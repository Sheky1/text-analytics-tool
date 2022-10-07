import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntityModel } from 'src/app/model';
import { DandelionService } from 'src/app/services/dandelion.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css'],
})
export class EntityComponent implements OnInit {
  entityForm: FormGroup;
  data: EntityModel = {
    annotations: [
      {
        title: '',
        image: {
          full: '',
          thumbnail: '',
        },
        uri: '',
        abstract: '',
        categories: [],
      },
    ],
    lang: '',
    time: 0,
    timestamp: '',
  };
  dataAvailable: boolean = false;
  includeImage: boolean = false;
  includeAbstract: boolean = false;
  includeCategories: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dandelionService: DandelionService
  ) {
    this.entityForm = this.formBuilder.group({
      entityText: ['', Validators.required],
      confidence: [],
      includeImage: [],
      includeAbstract: [],
      includeCategories: [],
    });
  }

  ngOnInit(): void {}

  detectEntities() {
    this.includeImage = this.entityForm.get('includeImage')?.value;
    this.includeAbstract = this.entityForm.get('includeAbstract')?.value;
    this.includeCategories = this.entityForm.get('includeCategories')?.value;
    this.dandelionService
      .entityDetection(
        this.entityForm.get('entityText')?.value,
        this.entityForm.get('confidence')?.value,
        this.entityForm.get('includeImage')?.value,
        this.entityForm.get('includeAbstract')?.value,
        this.entityForm.get('includeCategories')?.value
      )
      .subscribe((data) => {
        console.log(data);
        this.data = data;
        this.dataAvailable = true;
      });

    return true;
  }
}
