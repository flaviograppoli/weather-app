import { describe, it, expect } from 'vitest';
import {
  getWeatherInfo,
  formatTemperature,
  formatWindSpeed,
  getDayName,
  getShortDayName,
  weatherCodeDescriptions,
} from './weather-api';

describe('Weather API Utilities', () => {
  describe('getWeatherInfo', () => {
    it('should return correct weather info for code 0 (clear sky)', () => {
      const info = getWeatherInfo(0);
      expect(info.description).toBe('Sereno');
      expect(info.icon).toBe('sun.max.fill');
    });

    it('should return correct weather info for code 3 (cloudy)', () => {
      const info = getWeatherInfo(3);
      expect(info.description).toBe('Nuvoloso');
      expect(info.icon).toBe('cloud.fill');
    });

    it('should return correct weather info for code 61 (rain)', () => {
      const info = getWeatherInfo(61);
      expect(info.description).toBe('Pioggia leggera');
      expect(info.icon).toBe('cloud.rain.fill');
    });

    it('should return unknown for invalid code', () => {
      const info = getWeatherInfo(999);
      expect(info.description).toBe('Sconosciuto');
      expect(info.icon).toBe('questionmark.circle.fill');
    });
  });

  describe('formatTemperature', () => {
    it('should format temperature in Celsius', () => {
      expect(formatTemperature(22.5, 'C')).toBe('23°C');
      expect(formatTemperature(0, 'C')).toBe('0°C');
      expect(formatTemperature(-5.2, 'C')).toBe('-5°C');
    });

    it('should format temperature in Fahrenheit', () => {
      expect(formatTemperature(0, 'F')).toBe('32°F');
      expect(formatTemperature(20, 'F')).toBe('68°F');
    });

    it('should default to Celsius', () => {
      expect(formatTemperature(22.5)).toBe('23°C');
    });
  });

  describe('formatWindSpeed', () => {
    it('should format wind speed in km/h', () => {
      expect(formatWindSpeed(10, 'kmh')).toBe('10 km/h');
      expect(formatWindSpeed(25.5, 'kmh')).toBe('26 km/h');
    });

    it('should format wind speed in m/s', () => {
      expect(formatWindSpeed(36, 'ms')).toBe('10 m/s');
    });

    it('should default to km/h', () => {
      expect(formatWindSpeed(15)).toBe('15 km/h');
    });
  });

  describe('getDayName', () => {
    it('should return Italian day name', () => {
      // 2026-02-04 is a Tuesday
      const dayName = getDayName('2026-02-04');
      expect(dayName.toLowerCase()).toContain('martedì');
    });
  });

  describe('getShortDayName', () => {
    it('should return short Italian day name', () => {
      // 2026-02-04 is a Wednesday
      const dayName = getShortDayName('2026-02-04');
      expect(dayName.length).toBeLessThanOrEqual(3);
    });
  });

  describe('weatherCodeDescriptions', () => {
    it('should have descriptions for common weather codes', () => {
      expect(weatherCodeDescriptions[0]).toBeDefined();
      expect(weatherCodeDescriptions[3]).toBeDefined();
      expect(weatherCodeDescriptions[61]).toBeDefined();
      expect(weatherCodeDescriptions[95]).toBeDefined();
    });

    it('should have icon property for all codes', () => {
      Object.values(weatherCodeDescriptions).forEach((info) => {
        expect(info.icon).toBeDefined();
        expect(info.description).toBeDefined();
      });
    });
  });
});
