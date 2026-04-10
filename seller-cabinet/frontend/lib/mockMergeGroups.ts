/** Группы по модели (варианты одной модели ворот) */
export type MergeModelRow = {
  id: string;
  thumbTints: string[];
  groupId: string;
  modelName: string;
  category: string;
  count: number;
};

export const MOCK_MERGE_MODELS: MergeModelRow[] = [
  {
    id: "m1",
    thumbTints: ["#c5ccd6", "#aeb7c4"],
    groupId: "4133629855",
    modelName: "Секционные ворота ProTherm, серия Стандарт",
    category: "Гаражные секционные ворота",
    count: 4,
  },
  {
    id: "m2",
    thumbTints: ["#b8c4d4"],
    groupId: "4129011122",
    modelName: "Откатный комплект StreetLine, консоль 600 кг",
    category: "Откатные ворота",
    count: 3,
  },
  {
    id: "m3",
    thumbTints: ["#d0d8e2", "#c2cbd8", "#b4bec9"],
    groupId: "4115500441",
    modelName: "Привод для распашных ворот, линейный, до 400 кг",
    category: "Автоматика и приводы",
    count: 5,
  },
];

/** Группы «похожие» (связанные товары одной подкатегории) */
export type MergeSimilarRow = {
  id: string;
  thumbTints: string[];
  moreCount?: number;
  groupId: string;
  groupName: string;
  category: string;
  count: number;
};

export const MOCK_MERGE_SIMILAR: MergeSimilarRow[] = [
  {
    id: "s1",
    thumbTints: ["#c4ceda"],
    moreCount: 2,
    groupId: "45514554",
    groupName: "Комплекты для откатных ворот, усилие до 800 кг",
    category: "Автоматика для откатных ворот",
    count: 3,
  },
  {
    id: "s2",
    thumbTints: ["#bcc6d4", "#aeb9c8"],
    groupId: "45514890",
    groupName: "Фурнитура для секционных ворот, пружины и тросы",
    category: "Комплектующие",
    count: 2,
  },
];
