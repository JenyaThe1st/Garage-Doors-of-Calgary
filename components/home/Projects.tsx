import Image from "next/image";
import { projectPhotos, projectsSection } from "@/data/projects";
import { Section, SectionHeader } from "@/components/ui/Section";

export function Projects() {
  return (
    <Section id="projects" className="bg-neutral-light/20">
      <SectionHeader title={projectsSection.title} align="center" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projectPhotos.map((photo) => (
          <figure
            key={photo.id}
            className="group overflow-hidden rounded-lg bg-primary/5 shadow-sm"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
                quality={85}
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </figure>
        ))}
      </div>
    </Section>
  );
}
