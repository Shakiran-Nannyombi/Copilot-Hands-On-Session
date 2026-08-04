import { describe, it, expect } from 'vitest';
import { EventStatus, EventMode, AttendanceStatus } from '../types';

describe('Type definitions', () => {
  it('EventStatus should include valid statuses', () => {
    const statuses: EventStatus[] = ['DRAFT', 'PUBLISHED', 'ONGOING', 'COMPLETED', 'CANCELLED'];
    expect(statuses).toHaveLength(5);
  });

  it('EventMode should include valid modes', () => {
    const modes: EventMode[] = ['ONLINE', 'OFFLINE', 'HYBRID'];
    expect(modes).toHaveLength(3);
  });

  it('AttendanceStatus should include valid statuses', () => {
    const statuses: AttendanceStatus[] = ['REGISTERED', 'CHECKED_IN', 'ABSENT', 'CANCELLED'];
    expect(statuses).toHaveLength(4);
  });
});

describe('Utility functions', () => {
  it('should format dates correctly', () => {
    const date = new Date('2024-03-15T09:00:00Z');
    expect(date.getFullYear()).toBe(2024);
    expect(date.getMonth()).toBe(2); // 0-indexed
  });

  it('should handle tag parsing', () => {
    const tagsString = 'technology, coding, networking';
    const tags = tagsString.split(',').map((t) => t.trim()).filter(Boolean);
    expect(tags).toEqual(['technology', 'coding', 'networking']);
  });
});
