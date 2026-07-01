export interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

export class BaseRepository {
  protected baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  protected async get<T>(path: string, mockData?: T, delayMs: number = 300): Promise<T> {
    // In a production application, this would fetch from a real backend:
    // const response = await fetch(`${this.baseUrl}${path}`);
    // if (!response.ok) throw new Error(response.statusText);
    // return response.json();
    
    // For the current analytics dashboard, we simulate a network call:
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockData !== undefined) {
          resolve(mockData);
        } else {
          reject(new Error(`404 Not Found: ${path}`));
        }
      }, delayMs);
    });
  }
}
