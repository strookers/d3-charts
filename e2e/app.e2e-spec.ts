import { D3ChartsPage } from './app.po';

describe('d3-charts App', () => {
  let page: D3ChartsPage;

  beforeEach(() => {
    page = new D3ChartsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
