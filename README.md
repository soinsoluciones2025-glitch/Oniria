# OnirIA: Web Application Technical Overview

**Version:** 5.0
**Status:** Stable
**Stack:** React, TypeScript, Web Speech API, Google Gemini API

---

## 1. Overview

OnirIA is a responsive, browser-based assistive communication tool. It's designed to help individuals with speech and writing difficulties communicate more easily. The application leverages a combination of native browser APIs for real-time interaction and the Google Gemini API for advanced language processing.

---

## 2. Core Features & Status

-   **Text-to-Speech (TTS):** Converts user-written text into spoken words.
    -   **Technology:** Web Speech API (`SpeechSynthesis`)
    -   **Status:** Implemented & Stable.

-   **Speech-to-Text (STT) / Auditory Accessibility:** Transcribes spoken language into text, providing real-time transcription of ambient conversations for users with hearing impairments.
    -   **Technology:** Web Speech API (`SpeechRecognition`)
    -   **Status:** Implemented & Stable.

-   **AI-Powered Text Assistance:**
    -   **Correction:** Corrects spelling and grammar, interpreting phonetic and conceptual intent.
    -   **Rephrasing:** Rewords text to be clearer or more formal.
    -   **Technology:** Google Gemini API (`gemini-2.5-flash`)
    -   **Status:** Implemented & Stable.

-   **Gesture Recognition:** (Future) Aims to interpret facial and hand gestures via the device camera for non-verbal communication.
    -   **Status:** Planned. Placeholder UI exists.

---

## 3. System Architecture

The application follows a modern, component-based architecture using React. The structure promotes a clear separation of concerns between the user interface (Components), reusable logic (Hooks), and external API communication (Services).

```
[Browser]
  |
  +-- [Web Speech API] <--> [useSpeech.ts Hook]
  |
  +-- [OnirIA React App]
        |
        +-- [App.tsx] (State Management & Routing)
        |     |
        |     +-- [Header.tsx] (Navigation)
        |     |
        |     +-- [CommunicationScreen.tsx] (Core UI)
        |     |     |
        |     |     +-- [LargeButton.tsx, ... (UI elements)]
        |     |     `-- Calls [useSpeech.ts Hook]
        |     |     `-- Calls [geminiService.ts]
        |     |
        |     +-- [SettingsScreen.tsx]
        |     |
        |     `-- [GestureScreen.tsx, TutorScreen.tsx] (Placeholders)
        |
        +-- [geminiService.ts] <--> [Google Gemini API]

```

### Module Breakdown:

-   **Components (`/components`):**
    -   `App.tsx`: The root component, manages screen navigation and global state.
    -   `CommunicationScreen.tsx`: The primary UI for text input, speech, and AI actions.
    -   `SettingsScreen.tsx`: UI for toggling features like Hearing Mode.
    -   `Header.tsx`: Top-level navigation bar.
    -   `LargeButton.tsx`: Reusable, accessible button component for core actions.

-   **Hooks (`/hooks`):**
    -   `useSpeech.ts`: A custom hook abstracting the Web Speech API for both TTS and STT, handling browser differences, state, and errors.

-   **Services (`/services`):**
    -   `geminiService.ts`: A dedicated module for all interactions with the Google Gemini API. It contains the logic for formatting prompts for text correction and rephrasing.

---

## 4. Getting Started

**Prerequisites:**
-   A modern web browser that supports the Web Speech API (e.g., Chrome, Firefox, Edge).
-   A Google Gemini API key.

**Setup:**
1.  **Environment Variables:** The application expects the Gemini API key to be available as `process.env.API_KEY`. The provided environment automatically handles this.
2.  **Running the App:** This is a static web application. No build step is required. Just serve the `index.html` file.
