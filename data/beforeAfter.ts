export const beforeAfterSection = {
  title: "Real Jobs. Real Results.",
  subtitle: "See the difference professional garage door service makes.",
} as const;

export type BeforeAfterPair = {
  id: string;
  title: string;
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "door-off-track",
    title: "Same Day Garage Door Replacement",
    before: {
      src: "/images/before-after/door-before.jpg",
      alt: "Garage door off track before repair",
    },
    after: {
      src: "/images/before-after/door-after.jpg",
      alt: "Garage door repaired and aligned after service",
    },
  },
  {
    id: "hinge-replacement",
    title: "Hardware Upgrade & Replacement",
    before: {
      src: "/images/before-after/hinge-before.jpg",
      alt: "Damaged garage door hinge before replacement",
    },
    after: {
      src: "/images/before-after/hinge-after.jpg",
      alt: "New garage door hinge installed after repair",
    },
  },
  {
    id: "door-installation",
    title: "Opener Replacement",
    before: {
      src: "/images/before-after/opener-before.jpeg",
      alt: "Old garage door opener before replacement",
    },
    after: {
      src: "/images/before-after/opener-after.jpeg",
      alt: "New garage door opener installed after replacement",
    },
  },
];
