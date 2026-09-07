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
    title: "Off-Track Door Repair",
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
    title: "Hinge Replacement",
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
    title: "Door Replacement",
    before: {
      src: "/images/before-after/install-before.jpg",
      alt: "Worn garage door before replacement",
    },
    after: {
      src: "/images/before-after/install-after.jpg",
      alt: "New garage door installed after replacement",
    },
  },
];
