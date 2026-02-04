/**
 * Weather API utilities using Open-Meteo (free, no registration required)
 * Documentation: https://open-meteo.com/en/docs
 */

export interface WeatherData {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    humidity: number;
    pressure: number;
    visibility: number;
    feelsLike: number;
    uvIndex: number;
    time: string;
  };
  daily: {
    time: string[];
    weatherCode: number[];
    temperatureMax: number[];
    temperatureMin: number[];
    precipitationProbabilityMax: number[];
    windSpeedMax: number[];
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
  name: string;
  country: string;
  timezone: string;
}

// WMO Weather interpretation codes
export const weatherCodeDescriptions: Record<number, { description: string; icon: string }> = {
  0: { description: 'Sereno', icon: 'sun.max.fill' },
  1: { description: 'Principalmente sereno', icon: 'sun.max.fill' },
  2: { description: 'Parzialmente nuvoloso', icon: 'cloud.sun.fill' },
  3: { description: 'Nuvoloso', icon: 'cloud.fill' },
  45: { description: 'Nebbioso', icon: 'cloud.fog.fill' },
  48: { description: 'Deposito di brina', icon: 'cloud.fog.fill' },
  51: { description: 'Pioggia leggera', icon: 'cloud.drizzle.fill' },
  53: { description: 'Pioggia moderata', icon: 'cloud.drizzle.fill' },
  55: { description: 'Pioggia intensa', icon: 'cloud.drizzle.fill' },
  61: { description: 'Pioggia leggera', icon: 'cloud.rain.fill' },
  63: { description: 'Pioggia moderata', icon: 'cloud.rain.fill' },
  65: { description: 'Pioggia intensa', icon: 'cloud.rain.fill' },
  71: { description: 'Neve leggera', icon: 'cloud.snow.fill' },
  73: { description: 'Neve moderata', icon: 'cloud.snow.fill' },
  75: { description: 'Neve intensa', icon: 'cloud.snow.fill' },
  77: { description: 'Chicchi di neve', icon: 'cloud.snow.fill' },
  80: { description: 'Pioggia leggera', icon: 'cloud.rain.fill' },
  81: { description: 'Pioggia moderata', icon: 'cloud.rain.fill' },
  82: { description: 'Pioggia intensa', icon: 'cloud.rain.fill' },
  85: { description: 'Neve leggera', icon: 'cloud.snow.fill' },
  86: { description: 'Neve intensa', icon: 'cloud.snow.fill' },
  95: { description: 'Temporale', icon: 'cloud.bolt.fill' },
  96: { description: 'Temporale con grandine', icon: 'cloud.bolt.fill' },
  99: { description: 'Temporale con grandine', icon: 'cloud.bolt.fill' },
};

/**
 * Fetch weather data for given coordinates
 */
export async function fetchWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.append('latitude', latitude.toString());
  url.searchParams.append('longitude', longitude.toString());
  url.searchParams.append('current', 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,pressure_msl,visibility,uv_index');
  url.searchParams.append('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max');
  url.searchParams.append('timezone', 'auto');
  url.searchParams.append('forecast_days', '7');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.statusText}`);
  }

  const data = await response.json();

  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    current: {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      pressure: data.current.pressure_msl,
      visibility: data.current.visibility,
      feelsLike: data.current.apparent_temperature,
      uvIndex: data.current.uv_index,
      time: data.current.time,
    },
    daily: {
      time: data.daily.time,
      weatherCode: data.daily.weather_code,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
      precipitationProbabilityMax: data.daily.precipitation_probability_max,
      windSpeedMax: data.daily.wind_speed_10m_max,
    },
  };
}

/**
 * Geocode location name to coordinates
 */
export async function geocodeLocation(query: string): Promise<LocationData[]> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
  url.searchParams.append('name', query);
  url.searchParams.append('count', '10');
  url.searchParams.append('language', 'it');
  url.searchParams.append('format', 'json');

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Geocoding API error: ${response.statusText}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((result: any) => ({
    latitude: result.latitude,
    longitude: result.longitude,
    name: result.name,
    country: result.country || '',
    timezone: result.timezone || 'UTC',
  }));
}

/**
 * Get weather description and icon for a weather code
 */
export function getWeatherInfo(code: number): { description: string; icon: string } {
  return weatherCodeDescriptions[code] || { description: 'Sconosciuto', icon: 'questionmark.circle.fill' };
}

/**
 * Format temperature with unit
 */
export function formatTemperature(temp: number, unit: 'C' | 'F' = 'C'): string {
  if (unit === 'F') {
    const fahrenheit = (temp * 9) / 5 + 32;
    return `${Math.round(fahrenheit)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

/**
 * Format wind speed
 */
export function formatWindSpeed(speed: number, unit: 'kmh' | 'ms' = 'kmh'): string {
  if (unit === 'ms') {
    return `${Math.round(speed / 3.6)} m/s`;
  }
  return `${Math.round(speed)} km/h`;
}

/**
 * Get day name from date string
 */
export function getDayName(dateString: string, locale: string = 'it-IT'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: 'long' });
}

/**
 * Get short day name from date string
 */
export function getShortDayName(dateString: string, locale: string = 'it-IT'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: 'short' });
}
