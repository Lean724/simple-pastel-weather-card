import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

const ROOT = resolve(process.cwd());

function compileModulesForTest(outDir) {
  const files = [
    resolve(ROOT, 'src/types.ts'),
    resolve(ROOT, 'src/localize/localize.ts'),
    resolve(ROOT, 'src/styles/pastel-themes.ts'),
    resolve(ROOT, 'src/forecast.ts'),
    resolve(ROOT, 'src/helpers.ts'),
    resolve(ROOT, 'src/icons/weather-icons.ts'),
  ];

  const compilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    outDir,
    rootDir: resolve(ROOT, 'src'),
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
  };

  const host = ts.createCompilerHost(compilerOptions);
  const originalWriteFile = host.writeFile.bind(host);
  host.writeFile = (fileName, text, writeByteOrderMark, onError, sourceFiles) => {
    const fixedText = text.replace(
      /(from\s+['"])(\.[^'"]+?)(['"])/g,
      (match, p1, spec, p3) => (spec.endsWith('.js') ? match : `${p1}${spec}.js${p3}`)
    );
    originalWriteFile(fileName, fixedText, writeByteOrderMark, onError, sourceFiles);
  };

  const program = ts.createProgram(files, compilerOptions, host);
  const emitResult = program.emit();
  const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
  const errors = diagnostics.filter((d) => d.category === ts.DiagnosticCategory.Error);

  if (errors.length > 0) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(errors, {
      getCurrentDirectory: () => ROOT,
      getCanonicalFileName: (f) => f,
      getNewLine: () => '\n',
    });
    throw new Error(`TypeScript compilation errors:\n${formatted}`);
  }

  writeFileSync(join(outDir, 'package.json'), JSON.stringify({ type: 'module' }));
  symlinkSync(
    join(ROOT, 'node_modules'),
    join(outDir, 'node_modules'),
    process.platform === 'win32' ? 'junction' : 'dir'
  );
}

function collectNestedKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...collectNestedKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys.sort();
}

async function runTests() {
  const tempOut = mkdtempSync(join(tmpdir(), 'spwc-test-'));
  let passed = 0;
  const check = (name, fn) => {
    const result = fn();
    if (result instanceof Promise) {
      return result.then(() => {
        passed += 1;
        console.log(`  ✓ ${name}`);
      });
    }
    passed += 1;
    console.log(`  ✓ ${name}`);
    return Promise.resolve();
  };

  try {
    console.log('1. Checking build artifacts...');
    await check('dist/simple-pastel-weather-card.js and root simple-pastel-weather-card.js exist and match', () => {
      const distPath = join(ROOT, 'dist', 'simple-pastel-weather-card.js');
      const rootPath = join(ROOT, 'simple-pastel-weather-card.js');
      assert.equal(existsSync(distPath), true, 'Missing dist/simple-pastel-weather-card.js');
      assert.equal(existsSync(rootPath), true, 'Missing root simple-pastel-weather-card.js');
      const distContent = readFileSync(distPath, 'utf8');
      const rootContent = readFileSync(rootPath, 'utf8');
      assert.ok(distContent.length > 1000, 'Built bundle looks unexpectedly small');
      assert.equal(distContent, rootContent, 'Root bundle differs from dist bundle');
    });

    console.log('2. Compiling TypeScript modules for logic verification...');
    compileModulesForTest(tempOut);

    const localizeMod = await import(pathToFileURL(join(tempOut, 'localize/localize.js')).href);
    const themeMod = await import(pathToFileURL(join(tempOut, 'styles/pastel-themes.js')).href);
    const forecastMod = await import(pathToFileURL(join(tempOut, 'forecast.js')).href);
    const helpersMod = await import(pathToFileURL(join(tempOut, 'helpers.js')).href);
    const iconsMod = await import(pathToFileURL(join(tempOut, 'icons/weather-icons.js')).href);

    console.log('3. Checking 10 mandatory languages & key parity...');
    const expectedLangs = ['en', 'es', 'zh-Hans', 'de', 'it', 'fr', 'pt', 'ru', 'pl', 'nl'];

    await check('All 10 mandatory languages exist and share identical keys with non-empty strings', () => {
      assert.deepEqual([...localizeMod.SUPPORTED_LANGUAGES], expectedLangs);
      const baseKeys = collectNestedKeys(localizeMod.TRANSLATIONS.en);
      assert.ok(baseKeys.length > 30);

      for (const lang of expectedLangs) {
        const langObj = localizeMod.TRANSLATIONS[lang];
        assert.ok(langObj, `Missing translations for ${lang}`);
        const langKeys = collectNestedKeys(langObj);
        assert.deepEqual(langKeys, baseKeys, `Key mismatch for language ${lang}`);
        for (const key of langKeys) {
          const translated = localizeMod.localize(key, lang);
          assert.equal(typeof translated, 'string');
          assert.ok(translated.trim().length > 0, `Empty string for ${lang}.${key}`);
        }
      }
    });

    await check('Language resolver handles regional variants and falls back to en', () => {
      assert.equal(localizeMod.resolveLanguage('es-AR'), 'es');
      assert.equal(localizeMod.resolveLanguage('zh-CN'), 'zh-Hans');
      assert.equal(localizeMod.resolveLanguage('zh-Hans'), 'zh-Hans');
      assert.equal(localizeMod.resolveLanguage('pt-BR'), 'pt');
      assert.equal(localizeMod.resolveLanguage('nl-NL'), 'nl');
      assert.equal(localizeMod.resolveLanguage('ja'), 'en');
      assert.equal(localizeMod.resolveLanguage(undefined), 'en');
    });

    console.log('4. Checking Sections grid options...');
    await check('computeGridOptions matches Sections units for all 4 orientation/forecast modes', () => {
      assert.deepEqual(
        helpersMod.computeGridOptions({ type: 'custom:simple-pastel-weather-card', orientation: 'horizontal', show_forecast: false }),
        { columns: 6, min_columns: 6, max_columns: 12, rows: 1, min_rows: 1 }
      );
      assert.deepEqual(
        helpersMod.computeGridOptions({ type: 'custom:simple-pastel-weather-card', orientation: 'vertical', show_forecast: false }),
        { columns: 3, min_columns: 3, max_columns: 12, rows: 2, min_rows: 2 }
      );
      assert.deepEqual(
        helpersMod.computeGridOptions({ type: 'custom:simple-pastel-weather-card', orientation: 'horizontal', show_forecast: true }),
        { columns: 12, min_columns: 12, max_columns: 12, rows: 2, min_rows: 2 }
      );
      assert.deepEqual(
        helpersMod.computeGridOptions({ type: 'custom:simple-pastel-weather-card', orientation: 'vertical', show_forecast: true }),
        { columns: 6, min_columns: 6, max_columns: 12, rows: 4, min_rows: 4 }
      );
    });

    console.log('5. Checking forecast date parsing, adaptive count, and WS subscription manager...');
    await check('parseLocalDate parses YYYY-MM-DD in local time without UTC day shift', () => {
      const parsed = forecastMod.parseLocalDate('2026-11-24');
      assert.ok(parsed instanceof Date);
      assert.equal(parsed.getFullYear(), 2026);
      assert.equal(parsed.getMonth(), 10);
      assert.equal(parsed.getDate(), 24);
      assert.equal(forecastMod.parseLocalDate('invalid-date'), null);
    });

    await check('computeAdaptiveForecastCount adapts to container width/height and respects max cap', () => {
      assert.equal(forecastMod.computeAdaptiveForecastCount(520, 120, 'horizontal'), 5);
      assert.equal(forecastMod.computeAdaptiveForecastCount(520, 120, 'horizontal', 3), 3);
      assert.equal(forecastMod.computeAdaptiveForecastCount(340, 120, 'horizontal'), 2);
      assert.equal(forecastMod.computeAdaptiveForecastCount(270, 270, 'vertical'), 4);
      assert.equal(forecastMod.computeAdaptiveForecastCount(270, 270, 'vertical', 2), 2);
    });

    await check('resolveForecastItems preserves configured items > 3 and applies daily/hourly defaults', () => {
      const sampleForecast = Array.from({ length: 14 }, (_, idx) => ({
        datetime: `2026-11-${String(idx + 1).padStart(2, '0')}`,
        condition: 'sunny',
        temperature: 25 + idx,
      }));
      assert.equal(forecastMod.resolveForecastItems(sampleForecast, 'daily').length, 7);
      assert.equal(forecastMod.resolveForecastItems(sampleForecast, 'hourly').length, 12);
      assert.equal(forecastMod.resolveForecastItems(sampleForecast, 'daily', 5).length, 5);
      assert.equal(forecastMod.resolveForecastItems(sampleForecast, 'daily', 10).length, 10);
      assert.deepEqual(forecastMod.resolveForecastItems([], 'daily', 5), []);
    });

    await check('ForecastSubscriptionManager subscribes cleanly and prevents leaked subscriptions on early destroy', async () => {
      const manager = new forecastMod.ForecastSubscriptionManager();
      let unsubCalls = 0;
      let capturedMsg = null;

      let resolveSubscribe;
      let markSubscribeCalled;
      const subscribeCalled = new Promise((res) => {
        markSubscribeCalled = res;
      });

      const hassMock = {
        states: {},
        connection: {
          subscribeMessage(_cb, msg) {
            capturedMsg = msg;
            markSubscribeCalled();
            return new Promise((res) => {
              resolveSubscribe = () => {
                res(() => {
                  unsubCalls += 1;
                });
              };
            });
          },
        },
      };

      const syncPromise = manager.sync(hassMock, 'weather.home', 'daily', true, {
        onData: () => {},
        onError: () => {},
        onLoading: () => {},
      });

      await subscribeCalled;

      assert.deepEqual(capturedMsg, {
        type: 'weather/subscribe_forecast',
        forecast_type: 'daily',
        entity_id: 'weather.home',
      });

      const destroyPromise = manager.destroy();
      resolveSubscribe();
      await Promise.all([syncPromise, destroyPromise]);
      assert.equal(unsubCalls, 1, 'Expected delayed subscribe promise to unsubscribe immediately after destroy');
    });

    console.log('6. Checking weather data resolution, overrides, sensor-only mode, and 3-slot limit...');
    const sampleHass = {
      config: { unit_system: { temperature: '°C' } },
      states: {
        'sun.sun': { entity_id: 'sun.sun', state: 'above_horizon', attributes: {} },
        'weather.home': {
          entity_id: 'weather.home',
          state: 'partlycloudy',
          attributes: { temperature: 24.3, temperature_unit: '°C', friendly_name: 'Home Weather' },
        },
        'sensor.garden_temp': {
          entity_id: 'sensor.garden_temp',
          state: '26.4',
          attributes: { unit_of_measurement: '°C', friendly_name: 'Garden Temp', feels_like: 27.8 },
        },
        'sensor.garden_hum': {
          entity_id: 'sensor.garden_hum',
          state: '46',
          attributes: { unit_of_measurement: '%', device_class: 'humidity' },
        },
        'sensor.wind': {
          entity_id: 'sensor.wind',
          state: '14.2',
          attributes: { unit_of_measurement: 'km/h', device_class: 'wind_speed' },
        },
        'sensor.uv': {
          entity_id: 'sensor.uv',
          state: '5',
          attributes: { unit_of_measurement: 'UV' },
        },
        'sensor.extra_ignored': {
          entity_id: 'sensor.extra_ignored',
          state: '1013',
          attributes: { unit_of_measurement: 'hPa' },
        },
        'sensor.broken': {
          entity_id: 'sensor.broken',
          state: 'unavailable',
          attributes: { unit_of_measurement: 'hPa' },
        },
      },
    };

    await check('Weather entity + temperature override + 3-slot cap works properly', () => {
      const resolved = helpersMod.resolveWeatherData(sampleHass, {
        type: 'custom:simple-pastel-weather-card',
        entity: 'weather.home',
        temperature_entity: 'sensor.garden_temp',
        stats: [
          { entity: 'sensor.garden_hum' },
          { entity: 'sensor.wind' },
          { entity: 'sensor.uv' },
          { entity: 'sensor.extra_ignored' },
        ],
      });
      assert.equal(resolved.hasSource, true);
      assert.equal(resolved.hasWeatherEntity, true);
      assert.equal(resolved.condition, 'partlycloudy');
      assert.equal(resolved.temperature, '26.4');
      assert.equal(resolved.temperatureUnit, '°C');
      assert.equal(resolved.stats.length, 3);
      assert.equal(resolved.stats[0].value, '46');
      assert.equal(resolved.stats[0].unit, '%');
      assert.equal(resolved.stats[0].icon, 'mdi:water-percent');
    });

    await check('Sensor-only mode works without weather entity and handles unavailable states', () => {
      const resolved = helpersMod.resolveWeatherData(sampleHass, {
        type: 'custom:simple-pastel-weather-card',
        temperature_entity: 'sensor.garden_temp',
        temperature_attribute: 'feels_like',
        stats: [{ entity: 'sensor.broken' }],
      });
      assert.equal(resolved.hasSource, true);
      assert.equal(resolved.hasWeatherEntity, false);
      assert.equal(resolved.hasExplicitCondition, false);
      assert.equal(resolved.condition, 'unknown');
      assert.equal(resolved.temperature, '27.8');
      assert.equal(resolved.stats[0].unavailable, true);
      assert.equal(resolved.stats[0].value, '—');
    });

    console.log('7. Checking pastel themes & SVG icon coverage...');
    await check('getPastelThemeVariables differentiates day/night dynamic, theme, and transparent modes', () => {
      const day = themeMod.getPastelThemeVariables('sunny', false, 'dynamic');
      const night = themeMod.getPastelThemeVariables('sunny', true, 'dynamic');
      const themeMode = themeMod.getPastelThemeVariables('sunny', false, 'theme');
      const transparentMode = themeMod.getPastelThemeVariables('sunny', false, 'transparent');

      assert.notEqual(day.bg, night.bg);
      assert.ok(day.bg.includes('linear-gradient'));
      assert.ok(night.bg.includes('linear-gradient'));
      assert.ok(themeMode.bg.includes('--ha-card-background'));
      assert.equal(transparentMode.bg, 'transparent');
      assert.equal(transparentMode.border, 'none');
      assert.equal(transparentMode.shadow, 'none');
    });

    await check('weather-icons.ts covers all 15 HA weather conditions without nested svg`<svg>` tags', () => {
      const iconsSource = readFileSync(join(ROOT, 'src/icons/weather-icons.ts'), 'utf8');
      assert.equal(iconsMod.STANDARD_WEATHER_CONDITIONS.length, 15);
      for (const cond of iconsMod.STANDARD_WEATHER_CONDITIONS) {
        assert.ok(
          iconsSource.includes(`'${cond}'`),
          `Missing icon case for condition ${cond}`
        );
        const tpl = iconsMod.renderWeatherIcon(cond, false);
        assert.ok(tpl && typeof tpl === 'object', `Expected TemplateResult for ${cond}`);
      }
      assert.ok(iconsMod.renderWeatherIcon('thermometer', false));
      assert.ok(iconsMod.renderWeatherIcon('unknown', true));
      assert.ok(iconsSource.includes("'thermometer'"));
      assert.ok(!/svg`[^`]*<svg\b/i.test(iconsSource), 'Nested svg`<svg>` is forbidden in Lit');
    });

    await check('card keeps side-by-side horizontal forecast layout and isolates carousel/nav interactions', () => {
      const cardSource = readFileSync(join(ROOT, 'src/simple-pastel-weather-card.ts'), 'utf8');
      assert.ok(!cardSource.includes('.layout-horizontal.with-forecast.stacked'));
      assert.ok(cardSource.includes('.forecast-nav-btn'));
      assert.ok(cardSource.includes('.forecast-scroller'));
      assert.ok(cardSource.includes('_stopInteractionPropagation'));
      assert.ok(cardSource.includes('_isEventFromInteractiveChild'));
      assert.ok(cardSource.includes('forecast-rows-4'));
      assert.ok(cardSource.includes('vertical-row'));
      assert.ok(!cardSource.includes('forecast-grid-2col'));
    });

    console.log(`\nAll ${passed} checks passed!`);
  } finally {
    rmSync(tempOut, { recursive: true, force: true });
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
