import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillCategories, totalSkills } from "@/data/skills";

export default function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const current = skillCategories.find((c) => c.id === activeId) ?? skillCategories[0];
  const Icon = current.icon;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const index = skillCategories.findIndex((c) => c.id === activeId);
    const forward = e.key === "ArrowDown" || e.key === "ArrowRight";
    const next = skillCategories[(index + (forward ? 1 : -1) + skillCategories.length) % skillCategories.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <Section id="skills" tone="dark" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        dark
        title="What I work with"
        description={`${totalSkills} tools and topics across five areas. Pick an area to see what's in it.`}
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {skillCategories.map((cat) => {
              const selected = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  ref={(el) => {
                    tabRefs.current[cat.id] = el;
                  }}
                  role="tab"
                  id={`tab-${cat.id}`}
                  aria-selected={selected}
                  aria-controls="skills-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(cat.id)}
                  className={`relative shrink-0 whitespace-nowrap border border-cream/20 px-5 py-3 text-left font-display text-lg font-semibold transition-colors lg:flex lg:items-center lg:justify-between lg:whitespace-normal lg:border-0 lg:border-b lg:px-0 lg:py-5 lg:text-2xl ${
                    selected ? "text-cream" : "text-cream/65 hover:text-cream"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="skill-tab"
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1 bg-olive-light lg:-left-5"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span>{cat.label}</span>
                  <span className="ml-3 hidden text-base font-normal text-taupe lg:inline">{cat.skills.length}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="lg:col-span-8" role="tabpanel" id="skills-panel" aria-labelledby={`tab-${current.id}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-olive text-cream">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-serif text-3xl">{current.label}</h3>
                  <p className="text-taupe">{current.blurb}</p>
                </div>
              </div>

              <ul className="mt-9 flex flex-wrap gap-3">
                {current.skills.map((skill, i) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 + i * 0.04 }}
                    className="cursor-default rounded-full border border-cream/30 px-5 py-3 font-display text-lg font-medium transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-olive hover:bg-olive"
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
