import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { EntityComponent } from './components/entity/entity.component';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { LanguageComponent } from './components/language/language.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { HistoryComponent } from './components/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EntityComponent,
    SimilarityComponent,
    LanguageComponent,
    SentimentComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
