
export interface CardContent {
  id: number;
  title: string;
  subtitle?: string;
  description: string[];
  imageUrl: string;
  highlightText?: string;
  isActionCard?: boolean;
}

export interface AppState {
  currentCardIndex: number;
  isImageLoading: boolean;
}
