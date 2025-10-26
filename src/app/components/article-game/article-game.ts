import { Component, ChangeDetectorRef } from '@angular/core';
import { WordItem } from '../../models/word.model';

@Component({
  selector: 'app-article-game',
  templateUrl: './article-game.html',
  styleUrls: ['./article-game.scss'],
})
export class ArticleGame {
  constructor(private cdr: ChangeDetectorRef) {}
  words: WordItem[] = [
    { id: '1', article: 'der', image: 'assets/images/der-mila.png', audio: 'assets/audio/der-mila.m4a', displayWord: 'mila' },
    { id: '2', article: 'die', image: 'assets/images/die-lehrerin.png', audio: 'assets/audio/die-lehrerin.m4a', displayWord: 'lehrerin' },
  ];

  current = this.randomWord();
  feedback: 'correct' | 'wrong' | null = null;
  private isLocked = false;

  randomWord(): WordItem {
    return this.words[Math.floor(Math.random() * this.words.length)];
  }

  private nextWord(): WordItem {
    if (this.words.length <= 1) return this.current;
    let next: WordItem;
    do {
      next = this.randomWord();
    } while (next.id === this.current.id);
    return next;
  }

  playAudio() {
    new Audio(this.current.audio).play();
  }

  choose(article: 'der' | 'die' | 'das') {
    if (this.isLocked) return;
    this.isLocked = true;

    this.feedback = article === this.current.article ? 'correct' : 'wrong';
    this.cdr.detectChanges();
    const upcoming = this.nextWord();

    setTimeout(() => {
      this.feedback = null;
      this.current = upcoming;
      this.isLocked = false;
      this.cdr.detectChanges();
      this.playAudio();
    }, 1200);
  }
}
