import { useEffect, useRef } from 'react';
import { Chart, RadarController, RadialLinearScale, PointElement, LineElement, Filler } from 'chart.js';
import type { AppModeScores } from '../data/types';
import { useT } from '../i18n/useT';

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler);

interface ModeRadarProps {
  modes: AppModeScores;
  color: string;
  size?: number;
  /** Off for the tiny card-corner version — axis labels don't fit at
   * ~60px and would just render as clipped noise. */
  showLabels?: boolean;
}

/** A small individual radar — three axes, always Reflecting / Exploring /
 * Reading in that order, each scored independently out of 10. Two apps can
 * share a similar shape (e.g. both pure self-assessment quizzes); that's
 * honest, not a chart bug — see the time-estimate badge shown alongside it
 * (in the detail view) for what actually tells them apart. */
export function ModeRadar({ modes, color, size = 150, showLabels = true }: ModeRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const { t } = useT();

  useEffect(() => {
    if (!canvasRef.current) return;
    chartRef.current = new Chart(canvasRef.current, {
      type: 'radar',
      data: {
        labels: [t('filter_reflecting'), t('filter_exploring'), t('filter_reading')],
        datasets: [
          {
            data: [modes.reflecting, modes.exploring, modes.reading],
            borderColor: color,
            backgroundColor: `${color}22`,
            pointBackgroundColor: color,
            borderWidth: 2,
            pointRadius: showLabels ? 3 : 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: showLabels ? undefined : false,
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: { display: false },
            grid: { color: 'rgba(150, 140, 125, 0.25)' },
            angleLines: { color: 'rgba(150, 140, 125, 0.25)' },
            pointLabels: showLabels
              ? { font: { size: 11 }, color: '#84796b' }
              : { display: false },
          },
        },
        plugins: { legend: { display: false } },
      },
    });
    return () => chartRef.current?.destroy();
  }, [modes, color, showLabels, t]);

  return (
    <div style={{ position: 'relative', width: '100%', height: size }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Reflecting ${modes.reflecting}, exploring ${modes.exploring}, reading ${modes.reading}, out of 10`}
      />
    </div>
  );
}
