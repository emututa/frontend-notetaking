



"use client";

import React, { useState, useRef } from "react";

interface AudioRecorderProps {
  onTranscriptionComplete?: (text: string) => void;
}

export default function AudioRecorder({ onTranscriptionComplete }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [processing, setProcessing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // Start recording
  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunks.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setProcessing(true);
        try {
          const webmBlob = new Blob(audioChunks.current, { type: "audio/webm" });
          const wavBlob = await convertToWav(webmBlob);
          setAudioURL(URL.createObjectURL(wavBlob));
        } catch (err) {
          console.error("WAV conversion failed:", err);
          alert("Failed to process audio.");
        } finally {
          setProcessing(false);
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Recording failed:", err);
      alert("Failed to start recording.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  // Convert WebM → WAV (16kHz mono)
  const convertToWav = async (webmBlob: Blob): Promise<Blob> => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioCtx = new AudioContext({ sampleRate: 16000 });
    const decodedData = await audioCtx.decodeAudioData(arrayBuffer);

    const offlineCtx = new OfflineAudioContext(1, decodedData.length, 16000);
    const source = offlineCtx.createBufferSource();
    source.buffer = decodedData;
    source.connect(offlineCtx.destination);
    source.start(0);

    const renderedBuffer = await offlineCtx.startRendering();
    return new Blob([encodeWAV(renderedBuffer)], { type: "audio/wav" }); // ✅ correct MIME type
  };

  const encodeWAV = (audioBuffer: AudioBuffer): ArrayBuffer => {
    const numChannels = 1;
    const sampleRate = 16000;
    const samples = audioBuffer.getChannelData(0);
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (view: DataView, offset: number, str: string) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };

    const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
      for (let i = 0; i < input.length; i++, offset += 2) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }
    };

    writeString(view, 0, "RIFF");
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, "WAVE");
    writeString(view, 12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, "data");
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);
    return buffer;
  };

  // Transcribe audio → save in MongoDB
  const handleTranscribe = async () => {
    if (!audioURL) return;
    setTranscript("Transcribing...");
    setProcessing(true);

    try {
      const wavBlob = await fetch(audioURL).then((res) => res.blob());
      const correctedBlob = new Blob([wavBlob], { type: "audio/wav" }); // ✅ force correct type
      const formData = new FormData();
      formData.append("audio", correctedBlob, "recording.wav");

      const res = await fetch("http://localhost:5000/api/notes/transcription", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} ${errorText}`);
      }

      const data = await res.json();
      const text = data.text || "(no speech detected)";
      setTranscript(text);
      onTranscriptionComplete?.(text);
    } catch (err: any) {
      console.error("Transcription error:", err);
      setTranscript("Transcription error: " + err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">🎤 Audio Recorder</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={recording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded-lg text-white ${
            recording ? "bg-red-500" : "bg-green-500"
          }`}
          disabled={processing}
        >
          {recording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {audioURL && (
        <div className="space-y-2">
          <audio controls src={audioURL}></audio>
          <div className="flex gap-2">
            <a
              href={audioURL}
              download="recording.wav"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Download Audio
            </a>
            <button
              onClick={handleTranscribe}
              disabled={processing}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg disabled:opacity-50"
            >
              Convert to Text
            </button>
          </div>
        </div>
      )}

      {transcript && <p className="mt-4 p-2 bg-gray-100 rounded-lg">📝 {transcript}</p>}
    </div>
  );
}
