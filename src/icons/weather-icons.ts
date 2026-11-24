import { TemplateResult, html, svg } from 'lit';
import { WeatherCondition } from '../types';

export const STANDARD_WEATHER_CONDITIONS: readonly WeatherCondition[] = [
  'sunny',
  'clear-night',
  'partlycloudy',
  'cloudy',
  'rainy',
  'pouring',
  'lightning',
  'lightning-rainy',
  'snowy',
  'snowy-rainy',
  'hail',
  'fog',
  'windy',
  'windy-variant',
  'exceptional',
];

export type IconCondition = WeatherCondition | 'unknown' | 'thermometer';

function renderSunCore(cx: number, cy: number, r: number, withRays = true) {
  const rayOffsets = [0, 45, 90, 135, 180, 225, 270, 315];
  return svg`
    <circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="#FFE8B6" fill-opacity="0.45" />
    ${
      withRays
        ? rayOffsets.map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const inner = r + 3.5;
            const outer = r + 7.5;
            const x1 = (cx + Math.cos(rad) * inner).toFixed(2);
            const y1 = (cy + Math.sin(rad) * inner).toFixed(2);
            const x2 = (cx + Math.cos(rad) * outer).toFixed(2);
            const y2 = (cy + Math.sin(rad) * outer).toFixed(2);
            return svg`
              <line
                x1="${x1}"
                y1="${y1}"
                x2="${x2}"
                y2="${y2}"
                stroke="#FFD175"
                stroke-width="2.8"
                stroke-linecap="round"
              />
            `;
          })
        : null
    }
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFD57E" />
    <circle cx="${cx - r * 0.22}" cy="${cy - r * 0.22}" r="${r * 0.48}" fill="#FFE9B0" fill-opacity="0.65" />
  `;
}

function renderMoonCore(cx: number, cy: number, scale = 1) {
  return svg`
    <g transform="translate(${cx}, ${cy}) scale(${scale})">
      <circle cx="0" cy="0" r="16" fill="#DCD6FF" fill-opacity="0.22" />
      <path
        d="M5 -12.5A13 13 0 1 0 13.5 7.5A10.5 10.5 0 0 1 5 -12.5Z"
        fill="#D6CCFF"
      />
      <circle cx="-11" cy="-9" r="1.6" fill="#F2EEFF" />
      <circle cx="11" cy="-8" r="1.3" fill="#CFE1FF" />
    </g>
  `;
}

function renderCloudShape(
  offsetX = 0,
  offsetY = 0,
  scale = 1,
  fill = '#E5EFF8',
  highlight = '#F6FAFF'
) {
  return svg`
    <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
      <path
        d="M18 45h27a10.5 10.5 0 0 0 1.4-20.9A14.5 14.5 0 0 0 18.7 21A11.5 11.5 0 0 0 18 45Z"
        fill="${fill}"
      />
      <path
        d="M21 29.5a11.5 11.5 0 0 1 20.6-3.2"
        fill="none"
        stroke="${highlight}"
        stroke-width="2"
        stroke-linecap="round"
        stroke-opacity="0.7"
      />
    </g>
  `;
}

function renderRainDrops(count: 2 | 3 | 4, intense = false) {
  const color = intense ? '#7EB4E8' : '#96C6F2';
  const length = intense ? 8 : 6.5;
  const xs = count === 2 ? [24, 38] : count === 3 ? [21, 31, 41] : [18, 27, 36, 45];
  return svg`
    ${xs.map((x, idx) => {
      const y1 = intense && idx % 2 === 1 ? 47 : 49;
      return svg`
        <line
          x1="${x}"
          y1="${y1}"
          x2="${x - 2.2}"
          y2="${y1 + length}"
          stroke="${color}"
          stroke-width="3"
          stroke-linecap="round"
        />
      `;
    })}
  `;
}

function renderSnowflakes(positions: readonly [number, number][]) {
  return svg`
    ${positions.map(
      ([x, y]) => svg`
        <g transform="translate(${x}, ${y})">
          <circle cx="0" cy="0" r="2.7" fill="#BEE0FB" />
          <circle cx="0" cy="0" r="1.2" fill="#F2F8FF" />
        </g>
      `
    )}
  `;
}

function renderWindLines(yOffset = 0, compact = false) {
  const scale = compact ? 0.85 : 1;
  return svg`
    <g transform="translate(0, ${yOffset}) scale(${scale})">
      <path
        d="M12 26h28a5.5 5.5 0 1 0-5.2-7.3"
        fill="none"
        stroke="#9BD6DE"
        stroke-width="3.2"
        stroke-linecap="round"
      />
      <path
        d="M16 35h33a4.8 4.8 0 1 1-4.5 6.4"
        fill="none"
        stroke="#B5E3E8"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M12 44h18"
        fill="none"
        stroke="#C7EBEF"
        stroke-width="2.8"
        stroke-linecap="round"
      />
    </g>
  `;
}

function getIconBody(condition: IconCondition, isNight: boolean) {
  switch (condition) {
    case 'sunny':
      return isNight ? renderMoonCore(32, 32, 1.15) : renderSunCore(32, 32, 13.5, true);

    case 'clear-night':
      return renderMoonCore(32, 32, 1.2);

    case 'partlycloudy':
      return svg`
        ${isNight ? renderMoonCore(42, 22, 0.82) : renderSunCore(43, 22, 9.5, true)}
        ${renderCloudShape(-2, 4, 0.96, '#E4EEF8', '#FFFFFF')}
      `;

    case 'cloudy':
      return svg`
        ${renderCloudShape(9, -6, 0.78, '#C8D8EA', '#E4EEF8')}
        ${renderCloudShape(-2, 3, 0.98, '#E4EEF8', '#FFFFFF')}
      `;

    case 'rainy':
      return svg`
        ${renderCloudShape(0, -3, 0.96, '#CFE0F2', '#F0F6FC')}
        ${renderRainDrops(3, false)}
      `;

    case 'pouring':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#BCCEE6', '#E3ECF8')}
        ${renderRainDrops(4, true)}
      `;

    case 'lightning':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#C4D1E6', '#E8EFFA')}
        <path
          d="M34 39l-5.5 9.5h5.5l-3 9.5 9-12h-5.5l3.5-7z"
          fill="#FFE08A"
          stroke="#F7C761"
          stroke-width="1"
          stroke-linejoin="round"
        />
      `;

    case 'lightning-rainy':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#BFCDE4', '#E3ECF8')}
        <path
          d="M33 40l-4.8 8.2h4.6l-2.5 8.3 7.8-10.3h-4.7l2.9-6.2z"
          fill="#FFE08A"
        />
        ${renderRainDrops(2, false)}
      `;

    case 'snowy':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#DCE9F6', '#FFFFFF')}
        ${renderSnowflakes([
          [22, 50],
          [32, 54],
          [42, 50],
        ])}
      `;

    case 'snowy-rainy':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#D4E4F4', '#F8FBFF')}
        ${renderRainDrops(2, false)}
        ${renderSnowflakes([[31.5, 53]])}
      `;

    case 'hail':
      return svg`
        ${renderCloudShape(0, -4, 0.96, '#CFE0F2', '#F4F9FF')}
        <polygon points="22,47 25,51 22,55 19,51" fill="#A9D2F5" />
        <polygon points="32,50 35,54 32,58 29,54" fill="#CBE4FA" />
        <polygon points="42,47 45,51 42,55 39,51" fill="#A9D2F5" />
      `;

    case 'fog':
      return svg`
        ${renderCloudShape(2, -7, 0.88, '#DCE7F3', '#F5F9FE')}
        <line x1="14" y1="43" x2="50" y2="43" stroke="#C0D2E5" stroke-width="3.2" stroke-linecap="round" />
        <line x1="18" y1="50" x2="46" y2="50" stroke="#CEDCEB" stroke-width="3" stroke-linecap="round" />
        <line x1="22" y1="56.5" x2="42" y2="56.5" stroke="#DCE6F2" stroke-width="2.6" stroke-linecap="round" />
      `;

    case 'windy':
      return renderWindLines(0, false);

    case 'windy-variant':
      return svg`
        ${renderCloudShape(2, -9, 0.8, '#DDE9F5', '#FFFFFF')}
        ${renderWindLines(13, true)}
      `;

    case 'exceptional':
      return svg`
        <circle cx="32" cy="32" r="19" fill="#FFB5A7" fill-opacity="0.32" />
        <circle cx="32" cy="32" r="14" fill="#FFA696" />
        <line x1="32" y1="24" x2="32" y2="34" stroke="#FFF9F7" stroke-width="3.2" stroke-linecap="round" />
        <circle cx="32" cy="40" r="1.9" fill="#FFF9F7" />
      `;

    case 'thermometer':
      return svg`
        <rect x="27" y="13" width="10" height="29" rx="5" fill="#DCE8F5" />
        <circle cx="32" cy="45" r="9.5" fill="#DCE8F5" />
        <rect x="30" y="24" width="4" height="19" rx="2" fill="#FFA89E" />
        <circle cx="32" cy="45" r="5.8" fill="#FFA89E" />
        <circle cx="30" cy="43" r="1.8" fill="#FFD5CE" />
      `;

    case 'unknown':
    default:
      return svg`
        ${renderCloudShape(0, 0, 0.94, '#D6E2EE', '#F0F6FC')}
        <circle cx="32" cy="35" r="2.2" fill="#8EA7C2" />
      `;
  }
}

/**
 * Renders a minimalist pastel SVG weather icon.
 * Root <svg> is wrapped with html`` and dynamic children use svg`` per Lit rules.
 */
export function renderWeatherIcon(
  condition: IconCondition,
  isNight: boolean,
  className = 'weather-svg',
  ariaLabel = ''
): TemplateResult {
  return html`
    <svg
      class="${className}"
      viewBox="0 0 64 64"
      role="img"
      aria-label="${ariaLabel}"
      aria-hidden="${ariaLabel ? 'false' : 'true'}"
    >
      ${getIconBody(condition, isNight)}
    </svg>
  `;
}
