import { DocumentLockManager } from '..';

describe('DocumentLockManager', () => {
  let lockManager: DocumentLockManager;

  beforeEach(() => {
    lockManager = new DocumentLockManager();
  });

  it('should execute operations in the correct order', async () => {
    const result: number[] = [];

    lockManager.lock('doc1', async () => {
      result.push(1);
      await delay(10);
      result.push(2);
    });

    lockManager.lock('doc1', async () => {
      result.push(3);
      await delay(10);
      result.push(4);
    });

    lockManager.lock('doc1', async () => {
      result.push(5);
      await delay(10);
      result.push(6);
    });

    await delay(100);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should execute operations for different documents concurrently', async () => {
    const result: number[] = [];

    lockManager.lock('doc1', async () => {
      result.push(1);
      await delay(50);
      result.push(2);
    });

    lockManager.lock('doc2', async () => {
      result.push(3);
      await delay(10);
      result.push(4);
    });

    await delay(100);
    expect(result).toEqual([1, 3, 4, 2]);
  });

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
});

