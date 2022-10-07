import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  EntityModel,
  LanguageModel,
  SentimentModel,
  SimilarityModel,
} from '../model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class DandelionService {
  private readonly mainApi = environment.mainApi;
  historyRequests: string[] = [];

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  entityDetection(
    text: string,
    minConfidence: number,
    includeImage: boolean,
    includeAbstract: boolean,
    includeCategories: boolean
  ): Observable<EntityModel> {
    let include: string[] = [];
    if (includeImage != null) include.push('image');
    if (includeAbstract != null) include.push('abstract');
    if (includeCategories != null) include.push('categories');

    let min_confidence = minConfidence == null ? 0.6 : minConfidence;
    let token = this.tokenService.getToken();

    let params = {
      text,
      min_confidence,
      include,
      token,
    };
    let confidence = `${min_confidence}`;
    this.addHistoryRequest(new Date(), 'nex', 'GET', {
      text,
      confidence,
      token,
    });
    return this.httpClient.get<EntityModel>(`${this.mainApi}/nex/v1`, {
      params,
    });
  }

  textSimilarity(text1: string, text2: string): Observable<SimilarityModel> {
    let token = this.tokenService.getToken();
    let params = {
      text1,
      text2,
      token,
    };
    this.addHistoryRequest(new Date(), 'sim', 'GET', { text1, text2, token });
    return this.httpClient.get<SimilarityModel>(`${this.mainApi}/sim/v1`, {
      params,
    });
  }

  languageDetection(
    text: string,
    cleanText: boolean
  ): Observable<LanguageModel> {
    let clean = cleanText != null ? true : false;
    let token = this.tokenService.getToken();
    let params = {
      text,
      clean,
      token,
    };
    let cleans = `${clean}`;
    this.addHistoryRequest(new Date(), 'li', 'GET', {
      text,
      cleans,
      token,
    });
    return this.httpClient.get<LanguageModel>(`${this.mainApi}/li/v1`, {
      params,
    });
  }

  sentimentAnalysis(
    text: string,
    langSelect: string
  ): Observable<SentimentModel> {
    let lang = langSelect == 'None' ? false : langSelect;
    let token = this.tokenService.getToken();
    let params = {
      text,
      lang,
      token,
    };
    let language = `${lang}`;
    this.addHistoryRequest(new Date(), 'sent', 'GET', {
      text,
      language,
      token,
    });
    return this.httpClient.get<SentimentModel>(`${this.mainApi}/sent/v1`, {
      params,
    });
  }

  getHistory() {
    return this.historyRequests;
  }
  addHistoryRequest(
    timestamp: Date,
    urlEnding: string,
    requestType: string,
    queries: { [name: string]: string }
  ) {
    let queriesString = '';
    let keys = Object.keys(queries);
    keys.forEach((key) => {
      queriesString += `${key}=${queries[key]}&`;
    });
    queriesString = queriesString.slice(0, queriesString.length - 1);
    this.historyRequests.push(
      `[${timestamp.toLocaleString()}] ${requestType} ${
        this.mainApi
      }/${urlEnding}/v1?${queriesString}`
    );
  }
}
