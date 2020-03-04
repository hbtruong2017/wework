import { WorldPage } from './app.po';

describe('world App', function() {
  let page: WorldPage;

  beforeEach(() => {
    page = new WorldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
