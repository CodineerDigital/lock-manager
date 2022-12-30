# Lock Manager

The Lock Manager is a utility that allows multiple operations to be performed concurrently on a collection of resources, but only allows one operation to be performed at a time on each individual resource. It does this using a queue system for mutual exclusion, ensuring that operations are executed in a predictable and controlled manner.

## Installation

To install the Lock Manager, run the following command:

```bash
npm install @codineerdigital/lock-manager
```

## Usage
To use the Document Lock Manager, import the `DocumentLockManager` class and create a new instance of it. Then, call the `lock` method with the ID of the resource you want to lock and a function that represents the operation you want to perform on the resource. The lock manager will ensure that only one operation can be executed at a time for each resource, and it will queue up any additional operations until the current one has completed.

Here is an example of how to use the lock manager:
```typescript
import { DocumentLockManager } from '@codineerdigital/lock-manager';

const lockManager = new DocumentLockManager();

async function updateResource(resourceId: string, newData: any) {
  await lockManager.lock(resourceId, async () => {
    // Perform update operation on the resource here
  });
}
```
