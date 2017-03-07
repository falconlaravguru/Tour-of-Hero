import { TourOfHeroPage } from './app.po';

describe('tour-of-hero App', () => {
  let page: TourOfHeroPage;

  beforeEach(() => {
    page = new TourOfHeroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
