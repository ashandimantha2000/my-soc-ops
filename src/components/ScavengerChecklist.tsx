import type { ScavengerItem } from '../types';
import { getScavengerProgress } from '../utils/scavengerLogic';

interface ScavengerChecklistProps {
  items: ScavengerItem[];
  onItemToggle: (id: number) => void;
}

export function ScavengerChecklist({ items, onItemToggle }: ScavengerChecklistProps) {
  const { checked, total, percentage } = getScavengerProgress(items);

  return (
    <div className="w-full max-w-lg mx-auto px-3 pb-6">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-semibold text-gray-700">Progress</span>
          <span className="text-sm font-semibold text-gray-700">
            {checked}/{total} &mdash; {percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-scavenger h-3 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${checked} of ${total} items found`}
          />
        </div>
      </div>

      {/* Checklist — vertical on mobile, grid on desktop */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="list">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemToggle(item.id)}
              aria-pressed={item.isChecked}
              aria-label={item.text}
              className={[
                'w-full flex items-start gap-3 p-3 rounded-lg border text-left text-sm transition-all duration-150',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scavenger',
                item.isChecked
                  ? 'bg-scavenger-light border-scavenger text-green-900'
                  : 'bg-white border-gray-200 text-gray-700 active:bg-gray-50',
              ].join(' ')}
            >
              {/* Checkbox indicator */}
              <span
                className={[
                  'flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                  item.isChecked
                    ? 'bg-scavenger border-scavenger text-white'
                    : 'border-gray-300 bg-white',
                ].join(' ')}
                aria-hidden="true"
              >
                {item.isChecked && (
                  <svg
                    viewBox="0 0 12 10"
                    fill="none"
                    className="w-3 h-3"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className={item.isChecked ? 'line-through opacity-75' : ''}>
                {item.text}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
