export class DocumentLockManager {
    // Map that stores the queue of operations for each document
    private readonly documentQueues = new Map<string, Array<() => Promise<void>>>();

    // Map that stores the current operation for each document
    private readonly documentLocks = new Map<string, Promise<void>>();

    /**
     * Locks the document and executes the operation
     * @param documentId Id of the document to lock
     * @param operation Operation to execute
     */
    async lock(documentId: string, operation: () => Promise<void>) {
        let documentQueue = this.documentQueues.get(documentId);
        if (!documentQueue) {
            documentQueue = [];
            this.documentQueues.set(documentId, documentQueue);
        }

        // Add the operation to the queue for the document
        documentQueue.push(operation);

        // If there is no current operation for the document, start the operation immediately
        if (!this.documentLocks.has(documentId)) {
            this.documentLocks.set(documentId, this.processQueue(documentId));
        }
    }

    /**
     * Executes the operations in the queue for the document
     * @param documentId Id of the document to process
     */
    private async processQueue(documentId: string) {
        // Get the queue for the document
        const documentQueue = this.documentQueues.get(documentId) ?? [];

        while (documentQueue.length > 0) {
            // Get the next operation in the queue
            const operation = documentQueue.shift();

            try {
                // Execute the operation
                if (operation)
                    await operation();
            } catch (error) {
                // Handle the error
                console.error(error);
            }
        }

        // Remove the lock for the document
        this.documentLocks.delete(documentId);
    }
}
