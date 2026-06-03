import { User } from '../types';
import { mockData } from './mockData';

export const authUtils = {
  /**
   * Simulates a login request.
   * Returns the user object if credentials match, null otherwise.
   */
  login: (username: string, password: string): User | null => {
    const user = mockData.users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  },

  /**
   * Returns all users with the 'customer' role.
   */
  getAllCustomers: (): User[] => {
    return mockData.users.filter((u) => u.role === 'customer');
  },

  /**
   * Returns a user by ID.
   */
  getUserById: (id: string): User | undefined => {
    return mockData.users.find((u) => u.id === id);
  }
};