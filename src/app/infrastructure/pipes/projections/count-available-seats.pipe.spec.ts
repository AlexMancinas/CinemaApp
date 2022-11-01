import { CountAvailableSeatsPipe } from './count-available-seats.pipe';

describe('CountAvailableSeatsPipe', () => {
  it('create an instance', () => {
    const pipe = new CountAvailableSeatsPipe();
    expect(pipe).toBeTruthy();
  });
});
