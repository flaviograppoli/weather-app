# Design dell'App Meteo

## Panoramica
Un'app meteo mobile per iOS/Android che mostra le condizioni meteorologiche attuali e le previsioni future in un'interfaccia pulita e intuitiva, seguendo le linee guida Apple Human Interface Guidelines.

## Orientamento e Usabilità
- **Orientamento**: Verticale (9:16)
- **Uso con una mano**: Tutti i controlli principali accessibili nella metà inferiore dello schermo
- **Stile**: Design nativo iOS, minimalista e funzionale

## Schermate

### 1. Home (Meteo Attuale)
**Contenuto principale**:
- Località corrente (nome città)
- Temperatura attuale (grande, prominente)
- Descrizione condizioni (es. "Soleggiato", "Nuvoloso", "Pioggia")
- Icona meteo animata o statica
- Dettagli secondari in card/sezioni:
  - Temperatura percepita
  - Umidità
  - Velocità del vento
  - Pressione atmosferica
  - Visibilità
  - Indice UV

**Funzionalità**:
- Pull-to-refresh per aggiornare i dati
- Pulsante per cambiare località (in alto a destra)
- Navigazione verso schermata previsioni (tab bar o scroll)

**Layout**:
- Header con località e pulsante impostazioni
- Sezione hero con temperatura e icona meteo
- Card con dettagli meteo organizzati in griglia 2x3
- Sfondo dinamico basato sulle condizioni meteo (opzionale)

### 2. Previsioni Future
**Contenuto principale**:
- Lista di previsioni per i prossimi 7 giorni
- Ogni elemento mostra:
  - Giorno della settimana
  - Icona condizioni meteo
  - Temperatura massima e minima
  - Probabilità di precipitazioni

**Funzionalità**:
- Scroll verticale per vedere tutti i giorni
- Tap su un giorno per vedere dettagli orari (opzionale)
- Pull-to-refresh

**Layout**:
- Lista con card per ogni giorno
- Design consistente con la schermata Home

### 3. Impostazioni (Opzionale)
**Contenuto principale**:
- Selezione unità di misura (Celsius/Fahrenheit)
- Gestione località salvate
- Preferenze notifiche (se implementate)

**Funzionalità**:
- Toggle per unità di misura
- Lista località con possibilità di rimuovere

## Flussi Utente Principali

### Flusso 1: Visualizzare Meteo Attuale
1. Utente apre l'app
2. App mostra automaticamente meteo per località corrente
3. Utente può fare pull-to-refresh per aggiornare

### Flusso 2: Visualizzare Previsioni
1. Utente è nella schermata Home
2. Utente naviga alla tab "Previsioni" o scrolla verso il basso
3. App mostra lista previsioni 7 giorni
4. Utente può scrollare per vedere tutti i giorni

### Flusso 3: Cambiare Località
1. Utente tap su pulsante località (in alto)
2. App mostra campo di ricerca o lista località salvate
3. Utente seleziona località
4. App aggiorna dati meteo per nuova località

## Scelte Cromatiche

### Palette Principale
- **Primary**: `#0a7ea4` (blu cielo) - per elementi interattivi e accenti
- **Background**: 
  - Light: `#ffffff` (bianco puro)
  - Dark: `#151718` (grigio scuro quasi nero)
- **Surface**: 
  - Light: `#f5f5f5` (grigio chiaro per card)
  - Dark: `#1e2022` (grigio scuro per card)
- **Foreground** (testo principale):
  - Light: `#11181C` (quasi nero)
  - Dark: `#ECEDEE` (quasi bianco)
- **Muted** (testo secondario):
  - Light: `#687076` (grigio medio)
  - Dark: `#9BA1A6` (grigio chiaro)

### Colori Contestuali per Condizioni Meteo
- **Soleggiato**: Giallo dorato `#FDB813`
- **Nuvoloso**: Grigio `#8E9AAF`
- **Pioggia**: Blu scuro `#4A5568`
- **Neve**: Azzurro chiaro `#E0F2FE`
- **Temporale**: Viola scuro `#5B21B6`

## Tipografia
- **Temperatura principale**: 72-96pt, bold
- **Titoli sezioni**: 20-24pt, semibold
- **Testo normale**: 16-18pt, regular
- **Testo secondario**: 14-16pt, regular

## Icone e Simboli
- Utilizzo di SF Symbols per iOS (mappati a Material Icons per Android)
- Icone meteo personalizzate o da libreria (es. weather-icons)
- Dimensioni: 28-48pt per icone principali, 20-24pt per icone secondarie

## Animazioni e Transizioni
- Transizioni fluide tra schermate (250-300ms)
- Animazione pull-to-refresh
- Fade-in per caricamento dati
- Feedback tattile (haptic) su azioni principali

## Note Tecniche
- **Fonte dati**: API meteo pubblica (es. OpenWeatherMap, WeatherAPI)
- **Storage locale**: AsyncStorage per salvare località preferite e preferenze
- **Geolocalizzazione**: Richiesta permessi per località corrente
- **Aggiornamento dati**: Automatico all'apertura app + manuale con pull-to-refresh
- **Gestione errori**: Messaggi chiari per errori di rete o permessi negati
