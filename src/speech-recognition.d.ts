// src/speech-recognition.d.ts

interface SpeechRecognitionPhrase {
    readonly phrase: string;
    readonly boost: number;
}

declare var SpeechRecognitionPhrase: {
    prototype: SpeechRecognitionPhrase;
    new(phrase: string, boost?: number): SpeechRecognitionPhrase;
};

interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    phrases: SpeechRecognitionPhrase[];

    start(): void;
    stop(): void;
    abort(): void;

    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
}

declare var SpeechRecognition: {
    prototype: SpeechRecognition;
    new(): SpeechRecognition;
};

interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
}