export interface WordItem {
  id: string;
  articles: Array<'der' | 'die' | 'das'>;
  image: string;
  audio: string;
  displayWord: string;
}
