import { CompanyAddress } from '../types';
import { mockData } from './mockData';

export const addressUtils = {
  /**
   * Returns all mock addresses.
   */
  getAddresses: (): CompanyAddress[] => {
    return mockData.addresses;
  },

  /**
   * Returns addresses for a specific user.
   */
  getAddressesByUserId: (userId: string): CompanyAddress[] => {
    return mockData.addresses.filter((a) => a.userId === userId);
  },

  /**
   * Simulates adding a new address (updates local mock data).
   */
  addAddress: (address: Omit<CompanyAddress, 'id'>): CompanyAddress => {
    const newAddress: CompanyAddress = {
      ...address,
      id: `ADDR-${Date.now()}`
    };
    mockData.addresses.push(newAddress);
    return newAddress;
  }
};