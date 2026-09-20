export const projectsSection = {
  title: "Our Projects",
} as const;

export type ProjectPhoto = {
  id: string;
  src: string;
  alt: string;
};

/**
 * Add or replace photos in /public/images/projects, then add an entry here.
 * The gallery renders every item in this array.
 */
export const projectPhotos: ProjectPhoto[] = [
  {
    id: "project-01",
    src: "/images/projects/project-01.jpg",
    alt: "Installed gray paneled garage door on a white home",
  },
  {
    id: "project-02",
    src: "/images/projects/project-02.jpg",
    alt: "Installed white paneled garage door on a stucco home",
  },
  {
    id: "project-03",
    src: "/images/projects/project-03.jpg",
    alt: "Installed white garage door with decorative top windows",
  },
  {
    id: "project-04",
    src: "/images/projects/project-04.jpg",
    alt: "Installed black wood-grain garage door with glass panels",
  },
  {
    id: "project-05",
    src: "/images/projects/project-05.jpg",
    alt: "Installed white garage door with vertical glass panels",
  },
  {
    id: "project-06",
    src: "/images/projects/project-06.jpg",
    alt: "Installed white double-car garage door on a brick home",
  },
];
