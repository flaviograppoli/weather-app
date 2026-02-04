# Guida al Build APK - Weather App

Questo documento fornisce le istruzioni per generare l'APK dell'app meteo.

## Opzione 1: Build Cloud Gratuito (Consigliato)

Il modo più semplice per generare l'APK senza installare strumenti locali.

### Prerequisiti
- Node.js installato
- Accesso a internet

### Passaggi

1. **Installa EAS CLI** (se non già installato):
```bash
npm install -g eas-cli
```

2. **Accedi a Expo** (opzionale, puoi usare un account anonimo):
```bash
eas login
```
Se non vuoi creare account, puoi saltare questo passaggio e il build avverrà in modalità anonima.

3. **Avvia il build**:
```bash
eas build --platform android --output ./weather-app.apk
```

4. **Attendi il completamento**:
Il build verrà eseguito sui server di Expo. Riceverai un link per scaricare l'APK una volta completato.

---

## Opzione 2: Build Locale con Android Studio

Per chi preferisce compilare localmente sul proprio computer.

### Prerequisiti
- Android Studio installato
- Android SDK configurato
- Java Development Kit (JDK) 11+
- Node.js installato

### Passaggi

1. **Genera il progetto Android nativo**:
```bash
npx expo prebuild --platform android --clean
```

2. **Apri il progetto in Android Studio**:
```bash
open android/
```
(su macOS) oppure naviga manualmente alla cartella `android/`

3. **Compila l'APK**:
   - In Android Studio: `Build > Build Bundle(s) / APK(s) > Build APK(s)`
   - Oppure da terminale:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

4. **Trova l'APK**:
L'APK compilato si troverà in:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## Opzione 3: Build Debug (Veloce, solo per testing)

Se vuoi solo testare rapidamente senza ottimizzazioni:

```bash
cd android
./gradlew assembleDebug
```

L'APK di debug si troverà in:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Installazione su Dispositivo

Una volta ottenuto l'APK:

### Con ADB (Android Debug Bridge)
```bash
adb install weather-app.apk
```

### Manualmente
1. Trasferisci l'APK sul dispositivo Android
2. Apri il file manager e tocca il file APK
3. Segui le istruzioni di installazione

---

## Troubleshooting

### Errore: "ANDROID_SDK_ROOT not set"
Imposta la variabile d'ambiente:
```bash
export ANDROID_SDK_ROOT=/path/to/android/sdk
```

### Errore: "Gradle build failed"
Prova a pulire la cache:
```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

### Errore: "Java version mismatch"
Assicurati di avere Java 11 o superiore:
```bash
java -version
```

---

## Supporto

Per ulteriore assistenza, consulta:
- [Expo Build Documentation](https://docs.expo.dev/build/introduction/)
- [Android Build Documentation](https://developer.android.com/build)
- [Expo Prebuild Guide](https://docs.expo.dev/build-reference/prebuild/)
