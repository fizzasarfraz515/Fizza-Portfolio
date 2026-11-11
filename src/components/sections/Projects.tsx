import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Maximize2 } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import ProjectVisual from "@/components/ui/ProjectVisual";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ProjectModal = lazy(() => import("./ProjectModal"));

type Filter = "All" | ProjectCategory;

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const hasRepo = project.github !== "";
  const shownTech = project.tech.slice(0, 5);
  const extra = project.tech.length - shownTech.length;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-ink/15 bg-cream transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-olive hover:shadow-[0_18px_40px_-24px_rgba(25,26,23,0.45)] [&:last-child:nth-child(odd)]:lg:col-span-2"
    >
      <div className="overflow-hidden">
        <ProjectVisual
          kind={project.visual}
          tone={project.tone}
          image={project.image}
          alt={`${project.title} preview`}
          className="h-56 transition-transform duration-500 group-hover:scale-[1.04] sm:h-64"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-sm font-medium text-olive-dark">{project.category}</p>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-snug">{project.title}</h3>
        <p className="mt-3 max-w-[60ch] leading-relaxed text-ink/80">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
          {shownTech.map((t) => (
            <li key={t} className="border border-ink/25 px-2.5 py-1 text-sm">
              {t}
            </li>
          ))}
          {extra > 0 && <li className="px-1 py-1 text-sm text-ink/70">+{extra} more</li>}
          {project.tech.length === 0 && <li className="py-1 text-sm text-ink/70">Stack details coming soon</li>}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2.5 pt-7">
          <Button
            size="sm"
            variant="outline"
            href={hasRepo ? project.github : undefined}
            external
            disabled={!hasRepo}
            title={hasRepo ? undefined : "Repository link coming soon"}
            ariaLabel={hasRepo ? `${project.title} on GitHub` : `${project.title} GitHub link coming soon`}
            icon={<Github size={16} />}
          >
            GitHub
          </Button>
          {project.demo && (
            <Button
              size="sm"
              variant="outline"
              href={project.demo}
              external
              ariaLabel={`${project.title} live demo`}
              icon={<ExternalLink size={16} />}
            >
              Live Demo
            </Button>
          )}
          <Button
            size="sm"
            variant="primary"
            onClick={() => onOpen(project)}
            ariaLabel={`View details for ${project.title}`}
            icon={<Maximize2 size={15} />}
          >
            View Details
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const close = useCallback(() => setSelected(null), []);

  const filters = useMemo(() => {
    const present = projectCategories.filter((c) => projects.some((p) => p.category === c));
    return ["All" as const, ...present];
  }, []);

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" tone="beige" labelledBy="projects-title">
      <div className="flex flex-col gap-8">
        <SectionHeading
          id="projects-title"
          title="Things I've built"
          description="A mix of applications, machine learning experiments and research work. Open any project for the details."
        />
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f === "All" ? projects.length : projects.filter((p) => p.category === f).length;
            const isActive = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-olive bg-olive text-cream"
                    : "border-ink/30 text-ink hover:border-ink hover:bg-ink hover:text-cream"
                }`}
              >
                {f} <span className={isActive ? "text-cream/85" : "text-ink/70"}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div layout className="mt-14 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <Suspense fallback={null}>
        <AnimatePresence>
          {selected && <ProjectModal key={selected.id} project={selected} onClose={close} />}
        </AnimatePresence>
      </Suspense>
    </Section>
  );
}
