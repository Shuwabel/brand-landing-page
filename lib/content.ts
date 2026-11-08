// All page copy that is not layout lives here, so it is easy to swap for the real brand.

export const chapters = [
  "Cover",
  "Manifesto",
  "The cloth",
  "The studio",
  "The looks",
  "Early access",
] as const;

export type Look = {
  id: string;
  name: string;
  fabric: string;
  image: string;
  alt: string;
  position: string; // object-position for the 4:5 stage crop
  ground: string; // page ground while this look is active
  accent: string; // accent while this look is active
  spots: { x: number; y: number; name: string; note: string }[];
};

export const looks: Look[] = [
  {
    id: "rust",
    name: "Rust camp shirt",
    fabric: "Printed viscose",
    image: "/photos/look-rust.jpg",
    alt: "A man in a printed rust camp-collar shirt and dark sunglasses standing in front of autumn leaves",
    position: "50% 30%",
    ground: "#21140d",
    accent: "#eba46c",
    spots: [
      { x: 50, y: 52, name: "Camp-collar shirt", note: "Printed viscose with a relaxed, open drape." },
      { x: 50, y: 91, name: "Straight trouser", note: "Black cotton twill, mid rise." },
    ],
  },
  {
    id: "cobalt",
    name: "Cobalt blazer",
    fabric: "Washed linen",
    image: "/photos/look-cobalt.jpg",
    alt: "A young man in a cobalt blue blazer worn open, standing in front of palm leaves and a sunlit wall",
    position: "50% 20%",
    ground: "#0d1330",
    accent: "#97a8ff",
    spots: [
      { x: 42, y: 72, name: "Unstructured blazer", note: "Washed linen, soft shoulder, no padding." },
    ],
  },
  {
    id: "moss",
    name: "Moss set",
    fabric: "Soft-drape viscose",
    image: "/photos/look-moss.jpg",
    alt: "A man in a matching green short-sleeve wrap top and trousers standing in a garden",
    position: "50% 35%",
    ground: "#101f16",
    accent: "#b6dd95",
    spots: [
      { x: 50, y: 60, name: "Wrap top", note: "Soft-drape viscose, short sleeve." },
      { x: 50, y: 90, name: "Wide trouser", note: "Sold as a set or on its own." },
    ],
  },
  {
    id: "suede",
    name: "Suede overshirt",
    fabric: "Brushed suede",
    image: "/photos/look-leather.jpg",
    alt: "A man seen from behind in a brown suede overshirt against a pale wall, one hand on his shoulder",
    position: "50% 30%",
    ground: "#1d1511",
    accent: "#dba97d",
    spots: [
      { x: 46, y: 66, name: "Overshirt", note: "Brushed suede, boxy cut, worn as a jacket." },
    ],
  },
];

export type Frame = {
  image: string;
  alt: string;
  name: string;
  fabric: string;
  fit: string;
};

export const frames: Frame[] = [
  { image: "/photos/frame-print.jpg", alt: "A man leaning on a slatted wall in a bold printed short-sleeve shirt and sunglasses", name: "Studio shirt", fabric: "Printed viscose", fit: "Relaxed" },
  { image: "/photos/frame-denim.jpg", alt: "A person mid-stride on a street in wide pale denim with a tie worn over the shoulder", name: "Wide denim", fabric: "Washed cotton", fit: "Wide leg" },
  { image: "/photos/frame-street.jpg", alt: "A young man crouching on a court, adjusting a bandana on the ground", name: "Contrast tank", fabric: "Cotton jersey", fit: "Slim" },
  { image: "/photos/frame-window.jpg", alt: "A wooden clothes rail beside a window with a plant, a folded shirt and a straw hat", name: "Linen shirt", fabric: "Washed linen", fit: "Regular" },
  { image: "/photos/frame-shirts.jpg", alt: "Shirts in white, blue and green hanging on a rail beside a potted plant", name: "Resort shirt", fabric: "Cotton poplin", fit: "Relaxed" },
];
