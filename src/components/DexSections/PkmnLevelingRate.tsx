import React from 'react';

interface PkmnLevelingRateProps {
  subTitle: React.FC<{ children: React.ReactNode }>;
  /** The raw growth rate name from the API (e.g. "medium", "fast") */
  growthRateName: string;
  /** Decimal proportion (0–1) for the progress bar width */
  growthRate: number;
}

/**
 * Maps the two "confusingly named" growth rates to their commonly
 * used aliases so the progress bar shows a friendlier label.
 */
const getDisplayName = (name: string): string => {
  if (name === 'slow-then-very-fast') return 'erratic';
  if (name === 'fast-then-very-slow') return 'fluctuating';
  return name;
};

/**
 * Renders a dual progress bar showing the Pokémon's leveling rate.
 * The green portion represents speed, the dark portion represents
 * the remainder.
 */
const PkmnLevelingRate: React.FC<PkmnLevelingRateProps> = ({
  subTitle: SubTitle,
  growthRateName,
  growthRate,
}: PkmnLevelingRateProps) => {
  const displayName = getDisplayName(growthRateName);
  const greenPercent = 100 * growthRate;
  const darkPercent = 100 - greenPercent;

  return (
    <div id="leveling-rate">
      <SubTitle>Leveling rate</SubTitle>
      <div className="progress" style={{ height: '1.5rem' }}>
        <div
          className="progress-bar progress-bar-striped bg-success"
          role="progressbar"
          style={{ width: `${greenPercent}%` }}
        >
          <strong>{growthRate >= 0.4 && displayName}</strong>
        </div>
        <div
          className="progress-bar bg-dark"
          role="progressbar"
          style={{ width: `${darkPercent}%` }}
        >
          <strong>{growthRate < 0.4 && displayName}</strong>
        </div>
      </div>
    </div>
  );
};

export default PkmnLevelingRate;
