import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ArticleGame} from './components/article-game/article-game';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ArticleGame],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('german-game');
}
