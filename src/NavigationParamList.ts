export type Show = {
  id: number;
  name: string;
  summary: string;
  image?: {
    medium?: string;
    original?: string;
  };
};

export type MainStackParamList = {
  Splash: undefined;
  Home: undefined;
  Search: undefined;
  Details: {
    show: Show;
  };
};