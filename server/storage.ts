// Implementation using In-Memory storage for non-persistent backend state
// User data is in Firestore (Client-side), so this is just for backend boilerplate.

export interface IStorage {
  // Add backend-only methods if needed
}

export class MemStorage implements IStorage {
  constructor() {
    // No initialization needed
  }
}

export const storage = new MemStorage();
