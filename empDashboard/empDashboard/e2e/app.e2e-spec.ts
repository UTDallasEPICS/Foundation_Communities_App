import { FoundationCommunitiesPage } from './app.po';

describe('foundationCommunities App', () => {
  let page: FoundationCommunitiesPage;

  beforeEach(() => {
    page = new FoundationCommunitiesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
