import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { fetchWeatherData, type WeatherData } from '@/lib/weather-api';

export interface UseWeatherState {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch and manage weather data
 * Automatically requests location permission and fetches weather for current location
 */
export function useWeather(): UseWeatherState {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Request location permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permesso di localizzazione negato');
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Fetch weather data
      const weatherData = await fetchWeatherData(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
      setWeather(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    weather,
    loading,
    error,
    refresh: fetchWeather,
  };
}

/**
 * Hook to fetch weather for a specific location
 */
export function useWeatherForLocation(
  latitude: number,
  longitude: number
): UseWeatherState {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const weatherData = await fetchWeatherData(latitude, longitude);
      setWeather(weatherData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto';
      setError(errorMessage);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [latitude, longitude]);

  return {
    weather,
    loading,
    error,
    refresh: fetchWeather,
  };
}
