import { useRef, useState } from "react";


function App() {
    const [message, setMessage] = useState("")
    const [recordingAudio, setRecordingAudio] = useState(false);

    // Audio recognition
    const recognition = useRef<any | null>(null);

    const startAudioRegistartion = () => {
        // Check authorization to access microphone
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then((_stream) => {
                /* Permission granted, start recording audio */

                /* Speech recognition */
                const SpeechRecognitionAPI =
                    window.SpeechRecognition ?? window.webkitSpeechRecognition;

                if (!SpeechRecognitionAPI) {
                    console.warn("Speech Recognition non supportata in questo browser");
                    return;
                }

                recognition.current = new SpeechRecognitionAPI();

                recognition.current.continuous = false;
                recognition.current.lang = "it-IT";
                recognition.current.interimResults = true;
                recognition.current.maxAlternatives = 1;

                recognition.current.onresult = (event: any) => {
                    setMessage(event.results[0][0].transcript);
                };

                recognition.current.onaudioend = (_event: any) => {
                    setRecordingAudio(false)
                };

                recognition.current.onstart = (_event: any) => {
                    setRecordingAudio(true)
                };

                recognition.current.start();
            })
            .catch((_err) => {
                /* Permission not granted */
            });
    }

    return (
        <div style={{display: "flex", flexDirection:"column", gap:15, width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <button onClick={() => startAudioRegistartion()}>START</button>
            <span>{recordingAudio ? "In ascolto...":"In attesa"}</span>
            <span style={{maxWidth: "80%", minHeight: "200px", minWidth: "200px", border: "1px solid #d4d4d4", borderRadius: "10px", padding: "5px"}}>{message}</span>
        </div>
    )
}

export default App
