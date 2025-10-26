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
    { id: '1',  article: 'das', image: 'assets/images/das-buch.png', audio: 'assets/audio/das-buch.m4a', displayWord: 'Buch' },
    { id: '2',  article: 'das', image: 'assets/images/das-fahrrad.png', audio: 'assets/audio/das-fahrrad.m4a', displayWord: 'Fahrrad' },
    { id: '3',  article: 'das', image: 'assets/images/das-madchen.png', audio: 'assets/audio/das-madchen.m4a', displayWord: 'Mädchen' },
    { id: '4',  article: 'das', image: 'assets/images/das-seil.png', audio: 'assets/audio/das-seil.m4a', displayWord: 'Seil' },
    { id: '5',  article: 'der', image: 'assets/images/der-affe.png', audio: 'assets/audio/der-affe.m4a', displayWord: 'Affe' },
    { id: '6',  article: 'der', image: 'assets/images/der-apfel.png', audio: 'assets/audio/der-apfel.m4a', displayWord: 'Apfel' },
    { id: '7',  article: 'der', image: 'assets/images/der-ball.png', audio: 'assets/audio/der-ball.m4a', displayWord: 'Ball' },
    { id: '8',  article: 'der', image: 'assets/images/der-baum.png', audio: 'assets/audio/der-baum.m4a', displayWord: 'Baum' },
    { id: '9',  article: 'der', image: 'assets/images/der-esel.png', audio: 'assets/audio/der-esel.m4a', displayWord: 'Esel' },
    { id: '10', article: 'der', image: 'assets/images/der-igel.png', audio: 'assets/audio/der-igel.m4a', displayWord: 'Igel' },
    { id: '11', article: 'der', image: 'assets/images/der-junge.png', audio: 'assets/audio/der-junge.m4a', displayWord: 'Junge' },
    { id: '12', article: 'der', image: 'assets/images/der-mila.png', audio: 'assets/audio/der-mila.m4a', displayWord: 'Mila' },
    { id: '13', article: 'der', image: 'assets/images/der-mulleimer.png', audio: 'assets/audio/der-mulleimer.m4a', displayWord: 'Mülleimer' },
    { id: '14', article: 'der', image: 'assets/images/der-sand.png', audio: 'assets/audio/der-sand.m4a', displayWord: 'Sand' },
    { id: '15', article: 'der', image: 'assets/images/der-schulgarten.png', audio: 'assets/audio/der-schulgarten.m4a', displayWord: 'Schulgarten' },
    { id: '16', article: 'der', image: 'assets/images/der-schulhof.png', audio: 'assets/audio/der-schulhof.m4a', displayWord: 'Schulhof' },
    { id: '17', article: 'der', image: 'assets/images/der-schulranzen.png', audio: 'assets/audio/der-schulranzen.m4a', displayWord: 'Schulranzen' },
    { id: '18', article: 'die', image: 'assets/images/die-ameise.png', audio: 'assets/audio/die-ameise.m4a', displayWord: 'Ameise' },
    { id: '19', article: 'die', image: 'assets/images/die-banane.png', audio: 'assets/audio/die-banane.m4a', displayWord: 'Banane' },
    { id: '20', article: 'die', image: 'assets/images/die-birne.png', audio: 'assets/audio/die-birne.m4a', displayWord: 'Birne' },
    { id: '21', article: 'die', image: 'assets/images/die-ente.png', audio: 'assets/audio/die-ente.m4a', displayWord: 'Ente' },
    { id: '22', article: 'die', image: 'assets/images/die-katze.png', audio: 'assets/audio/die-katze.m4a', displayWord: 'Katze' },
    { id: '23', article: 'die', image: 'assets/images/die-kiste.png', audio: 'assets/audio/die-kiste.m4a', displayWord: 'Kiste' },
    { id: '24', article: 'die', image: 'assets/images/die-lehrerin.png', audio: 'assets/audio/die-lehrerin.m4a', displayWord: 'Lehrerin' },
    { id: '25', article: 'die', image: 'assets/images/die-lupe.png', audio: 'assets/audio/die-lupe.m4a', displayWord: 'Lupe' },
    { id: '26', article: 'die', image: 'assets/images/die-maus.png', audio: 'assets/audio/die-maus.m4a', displayWord: 'Maus' },
    { id: '27', article: 'die', image: 'assets/images/die-murmeln.png', audio: 'assets/audio/die-murmeln.m4a', displayWord: 'Murmeln' },
    { id: '28', article: 'die', image: 'assets/images/die-schaukel.png', audio: 'assets/audio/die-schaukel.m4a', displayWord: 'Schaukel' },
  ];


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

  choose(article: 'der' | 'die' | 'das') {
    if (this.isLocked) return;
    this.isLocked = true;
    const isCorrect = article === this.current.article;
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
