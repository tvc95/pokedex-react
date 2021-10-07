/* eslint-disable no-new */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import { Chart, registerables } from 'chart.js';
import React, {
  useState, useEffect, useRef,
} from 'react';
import { CanvasContainer } from './styles';

interface Ability {
  ability: {
    name: string;
  }
  is_hidden: boolean;
}

interface PokeForm {
  form_name: string;
  is_battle_only: boolean;
  is_mega: boolean;
  name: string;
  names: Array<{
    name: string;
    language: {
      name: string;
      url: string;
    };
  }>;
}

interface PokemonVariety {
  abilities: Array<Ability>;
  forms: Array<{
    name: string;
    url: string;
  }>;
  name: string;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    }
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
}

interface CompProps {
  pkmnVarieties: Array<PokemonVariety>;
}

interface PokemonDataset {
  label: string;
  data: Array<number>;
  backgroundColor: Array<string>;
  borderColor: Array<string>;
  borderWidth: number;
}

const BaseStatsChart: React.FC<CompProps> = ({ pkmnVarieties }: CompProps) => {
  /// React State Hooks
  const [load, setLoad] = useState(false);
  const [pokeDatasets, setPokeDatasets] = useState<PokemonDataset[]>([]);

  // Color config presets
  const [backgroundColors] = useState([
    'rgba(0, 250, 220, 0.6)',
    'rgba(212, 112, 40, .6)',
    'rgba(145, 61, 136, .6)',
    'rgba(168, 50, 117, .6)',
    'rgba(201, 237, 220, .6)',
    'rgba(250, 166, 255, .6)',
  ]);
  const [borderColors] = useState([
    'rgba(0, 250, 220, 1)',
    'rgba(212, 112, 40, 1)',
    'rgba(145, 61, 136, 1)',
    'rgba(168, 50, 117, 1)',
    'rgba(201, 237, 220, 1)',
    'rgba(250, 166, 255, 1)',
  ]);

  // Using a ref to store the Chart instance, since it's mutable
  const chartRef = useRef<Chart | null>(null);
  Chart.register(...registerables);

  /// Helper functions
  /**
   * Gets pkmnVarieties data and maps through it, setting the base
   * configuration for each Pokémon base stats dataset
   */
  const getPokemonDatasets = () => {
    const datasets = pkmnVarieties.map((pkmnVariety, idx) => {
      const formatVarietyName = pkmnVariety.name.charAt(0).toUpperCase() + pkmnVariety.name.slice(1);

      return (
        {
          label: formatVarietyName.replace('-', ' '),
          data: [
            pkmnVariety.stats[0].base_stat,
            pkmnVariety.stats[1].base_stat,
            pkmnVariety.stats[2].base_stat,
            pkmnVariety.stats[3].base_stat,
            pkmnVariety.stats[4].base_stat,
            pkmnVariety.stats[5].base_stat,
          ],
          backgroundColor: [
            backgroundColors[idx],
          ],
          borderColor: [
            borderColors[idx],
          ],
          borderWidth: 3,
        }
      );
    });

    setPokeDatasets(datasets);
  };

  /**
   * Creates the chart on the canvas element
   * @param canvas
   * @returns
   */
  const createChart = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;

    const ctxR = canvas.getContext('2d');

    if (ctxR && !chartRef.current) {
      chartRef.current = new Chart(ctxR, {
        type: 'radar',
        data: {
          datasets: pokeDatasets,
          labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1,
          scales: {
            r: {
              beginAtZero: true,
              min: 0,
              max: 255,
              suggestedMax: 255,
              suggestedMin: 0,
              ticks: {
                display: true,
              },
              pointLabels: {
                color: 'black',
                font: {
                  size: 12,
                  family: 'Roboto',
                },
              },
            },
          },
        },
      });
    }
  };

  /// Side effects
  /**
   * Loads dataset and renders canvas
   */
  useEffect(() => {
    function execute() {
      getPokemonDatasets();
      setLoad(true);
    }
    if (!load) {
      execute();
    }
  }, []);

  /**
   * Updates chart rendering
   */
  useEffect(() => {
    // must verify that the chart exists
    const chart = chartRef.current;
    if (chart) {
      chart.data = {
        datasets: pokeDatasets,
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
      };
      chart.update();
    }
  }, [pokeDatasets]);

  return (
    <CanvasContainer>
      {load && (
        <div
          style={{
            maxHeight: '700px',
            maxWidth: '700px',
            textAlign: 'center',
            margin: '0 auto',
          }}
        >
          <canvas
            ref={createChart}
          />
        </div>
      )}
    </CanvasContainer>
  );
};

export default BaseStatsChart;
