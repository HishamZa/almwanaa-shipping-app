import { Announcement } from '../types';
import { mockData } from './mockData';

export const announcementUtils = {
  /**
   * Returns all mock announcements.
   */
  getAnnouncements: (): Announcement[] => {
    return mockData.announcements;
  },

  /**
   * Returns announcements sorted by date (newest first).
   */
  getSortedAnnouncements: (): Announcement[] => {
    return [...mockData.announcements].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
};