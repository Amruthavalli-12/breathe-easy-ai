import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Upload, Send, X, FileAudio, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SymptomInputProps {
  onAnalyze: (symptoms: string, audioFile?: File) => void;
  isLoading: boolean;
}

const SymptomInput = ({ onAnalyze, isLoading }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleSubmit = () => {
    if (!symptoms.trim() && !audioFile) {
      toast({
        title: "Please provide input",
        description: "Enter your symptoms or upload an audio file.",
        variant: "destructive"
      });
      return;
    }
    onAnalyze(symptoms, audioFile || undefined);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        toast({
          title: "Audio uploaded",
          description: `${file.name} ready for analysis.`
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file.",
          variant: "destructive"
        });
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
        setAudioFile(file);
        stream.getTracks().forEach(track => track.stop());
        toast({
          title: "Recording saved",
          description: "Your voice recording is ready for analysis."
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Speak clearly about your symptoms."
      });
    } catch {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const removeAudio = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const exampleSymptoms = [
    "I have a persistent cough with phlegm",
    "Fever, body aches, and fatigue",
    "Wheezing and shortness of breath",
    "Runny nose and sore throat"
  ];

  return (
    <section id="screening" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-2xl shadow-medium border border-border/50 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Describe Your Symptoms</h2>
          <p className="text-muted-foreground mb-6">
            Enter your symptoms in detail or record/upload audio of your cough or breathing.
          </p>

          {/* Text Input */}
          <div className="space-y-4">
            <Textarea
              placeholder="Example: I've been coughing for 3 days, have a fever, and feel very tired..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] resize-none bg-background border-input focus:ring-2 focus:ring-primary/20"
            />

            {/* Example chips */}
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Try:</span>
              {exampleSymptoms.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setSymptoms(example)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">or add audio</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Audio Options */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              onClick={isRecording ? stopRecording : startRecording}
              className="flex-1"
            >
              <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} />
              {isRecording ? 'Stop Recording' : 'Record Audio'}
            </Button>

            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1"
            >
              <Upload className="w-4 h-4" />
              Upload Audio
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Audio Preview */}
          {audioFile && (
            <div className="mt-4 p-4 rounded-lg bg-secondary/50 flex items-center gap-3">
              <FileAudio className="w-5 h-5 text-primary" />
              <span className="flex-1 text-sm text-foreground truncate">{audioFile.name}</span>
              <Button variant="ghost" size="icon" onClick={removeAudio}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Submit Button */}
          <Button
            variant="hero"
            size="xl"
            onClick={handleSubmit}
            disabled={isLoading || (!symptoms.trim() && !audioFile)}
            className="w-full mt-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Analyze Symptoms
              </>
            )}
          </Button>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            ⚕️ This tool provides informational screening only and is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SymptomInput;
