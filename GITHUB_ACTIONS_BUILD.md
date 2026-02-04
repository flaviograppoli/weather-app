# Build APK con GitHub Actions

Questa guida spiega come compilare l'APK usando GitHub Actions (completamente gratuito).

## Prerequisiti

- Account GitHub gratuito (https://github.com/signup)

## Passaggi

### 1. Crea un repository GitHub

1. Vai su https://github.com/new
2. Crea un nuovo repository pubblico (es. `weather-app`)
3. Copia l'URL del repository (es. `https://github.com/tuonome/weather-app.git`)

### 2. Carica il progetto su GitHub

Nel sandbox o sul tuo computer:

```bash
cd /home/ubuntu/weather-app
git init
git add .
git commit -m "Initial commit: Weather App"
git branch -M main
git remote add origin https://github.com/tuonome/weather-app.git
git push -u origin main
```

Se richiede autenticazione, usa un Personal Access Token:
1. Vai a https://github.com/settings/tokens
2. Crea un nuovo token con permessi `repo`
3. Usa il token come password quando richiesto

### 3. Attiva GitHub Actions

1. Vai al tuo repository su GitHub
2. Clicca su "Actions"
3. Clicca su "I understand my workflows, go ahead and enable them"

### 4. Avvia il build

Il build si avvia automaticamente quando fai push su main. Per avviarlo manualmente:

1. Vai su "Actions" nel tuo repository
2. Seleziona "Build APK" dal menu a sinistra
3. Clicca su "Run workflow"
4. Seleziona il branch "main"
5. Clicca su "Run workflow"

### 5. Scarica l'APK

Una volta completato il build:

1. Vai su "Actions" > "Build APK"
2. Clicca sul build completato
3. Scorri in basso fino a "Artifacts"
4. Clicca su "weather-app-debug" per scaricare l'APK

## Tempo di compilazione

Il build richiede circa **10-15 minuti** su GitHub Actions.

## Troubleshooting

### Il build fallisce

1. Clicca sul build fallito
2. Scorri fino a "Run" per vedere i log di errore
3. Controlla se tutti i file sono stati caricati correttamente

### Non vedo "Artifacts"

Il build potrebbe ancora essere in corso. Attendi qualche minuto e ricarica la pagina.

## Prossimi passi

Una volta scaricato l'APK:

1. Trasferiscilo sul tuo dispositivo Android
2. Apri il file manager e tocca il file APK
3. Segui le istruzioni di installazione

Buona compilazione!
