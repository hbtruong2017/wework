import { WeworldPage } from './app.po';

describe('weworld App', function() {
  let page: WeworldPage;

  beforeEach(() => {
    page = new WeworldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
