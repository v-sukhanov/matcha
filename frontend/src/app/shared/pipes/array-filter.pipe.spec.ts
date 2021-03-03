import { ArrayFilterPipe } from 'app/shared/pipes/array-filter.pipe';

describe('ArrayFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
