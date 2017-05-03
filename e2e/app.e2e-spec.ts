import { ChatApp2Page } from './app.po';

describe('chat-app2 App', () => {
  let page: ChatApp2Page;

  beforeEach(() => {
    page = new ChatApp2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
