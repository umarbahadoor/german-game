export interface WordItem {
  id: string;
  // Array of valid articles (first is considered primary for styling)
  articles: Array<'der' | 'die' | 'das'>;
  image: string;
  audio: string;
  displayWord: string;
}
