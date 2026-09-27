// Background music.
// Plays /audio/music.mp3 if you add one; otherwise it generates a soft lo-fi
// ambient loop with the Web Audio API, so the site works with no audio files.

import { getAudioContext } from './sound';

const TRACK_URL = '/audio/music.mp3';
const VOLUME = 0.35;

// Cmaj7 → Am7 → Fmaj7 → G6, as frequencies (Hz)
const CHORDS = [
  [130.81, 164.81, 196.0, 246.94],
  [110.0, 130.81, 164.81, 196.0],
  [87.31, 130.81, 164.81, 220.0],
  [98.0, 146.83, 196.0, 246.94],
];
const CHORD_SECONDS = 4;

let track: HTMLAudioElement | null = null;
let trackFailed = false;
let master: GainNode | null = null;
let timer: number | null = null;
let chordIndex = 0;
let playing = false;

const playSynthChord = (ctx: AudioContext, out: AudioNode) => {
  const chord = CHORDS[chordIndex % CHORDS.length];
  chordIndex += 1;
  const t = ctx.currentTime;

  // Warm pad: two detuned voices per note, slow swell in and out
  chord.forEach((freq) => {
    [-4, 4].forEach((detune) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      osc.detune.value = detune;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.05, t + 1.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + CHORD_SECONDS + 1.5);
      osc.connect(gain);
      gain.connect(out);
      osc.start(t);
      osc.stop(t + CHORD_SECONDS + 1.6);
    });
  });

  // Gentle plucked arpeggio an octave up
  const pattern = [0, 2, 1, 3, 2, 1, 3, 2];
  pattern.forEach((noteIdx, step) => {
    const start = t + step * (CHORD_SECONDS / pattern.length);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = chord[noteIdx] * 2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.035, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.1);
    osc.connect(gain);
    gain.connect(out);
    osc.start(start);
    osc.stop(start + 1.2);
  });
};

const startSynth = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (!master) {
    master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;

    // Simple echo for a roomy, lo-fi feel
    const delay = ctx.createDelay();
    const feedback = ctx.createGain();
    delay.delayTime.value = 0.38;
    feedback.gain.value = 0.28;
    master.connect(filter);
    filter.connect(ctx.destination);
    filter.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(ctx.destination);
  }

  master.gain.cancelScheduledValues(ctx.currentTime);
  master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
  master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 1.5);

  playSynthChord(ctx, master);
  timer = window.setInterval(() => master && playSynthChord(ctx, master), CHORD_SECONDS * 1000);
};

const stopSynth = () => {
  const ctx = getAudioContext();
  if (timer !== null) window.clearInterval(timer);
  timer = null;
  if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1);
  }
};

export const startMusic = async () => {
  if (playing) return;
  playing = true;

  if (!trackFailed) {
    try {
      if (!track) {
        track = new Audio(TRACK_URL);
        track.loop = true;
        track.volume = 0.4;
      }
      await track.play();
      return;
    } catch {
      // No music file (or it can't play): fall back to the generated loop
      trackFailed = true;
      track = null;
    }
  }
  if (playing) startSynth();
};

export const stopMusic = () => {
  playing = false;
  track?.pause();
  stopSynth();
};
