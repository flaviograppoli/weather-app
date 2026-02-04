import { ScrollView, Text, View, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useWeather } from '@/hooks/use-weather';
import { getWeatherInfo, formatTemperature, getDayName, getShortDayName } from '@/lib/weather-api';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';

export default function ForecastScreen() {
  const { weather, loading, error, refresh } = useWeather();
  const colors = useColors();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  if (error && !weather) {
    return (
      <ScreenContainer className="p-6 justify-center items-center">
        <View className="items-center gap-4">
          <IconSymbol name="exclamationmark.circle" size={48} color={colors.error} />
          <Text className="text-lg font-semibold text-foreground text-center">Errore</Text>
          <Text className="text-sm text-muted text-center">{error}</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (loading && !weather) {
    return (
      <ScreenContainer className="justify-center items-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </ScreenContainer>
    );
  }

  if (!weather) {
    return (
      <ScreenContainer className="p-6 justify-center items-center">
        <Text className="text-lg text-muted">Nessun dato disponibile</Text>
      </ScreenContainer>
    );
  }

  const forecastDays = weather.daily.time.map((date, index) => ({
    date,
    weatherCode: weather.daily.weatherCode[index],
    tempMax: weather.daily.temperatureMax[index],
    tempMin: weather.daily.temperatureMin[index],
    precipitation: weather.daily.precipitationProbabilityMax[index],
    windSpeed: weather.daily.windSpeedMax[index],
  }));

  const renderForecastItem = ({ item, index }: { item: (typeof forecastDays)[0]; index: number }) => {
    const weatherInfo = getWeatherInfo(item.weatherCode);
    const isToday = index === 0;
    const dayLabel = isToday ? 'Oggi' : getShortDayName(item.date);

    return (
      <View
        className={`mb-3 p-4 rounded-2xl flex-row items-center justify-between ${
          isToday ? 'bg-primary' : 'bg-surface'
        }`}
      >
        <View className="flex-1 flex-row items-center gap-4">
          <View className="w-16">
            <Text className={`text-sm font-semibold ${isToday ? 'text-white' : 'text-foreground'}`}>
              {dayLabel}
            </Text>
            <Text className={`text-xs ${isToday ? 'text-white opacity-80' : 'text-muted'}`}>
              {new Date(item.date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' })}
            </Text>
          </View>

          <IconSymbol
            name={weatherInfo.icon as any}
            size={32}
            color={isToday ? 'white' : colors.primary}
          />

          <View className="flex-1">
            <Text className={`text-xs ${isToday ? 'text-white opacity-80' : 'text-muted'}`}>
              {weatherInfo.description}
            </Text>
            <Text className={`text-xs ${isToday ? 'text-white opacity-80' : 'text-muted'}`}>
              Pioggia: {item.precipitation}%
            </Text>
          </View>
        </View>

        <View className="items-end gap-1">
          <View className="flex-row gap-2">
            <Text className={`text-lg font-bold ${isToday ? 'text-white' : 'text-foreground'}`}>
              {Math.round(item.tempMax)}°
            </Text>
            <Text className={`text-lg ${isToday ? 'text-white opacity-60' : 'text-muted'}`}>
              {Math.round(item.tempMin)}°
            </Text>
          </View>
          <Text className={`text-xs ${isToday ? 'text-white opacity-80' : 'text-muted'}`}>
            Vento: {Math.round(item.windSpeed)} km/h
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="p-0">
      <FlatList
        data={forecastDays}
        renderItem={renderForecastItem}
        keyExtractor={(item, index) => `${item.date}-${index}`}
        contentContainerStyle={{ padding: 24, paddingTop: 16 }}
        scrollEnabled
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
        }
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-2xl font-bold text-foreground">Previsioni</Text>
            <Text className="text-sm text-muted mt-1">Prossimi 7 giorni</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}
