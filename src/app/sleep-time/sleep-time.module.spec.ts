import { SleepTimeModule } from 'app/sleep-time/sleep-time.module';

describe('SleepTimeModule', () => {
  let sleepModule: SleepTimeModule;

  beforeEach(() => {
    sleepModule = new SleepTimeModule();
  });

  it('should create an instance', () => {
    expect(sleepModule).toBeTruthy();
  });
});
