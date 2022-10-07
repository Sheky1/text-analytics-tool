import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EntityComponent } from './components/entity/entity.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';
import { SimilarityComponent } from './components/similarity/similarity.component';
import { LanguageComponent } from './components/language/language.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'entity',
    component: EntityComponent,
  },
  {
    path: 'similarity',
    component: SimilarityComponent,
  },
  {
    path: 'language',
    component: LanguageComponent,
  },
  {
    path: 'sentiment',
    component: SentimentComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
