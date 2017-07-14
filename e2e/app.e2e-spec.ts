import { JenkinsPipelinePage } from './app.po';

describe('jenkins-pipeline App', () => {
  let page: JenkinsPipelinePage;

  beforeEach(() => {
    page = new JenkinsPipelinePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
