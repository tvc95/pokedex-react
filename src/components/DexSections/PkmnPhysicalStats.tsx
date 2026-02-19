import React from 'react';

interface PkmnPhysicalStatsProps {
  /** Styled wrapper component for the physical info grid */
  wrapper: React.FC<{ children: React.ReactNode }>;
  /** Height in decimetres (from the API) */
  height: number;
  /** Weight in hectograms (from the API) */
  weight: number;
  /** Capture rate (0–255) from the species endpoint */
  captureRate: number;
}

/**
 * Renders height (m), weight (kg), and catch rate (%) in a grid layout.
 */
const PkmnPhysicalStats: React.FC<PkmnPhysicalStatsProps> = ({
  wrapper: Wrapper,
  height,
  weight,
  captureRate,
}: PkmnPhysicalStatsProps) => (
  <Wrapper>
    <div id="height">
      <h2>Height</h2>
      <h3>
        {height / 10}
        m
      </h3>
    </div>

    <div id="weight">
      <h2>Weight</h2>
      <h3>
        {weight / 10}
        kg
      </h3>
    </div>

    <div id="catch-rate">
      <h2>Catch rate</h2>
      <h3>
        {((captureRate * 100) / 378).toFixed(1)}
        %
      </h3>
    </div>
  </Wrapper>
);

export default PkmnPhysicalStats;
