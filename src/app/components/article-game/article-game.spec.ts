import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleGame } from './article-game';

describe('ArticleGame', () => {
  let component: ArticleGame;
  let fixture: ComponentFixture<ArticleGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
