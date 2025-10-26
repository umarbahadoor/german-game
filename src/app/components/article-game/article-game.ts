import { Component, ChangeDetectorRef } from '@angular/core';
import { WordItem } from '../../models/word.model';
import { WORDS } from '../../data/words';

@Component({
  selector: 'app-article-game',
  templateUrl: './article-game.html',
  styleUrls: ['./article-game.scss'],
})
export class ArticleGame {
  constructor(private cdr: ChangeDetectorRef) {}
  words: WordItem[] = WORDS;


  current = this.randomWord();
  feedback: 'correct' | 'wrong' | null = null;
  canContinue = false;
  private isLocked = false;
  private correctlyAnsweredIds = new Set<string>();

  randomWord(): WordItem {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  private nextWord(): WordItem {
    if (this.words.length <= 1) return this.current;

    const notCorrect = this.words.filter(w => !this.correctlyAnsweredIds.has(w.id) && w.id !== this.current.id);
    const correct = this.words.filter(w => this.correctlyAnsweredIds.has(w.id) && w.id !== this.current.id);

    const pickCorrect = Math.random() < 0.2; // 20% chance to pick a previously-correct word

    let pool: WordItem[] | null = null;
    if (pickCorrect && correct.length > 0) {
      pool = correct;
    } else if (!pickCorrect && notCorrect.length > 0) {
      pool = notCorrect;
    } else if (notCorrect.length > 0) {
      // Fallback: prefer unseen/uncorrected if available
      pool = notCorrect;
    } else if (correct.length > 0) {
      pool = correct;
    } else {
      // Edge case: only one word or filtering removed all, fallback to any except current
      pool = this.words.filter(w => w.id !== this.current.id);
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  playAudio() {
    new Audio(this.current.audio).play();
  }

  playAudioAndContinue() {
    const audio = new Audio(this.current.audio);

    audio.addEventListener('ended', () => {
      this.canContinue = true;
      this.cdr.detectChanges();
    });

    audio.play();
  }

  getDisplayedArticles(): string {
    // Deduplicate then join for display like "der/das"
    return Array.from(new Set(this.current.articles)).join('/');
  }

  getDisplayedArticlesArray(): Array<'der' | 'die' | 'das'> {
    // Deduplicate while preserving order
    const seen = new Set<'der' | 'die' | 'das'>();
    const result: Array<'der' | 'die' | 'das'> = [];
    for (const a of this.current.articles) {
      if (!seen.has(a)) {
        seen.add(a);
        result.push(a);
      }
    }
    return result;
  }

  getPrimaryArticle(): 'der' | 'die' | 'das' {
    return this.current.articles[0];
  }

  choose(article: 'der' | 'die' | 'das') {
    if (this.isLocked) return;
    this.isLocked = true;
    const isCorrect = new Set<('der' | 'die' | 'das')>(this.current.articles).has(article);
    this.feedback = isCorrect ? 'correct' : 'wrong';
    if (isCorrect) {
      this.correctlyAnsweredIds.add(this.current.id);
    }
    this.cdr.detectChanges();
    this.playAudioAndContinue();
  }

  goToNextWord() {
    const upcoming = this.nextWord();
    this.feedback = null;
    this.current = upcoming;
    this.isLocked = false;
    this.canContinue = false;
    this.cdr.detectChanges();
  }
}
