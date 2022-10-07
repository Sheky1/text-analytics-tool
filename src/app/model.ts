export interface EntityModel {
  timestamp: string;
  time: number;
  lang: string;
  annotations: [
    {
      title: string;
      uri: string;
      image: {
        full: string;
        thumbnail: string;
      };
      abstract: string;
      categories: [];
    }
  ];
}

export interface SimilarityModel {
  timestamp: string;
  time: number;
  lang: string;
  similarity: number;
}

export interface LanguageModel {
  timestamp: string;
  time: number;
  detectedLangs: [
    {
      lang: string;
      confidence: number;
    }
  ];
}

export interface SentimentModel {
  timestamp: string;
  time: number;
  lang: string;
  sentiment: {
    score: number;
    type: string;
  };
}
