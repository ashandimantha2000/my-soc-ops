import { SCAVENGER_ITEMS } from '../data/scavengerItems';
import type { ScavengerItem } from '../types';

/** Generate the initial list of scavenger hunt items (all unchecked) */
export function generateScavengerItems(): ScavengerItem[] {
  return SCAVENGER_ITEMS.map((text, index) => ({
    id: index,
    text,
    isChecked: false,
  }));
}

/** Toggle the checked state of a single scavenger item */
export function toggleScavengerItem(items: ScavengerItem[], id: number): ScavengerItem[] {
  return items.map((item) =>
    item.id === id ? { ...item, isChecked: !item.isChecked } : item
  );
}

export interface ScavengerProgress {
  checked: number;
  total: number;
  percentage: number;
}

/** Calculate how many items have been checked and the overall percentage */
export function getScavengerProgress(items: ScavengerItem[]): ScavengerProgress {
  const total = items.length;
  const checked = items.filter((item) => item.isChecked).length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
  return { checked, total, percentage };
}

/** Return true only when every item is checked (100% completion) */
export function isScavengerComplete(items: ScavengerItem[]): boolean {
  return items.length > 0 && items.every((item) => item.isChecked);
}
