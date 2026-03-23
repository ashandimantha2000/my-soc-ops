import { describe, it, expect } from 'vitest';
import {
  generateScavengerItems,
  toggleScavengerItem,
  getScavengerProgress,
  isScavengerComplete,
} from './scavengerLogic';
import { SCAVENGER_ITEMS } from '../data/scavengerItems';

describe('scavengerLogic', () => {
  describe('generateScavengerItems', () => {
    it('should generate the correct number of items', () => {
      const items = generateScavengerItems();
      expect(items).toHaveLength(SCAVENGER_ITEMS.length);
    });

    it('should assign sequential IDs starting from 0', () => {
      const items = generateScavengerItems();
      items.forEach((item, index) => {
        expect(item.id).toBe(index);
      });
    });

    it('should have all items unchecked initially', () => {
      const items = generateScavengerItems();
      items.forEach((item) => {
        expect(item.isChecked).toBe(false);
      });
    });

    it('should use the text from SCAVENGER_ITEMS', () => {
      const items = generateScavengerItems();
      items.forEach((item, index) => {
        expect(item.text).toBe(SCAVENGER_ITEMS[index]);
      });
    });
  });

  describe('toggleScavengerItem', () => {
    it('should check an unchecked item', () => {
      const items = generateScavengerItems();
      const updated = toggleScavengerItem(items, 0);
      expect(updated[0].isChecked).toBe(true);
    });

    it('should uncheck a checked item', () => {
      const items = generateScavengerItems();
      const checked = toggleScavengerItem(items, 0);
      const unchecked = toggleScavengerItem(checked, 0);
      expect(unchecked[0].isChecked).toBe(false);
    });

    it('should not modify other items', () => {
      const items = generateScavengerItems();
      const updated = toggleScavengerItem(items, 0);
      for (let i = 1; i < updated.length; i++) {
        expect(updated[i].isChecked).toBe(items[i].isChecked);
      }
    });

    it('should return a new array (immutability)', () => {
      const items = generateScavengerItems();
      const updated = toggleScavengerItem(items, 0);
      expect(updated).not.toBe(items);
    });

    it('should not modify the item if ID does not exist', () => {
      const items = generateScavengerItems();
      const updated = toggleScavengerItem(items, 9999);
      expect(updated.every((item) => !item.isChecked)).toBe(true);
    });
  });

  describe('getScavengerProgress', () => {
    it('should return 0 checked and 0% for empty list', () => {
      const progress = getScavengerProgress([]);
      expect(progress.checked).toBe(0);
      expect(progress.total).toBe(0);
      expect(progress.percentage).toBe(0);
    });

    it('should return 0% when no items are checked', () => {
      const items = generateScavengerItems();
      const progress = getScavengerProgress(items);
      expect(progress.checked).toBe(0);
      expect(progress.total).toBe(SCAVENGER_ITEMS.length);
      expect(progress.percentage).toBe(0);
    });

    it('should return 100% when all items are checked', () => {
      const items = generateScavengerItems().map((item) => ({
        ...item,
        isChecked: true,
      }));
      const progress = getScavengerProgress(items);
      expect(progress.checked).toBe(SCAVENGER_ITEMS.length);
      expect(progress.total).toBe(SCAVENGER_ITEMS.length);
      expect(progress.percentage).toBe(100);
    });

    it('should calculate partial progress correctly', () => {
      const items = generateScavengerItems();
      // Check exactly half
      const half = Math.floor(items.length / 2);
      const partial = items.map((item, index) => ({
        ...item,
        isChecked: index < half,
      }));
      const progress = getScavengerProgress(partial);
      expect(progress.checked).toBe(half);
      expect(progress.total).toBe(SCAVENGER_ITEMS.length);
      expect(progress.percentage).toBe(Math.round((half / SCAVENGER_ITEMS.length) * 100));
    });

    it('should round percentage to nearest integer', () => {
      // 1 item checked out of 3 = 33.33% → 33%
      const items = [
        { id: 0, text: 'A', isChecked: true },
        { id: 1, text: 'B', isChecked: false },
        { id: 2, text: 'C', isChecked: false },
      ];
      const progress = getScavengerProgress(items);
      expect(progress.percentage).toBe(33);
    });
  });

  describe('isScavengerComplete', () => {
    it('should return false for empty list', () => {
      expect(isScavengerComplete([])).toBe(false);
    });

    it('should return false when no items are checked', () => {
      const items = generateScavengerItems();
      expect(isScavengerComplete(items)).toBe(false);
    });

    it('should return false when some items are checked', () => {
      const items = generateScavengerItems();
      const partial = toggleScavengerItem(items, 0);
      expect(isScavengerComplete(partial)).toBe(false);
    });

    it('should return true only when all items are checked', () => {
      const items = generateScavengerItems().map((item) => ({
        ...item,
        isChecked: true,
      }));
      expect(isScavengerComplete(items)).toBe(true);
    });

    it('should return false if a single item remains unchecked', () => {
      const items = generateScavengerItems().map((item, index) => ({
        ...item,
        isChecked: index !== SCAVENGER_ITEMS.length - 1, // all except last
      }));
      expect(isScavengerComplete(items)).toBe(false);
    });
  });
});
