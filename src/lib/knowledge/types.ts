export type ArticlePhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type ArticleVideo = {
  platform: "bilibili";
  title: string;
  url: string;
};

export type ArticleDose = {
  name: string;
  range: string;
  note: string;
};

export type ArticleConfuse = {
  lookalike: string;
  difference: string;
  photoHint: string;
};

export type Article = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  crops: string[];
  problems: string[];
  regions: string[];
  seasons: string[];
  tags: string[];
  coverCrop: string | null;
  coverType: "plant" | "soil";
  photos: ArticlePhoto[];
  phenomenon: {
    appearance: string;
    conditions: string;
    commonCrops: string;
  };
  confuse: ArticleConfuse[];
  causes: {
    natural: string[];
    human: string[];
    plainExplain: string;
  };
  solutions: {
    steps: string[];
    videos: ArticleVideo[];
  };
  dosage: ArticleDose[];
  prevention: string[];
  indicators: { name: string; meaning: string; typical: string }[];
  relatedSlugs: string[];
  updatedAt: string;
  reviewer: string;
  fieldCheck?: string;
  dontDo?: string[];
  whenToTest?: string;
  featured?: boolean;
  hot?: boolean;
  /** Extra farmer-voice paragraphs shown after “这是什么问题”. */
  longform?: string[];
};
