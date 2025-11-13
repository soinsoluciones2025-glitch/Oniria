
# 🧠 OnirIA 4.5 - Documento Maestro Ultra Completo
*Sistema:* OnirIA (Interface Multimodal Asistiva)  
*Versión actual:* 4.5 (Híbrido clínico y tecnológico)  
*Entorno:* Android Nativo (Kotlin + Jetpack Compose)  
*Compatibilidad:* Android 10+  
*ML Engine:* TensorFlow Lite (TFLite) + GGML (para modelos ligeros on-device)  
*Autoría y control técnico:* SOIN Soluciones Informáticas  

---

## 🩺 1. Propósito y Alcance
OnirIA es una herramienta de comunicación y asistencia diseñada para personas con dificultades motoras o del habla (disfagia, ACV, parálisis, ELA, etc.), combinando *inteligencia artificial local, **procesamiento de gestos, **voz sintética natural* y *sincronización segura*.

El sistema es híbrido: puede funcionar *totalmente offline* o con *asistencia en la nube* mediante Gemini/GGML, lo que garantiza tanto rendimiento como privacidad clínica.

---

## 🧩 2. Filosofía Técnica y Principios
1. *Modularidad total:* Cada subsistema (percepción, expresión, intención, sincronización, almacenamiento) opera independiente.
2. *Fallback inteligente:* Si un módulo falla (por ejemplo, TTS o cámara), OnirIA activa su modo de contingencia.
3. *Transparencia del código:* Cada componente crítico tiene comentario inicial explicando propósito y contexto.
4. *Seguridad médica:* Todo dato sensible se cifra localmente con SQLCipher.
5. *Auditoría perpetua:* Cada build deja un report_build.json y un log de sincronización para trazabilidad.

---

## ⚙️ 3. Convenciones Críticas del Proyecto

### 3.1. Extensiones seguras (.kt.txt / .sh.txt)
Debido a las limitaciones del entorno de Build App, todos los archivos que normalmente serían .kt (Kotlin) o .sh (Shell Script) *se deben generar con doble extensión .txt*.  
Ejemplo:

GestureDetector.kt.txt quantize_models.sh.txt

*Regla inquebrantable:*  
> Nunca eliminar la extensión .txt dentro del entorno Build App.  
> Solo renombrarlos manualmente en local una vez descargados y verificados.

---

## 🧱 4. Estructura Completa del Proyecto

```text
OnirIA/
│
├── README.md                         → Este documento maestro
├── metadata.json                     → Datos del proyecto y build info
│
├── app/
│   └── src/
│       ├── main/java/com/oniria/
│       │   ├── MainActivity.kt.txt
│       │   ├── data/
│       │   │   └── PreferencesRepository.kt.txt
│       │   ├── modules/
│       │   │   ├── perception/
│       │   │   │   ├── GestureDetector.kt.txt
│       │   │   │   └── VoiceInputManager.kt.txt
│       │   │   ├── expression/
│       │   │   │   └── SpeechSynthesizer.kt.txt
│       │   │   ├── sync/
│       │   │   │   └── GeminiService.kt.txt
│       │   │   ├── intention/
│       │   │   │   └── IntentionViewModel.kt.txt
│       │   │   └── storage/
│       │   │       └── StorageModule.kt.txt
│       │   └── ui/
│       │       ├── screens/
│       │       │   ├── CommunicationScreen.kt.txt
│       │       │   ├── GestureScreen.kt.txt
│       │       │   ├── SettingsScreen.kt.txt
│       │       │   └── TutorScreen.kt.txt
│       │       └── theme/
│       │           ├── Color.kt.txt
│       │           ├── Theme.kt.txt
│       │           └── Type.kt.txt
│       └── test/java/com/oniria/...
│
└── scripts/
    ├── quantize_models.sh.txt
    ├── sync_models.sh.txt
    └── prepare_release.sh.txt
```

---

🧠 5. Arquitectura Interna

Modelo conceptual

[GestureDetector] ──► [IntentionViewModel] ◄── [SpeechSynthesizer]
           │                         │
           ▼                         ▼
      [Perception]            [Expression]
           │                         │
           └──────► [GeminiService] ◄──────┘
                            │
                            ▼
                     [StorageModule]

Flujo:

1. GestureDetector analiza movimiento (MediaPipe + CameraX).


2. IntentionViewModel fusiona gestos + voz + estado cognitivo.


3. GeminiService traduce intención a respuesta semántica.


4. SpeechSynthesizer reproduce respuesta TTS natural.


5. StorageModule guarda logs clínicos cifrados.




---

🧩 6. Módulos Detallados

a. Perception (GestureDetector.kt.txt, VoiceInputManager.kt.txt)

Usa CameraX y MediaPipe para capturar gestos.
Usa SpeechRecognizer para transcribir voz a texto en tiempo real.
Fallback: simulación si los sensores no están disponibles.


b. Expression (SpeechSynthesizer.kt.txt)

Genera voz TTS con motor Android integrado.
Compatible con idiomas ES/EN/FR.
Incluye control de pitch, velocidad y fallback de texto.


c. Sync (GeminiService.kt.txt)

Gestiona comunicación segura con IA o servidor.
Soporta modo offline con caché local y hash SHA256.
Cifra todas las peticiones con clave dinámica de sesión.


d. Intention (IntentionViewModel.kt.txt)

Funde entradas multimodales (gesto, texto, voz).
Calcula intención del usuario mediante ponderación.
Genera comandos estructurados para módulos externos.


e. Storage (StorageModule.kt.txt, PreferencesRepository.kt.txt)

Cifrado local con SQLCipher + Room (planificado).
Actualmente usa SharedPreferences para ajustes de usuario.
Guarda logs clínicos, modelos descargados, y preferencias.
Incluye mecanismo de rollback si el archivo de base se daña.



---

🔧 7. Scripts de Soporte

Script	Propósito	Dependencias

quantize_models.sh.txt	Convierte modelos TFLite/GGML a versión ligera	TensorFlow Lite
sync_models.sh.txt	Descarga y verifica modelos desde repositorio seguro	wget / curl
prepare_release.sh.txt	Compila, firma y alinea el APK final	Android SDK tools



---

🧪 8. Sistema de Pruebas

Pruebas Unitarias

Cada módulo cuenta con archivo Test.kt.txt correspondiente.

Abarca flujo lógico, validaciones y fallback.


Pruebas Instrumentadas

Se ejecutan sobre dispositivo físico o emulador Android.

Validan sincronización y accesibilidad completa.



---

🧰 9. Protocolo de Recuperación ante Fallos

1. Si Build App omite archivos → volver a ejecutar prompts individuales.


2. Si un archivo queda vacío o truncado → restaurar desde README.md (sección estructura) o crear manualmente el .txt.


3. Si la app falla en runtime → revisar report_build.json y confirmar integridad de IntentionViewModel.


4. Si modelos no cargan → ejecutar sync_models.sh.txt y verificar sha256sum.


5. Si hay pérdida completa del entorno → reconstruir desde estructura del documento maestro y renombrar archivos .txt a sus extensiones reales.




---

✅ 10. Checklist Final de Validación

[x] Todos los módulos .kt.txt presentes y comentados.

[x] Scripts .sh.txt funcionales y con permisos de ejecución.

[x] Build App actualizado a contexto 4.5.

[x] README.md coincide con estructura física.

[x] IntentionViewModel sincroniza con SpeechSynthesizer.

[x] GeminiService responde localmente sin conexión.

[x] Almacenamiento cifrado verificado.

[x] Release generada sin errores.

[x] Copia de seguridad de modelos y logs en servidor SOIN.



---

🧭 11. Plan Futuro (v5.0 y más allá)

Reemplazar simulaciones por inferencia real TFLite y GGML.

Incorporar interfaz cerebro-computadora (BCI).

Adaptar UI a gafas AR/VR para comunicación gestual proyectada.

Conectar con APIs clínicas y registro médico electrónico.



---

🧩 Nota Final

Este README es la autoridad máxima del proyecto.
Cualquier IA o desarrollador que lo utilice debe:

Mantener los archivos .kt.txt y .sh.txt sin alterar su extensión.

No eliminar comentarios iniciales ni secciones explicativas.

No modificar estructura ni directorios sin reflejarlo aquí.


Si Build App comete un error, este documento es la hoja de rescate total.


---

Fin del Documento Maestro Ultra Completo – OnirIA v4.5
