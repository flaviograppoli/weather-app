import { ScrollView, Text, View, RefreshControl, Pressable, ActivityIndicator } from 'react-native';
import { ScreenContainer } from '@/components/screen-container';
import { useWeather } from '@/hooks/use-weather';
import { getWeatherInfo, formatTemperature, formatWindSpeed, getDayName } from '@/lib/weather-api';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useState } from 'react';

export default function HomeScreen() {
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
          <Pressable
            onPress={handleRefresh}
            style={({ pressed }) => [
              {
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 8,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text className="text-white font-semibold">Riprova</Text>
          </Pressable>
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

  const weatherInfo = getWeatherInfo(weather.current.weatherCode);
  const currentDate = new Date(weather.current.time);
  const dayName = getDayName(weather.current.time);

  return (
    <ScreenContainer className="p-0">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor={colors.primary} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-sm text-muted">Oggi</Text>
          <Text className="text-2xl font-bold text-foreground">{dayName}</Text>
          <Text className="text-sm text-muted">{currentDate.toLocaleDateString('it-IT')}</Text>
        </View>

        {/* Main Weather Card */}
        <View className="px-6 pb-6">
          <View className="bg-surface rounded-3xl p-8 items-center gap-4">
            <IconSymbol name={weatherInfo.icon as any} size={80} color={colors.primary} />
            <Text className="text-6xl font-bold text-foreground">{Math.round(weather.current.temperature)}°</Text>
            <Text className="text-xl text-muted">{weatherInfo.description}</Text>
            <Text className="text-sm text-muted">Percepita: {formatTemperature(weather.current.feelsLike)}</Text>
          </View>
        </View>

        {/* Details Grid */}
        <View className="px-6 pb-6">
          <View className="gap-3">
            {/* Row 1 */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Umidità</Text>
                <Text className="text-xl font-semibold text-foreground">{weather.current.humidity}%</Text>
              </View>
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Vento</Text>
                <Text className="text-xl font-semibold text-foreground">{formatWindSpeed(weather.current.windSpeed)}</Text>
              </View>
            </View>

            {/* Row 2 */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Pressione</Text>
                <Text className="text-xl font-semibold text-foreground">{Math.round(weather.current.pressure)} hPa</Text>
              </View>
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Visibilità</Text>
                <Text className="text-xl font-semibold text-foreground">{Math.round(weather.current.visibility / 1000)} km</Text>
              </View>
            </View>

            {/* Row 3 */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Indice UV</Text>
                <Text className="text-xl font-semibold text-foreground">{Math.round(weather.current.uvIndex)}</Text>
              </View>
              <View className="flex-1 bg-surface rounded-2xl p-4">
                <Text className="text-xs text-muted mb-2">Aggiornato</Text>
                <Text className="text-xl font-semibold text-foreground">{new Date(weather.current.time).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Spacer */}
        <View className="flex-1" />
      </ScrollView>
    </ScreenContainer>
  );
}
