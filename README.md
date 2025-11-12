---

OnirIA 4.3 — Comunicador Asistivo Multimodal y Clínico

Versión: 4.3
Plataforma: Android / Web híbrido (opcional)
Orientación: Clínico, rehabilitación, comunicación asistiva
Tecnologías: Kotlin, Jetpack Compose, React (Web fallback), MediaPipe, BCI, Gemini AI, TFLite, GGML
Objetivo: Permitir comunicación completa a personas con dificultades de habla o movilidad, integrando gestos, voz, EEG/BCI y predicción de intención mental.


---

## Descripción General

OnirIA 4.3 es un sistema avanzado de comunicación asistiva diseñado para usuarios con ACV, parálisis, disfagia u otras limitaciones de movilidad o habla. Combina múltiples canales de interacción:

- **Voz a texto / texto a voz**
- **Gestos faciales y manuales**
- **BCI / EEG para predicción de intención mental**
- **Asistente de IA para mejorar la expresión textual**

La arquitectura está preparada para un uso clínico experimental, priorizando privacidad y local-first.

---

## Características Clave

### 1. Comunicación por Voz
- Reconocimiento de voz en tiempo real.
- Texto a voz configurable, con voces y velocidad ajustables.
- Historial de frases recientes.

### 2. Control por Gestos
- MediaPipe Holistic analiza rostro y cuerpo en tiempo real.
- Gestos iniciales:
  - **Sonrisa:** "Estoy feliz"
  - **Boca abierta:** "Tengo hambre o sed"
  - **Mano levantada:** "Necesito ayuda"
  - **Pulgar arriba:** "Sí, de acuerdo"
  - **Palma abierta:** "No, por favor detente"
- Gestos mantenidos por ≥1.5s activan TTS automático.

### 3. Predicción BCI / Intención Mental
- Detecta intención de confirmación o rechazo mediante señales EEG.
- Combina datos de gestos y voz para mayor robustez.
- Registro seguro local-first, cifrado AES.

### 4. Asistente de IA
- Integra API Gemini (cloud) o LLM local (GGML/TFLite) según disponibilidad.
- Sugerencias de frases completas, empáticas o simplificadas.
- Botón "AI Assist" para mejorar texto antes de TTS.

### 5. Interfaz de Usuario Accesible
- Botones grandes, alto contraste, navegación clara.
- Feedback visual y auditivo constante: escucha activa, detección de gestos, procesamiento de IA.
- Pantalla "Tutor" interactiva para guiar al usuario.

### 6. Persistencia y Configuración
- Guardado local de preferencias: voz, velocidad, temas.
- Sincronización opcional con backend seguro.
- Preparado para auditoría clínica y pruebas controladas.

---

## Arquitectura Modular

Módulos principales:
- **perception:** cámara, gestos, face mesh, BCI
- **intention:** fusión multimodal → intención del usuario
- **execution:** acciones de salida (voz, vibración, pantalla)
- **expression:** TTS local + cloud opcional
- **storage:** base local cifrada, logs, configuración
- **sync:** backup seguro y conectores cloud
- **models:** LLM, STT, TTS, intent classifier, BCI classifier

Estructura de carpetas recomendada:
```
src/
├─ screens/       # MainScreen, CommunicationScreen, TutorScreen, SettingsScreen, GestureScreen
├─ components/    # Botones, Spinner, Barra de navegación
├─ hooks/         # usePersistentState.ts, useSpeech.ts, useBCI.ts
├─ utils/         # gestureDetection.ts, BCIProcessing.ts
├─ services/      # geminiService.ts, TTSService.ts
├─ models/        # LLM, STT, TTS, BCI classifier
├─ scripts/       # prepare_release.sh, quantize_models.sh
└─ App.tsx
```

---

## Roadmap de Desarrollo y Test

1.  **PASS1:** Crear estructura, módulos, pseudocódigo, JSON UI schema, module.json.
2.  **PASS2:** Compilar debug, ejecutar tests unitarios e instrumentados, generar report_build.json parcial.
3.  **PASS3:** Optimización y quantización de modelos, tests finales, APK release firmado, report_build.json final.

**Tests clínicos:**
- Registro de gestos, audio, EEG, intención detectada y acción ejecutada.
- Latencia y corrección supervisada.
- Exportación cifrada para análisis clínico.

---

## Scripts Clave

**quantize_models.sh**
```bash
#!/usr/bin/env bash
set -e
echo "Quantizing models..."
python3 models/conversion_scripts/to_tflite.py --input models/intent.onnx --output models/intent.tflite --quantize int8
# GGML conversion for LLMs
echo "Done."
```

**prepare_release.sh**
```bash
#!/usr/bin/env bash
set -e
echo "Running tests..."
./gradlew test
echo "Quantizing models..."
bash scripts/quantize_models.sh
echo "Assembling release..."
./gradlew assembleRelease
echo "Sign & align steps here (keystore placeholder)."
echo "Release artifact: app/build/outputs/apk/release/app-release.apk"
```

---

## Seguridad y Privacidad

- Claves de API nunca expuestas en frontend.
- Todos los datos locales cifrados con AES-256.
- Consentimiento explícito para BCI, cámara y micrófono.
- Cumplimiento GDPR / HIPAA según región.
- Política de privacidad clara y exportación/eliminación de datos.

---

## Flujos Clínicos Ejemplares

| Evento                  | Intención detectada   | Acción                     |
| ----------------------- | --------------------- | -------------------------- |
| Sonrisa                 | Felicidad             | "Estoy feliz" (TTS)        |
| Boca abierta            | Hambre/Sed            | "Tengo hambre o sed" (TTS) |
| EEG confirma “Sí”       | Confirmación          | Acción ejecutada           |
| Gestos + BCI combinados | Intención reforzada   | TTS y acción visual        |

---

## Monetización

- **Gratis por defecto**
- **Suscripción premium:** voces avanzadas, modelos cloud
- **Licencias institucionales:** hospitales, centros de rehabilitación
- **Ads éticos** solo con opt-in familiar/cuidador

---

## Notas Finales

OnirIA 4.3 es una plataforma integral de comunicación asistiva. La combinación de voz, gestos y BCI crea un canal multimodal sin precedentes, listo para uso clínico experimental y preparado para futuras integraciones con backend seguro, cloud AI y modelos on-device optimizados.
