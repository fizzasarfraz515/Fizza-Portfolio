import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Github, ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import ProjectVisual from "@/components/ui/ProjectVisual";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const hasRepo = project.github !== "";

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        className="absolute inset-0 bg-ink/75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-cream text-ink md:grid-cols-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/90 text-ink ring-1 ring-ink/20 transition-colors hover:bg-ink hover:text-cream"
        >
          <X size={18} />
        </button>

        <ProjectVisual
          kind={project.visual}
          tone={project.tone}
          image={project.image}
          alt={`${project.title} preview`}
          className="h-56 md:h-full md:min-h-[480px]"
        />

        <div className="p-6 sm:p-9">
          <p className="text-sm font-medium text-olive-dark">{project.category}</p>
          <h3 id="project-dialog-title" className="mt-2 font-serif text-3xl font-medium leading-tight">
            {project.title}
          </h3>
          <p className="mt-4 leading-relaxed text-ink/80">{project.summary}</p>

          <h4 className="mt-7 font-display text-sm font-semibold">What it does</h4>
          <ul className="mt-3 space-y-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-ink/85">
                <Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-olive-dark" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          {project.detailsPending && (
            <p className="mt-3 text-sm text-ink/70">Feature highlights and the full stack will be added soon.</p>
          )}

          {project.tech.length > 0 && (
            <>
              <h4 className="mt-7 font-display text-sm font-semibold">Built with</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li key={t} className="border border-ink/25 px-2.5 py-1 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              variant="primary"
              href={hasRepo ? project.github : undefined}
              external
              disabled={!hasRepo}
              title={hasRepo ? undefined : "Repository link coming soon"}
              icon={<Github size={17} />}
            >
              GitHub
            </Button>
            {project.demo && (
              <Button variant="outline" href={project.demo} external icon={<ExternalLink size={17} />}>
                Live Demo
              </Button>
            )}
          </div>
          {!hasRepo && <p className="mt-3 text-sm text-ink/70">Repository link coming soon.</p>}
        </div>
      </motion.div>
    </div>
  );
}
