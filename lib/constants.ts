export const TRANSITION_DURATION = 0.8;
export const LONG_PRESS_DURATION = 600;

export interface Note {
  id: number;
  from: string;
  text: string;
  fullText: string;
  photo: string;
  color: string;
}

export const NOTES: Note[] = [
  { id: 1, from: "ur Frat House Roomie", text: "", fullText: "", photo: "/photos/shree.jpeg", color: "hsl(270,30%,40%)" },
  { id: 2, from: "ur SLAYEST HOMEBOY", text: "To the RANDOM ASS BRAINROT", fullText: "", photo: "/photos/sussy.jpeg", color: "hsl(270,30%,40%)" },
  { id: 3, from: "Vidi", text: "", fullText: "", photo: "/photos/vidi.jpeg", color: "hsl(270,30%,40%)" },
  { id: 4, from: "Maanya", text: "", fullText: "", photo: "/photos/maanya.jpeg", color: "hsl(270,30%,40%)" },
];
