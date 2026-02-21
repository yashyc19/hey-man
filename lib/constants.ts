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
  { id: 1, from: "Your mom from New Jersey", text: "You deserve beautiful things", fullText: "My beautiful girl, wishing you all the best in the world, you deserve only beautiful things. I love you so much my Maitreyi.", photo: "/photos/sara.jpeg", color: "hsl(42,78%,60%)" },
  { id: 2, from: "The mimling to my raghabum ♥️", text: "Growing old together", fullText: "The butterfly effect is crazy because had Sahi not introduced us in 7th grade, and had we not rolled our eyes at the same time to squadling drama, would we even be here today? You're my best, most favorite human being in the whole world, and it's so beautiful that we're actually growing old together!", photo: "/photos/varsha.jpeg", color: "hsl(38,80%,55%)" },
];
