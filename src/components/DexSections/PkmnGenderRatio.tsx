import React from 'react';

interface PkmnGenderRatioProps {
  subTitle: React.FC<{ children: React.ReactNode }>;
  /** Gender rate from the API: -1 = genderless, 0–8 = female proportion in eighths */
  genderRate: number;
}

/**
 * Renders a progress bar showing the male/female ratio, or "Genderless"
 * for gender-unknown Pokémon. Includes full ARIA attributes so screen
 * readers announce the ratio (e.g. "Male: 87.5%").
 */
const PkmnGenderRatio: React.FC<PkmnGenderRatioProps> = ({
  subTitle: SubTitle,
  genderRate,
}: PkmnGenderRatioProps) => {
  const malePercent = 12.5 * (8 - genderRate);
  const femalePercent = 12.5 * genderRate;

  return (
    <div id="gender-ratio">
      <SubTitle>Gender Ratio</SubTitle>
      <div
        className="progress"
        style={{ height: '1.5rem' }}
        role="group"
        aria-label="Gender ratio"
      >
        {genderRate !== -1 ? (
          <>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${malePercent}%` }}
              aria-valuenow={malePercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Male: ${malePercent}%`}
            >
              <strong>
                {`${malePercent}%`}
                {' '}
                (M)
              </strong>
            </div>
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: `${femalePercent}%` }}
              aria-valuenow={femalePercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Female: ${femalePercent}%`}
            >
              <strong>
                {`${femalePercent}%`}
                {' '}
                (F)
              </strong>
            </div>
          </>
        ) : (
          <div
            className="progress-bar bg-dark"
            role="progressbar"
            style={{ width: '100%' }}
            aria-valuenow={100}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Genderless Pokémon"
          >
            <strong>Genderless</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default PkmnGenderRatio;
