import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProfilePhoto } from "@/components/ui/ProfilePhoto";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

const facts: { label: string; value: string }[] = [
  { label: "Studying now", value: "MS Artificial Intelligence, NUST (College of E&ME)" },
  { label: "Graduated", value: "BS Artificial Intelligence, FAST NUCES Islamabad, 2022 to 2026" },
  { label: "Interested in", value: "Machine learning, deep learning, computer vision, explainable AI" },
  { label: "Projects listed", value: `${projects.length} on this site` },
  ...(site.location ? [{ label: "Based in", value: site.location }] : []),
];

export default function About() {
  return (
    <Section id="about" tone="cream" labelledBy="about-title">
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-12">
        <Reveal className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <div className="relative mx-auto max-w-[400px]">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-[999px] border border-olive" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] bg-taupe">
              <ProfilePhoto />
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading id="about-title" title="A Little About Me" />

          <Reveal delay={0.05} className="mt-8 max-w-[62ch] space-y-5 text-lg leading-[1.75] text-ink/85">
            <p>
              I&rsquo;m an AI graduate from FAST NUCES Islamabad, where I completed my BS in Artificial
              Intelligence, and I&rsquo;m now studying for an MS in Artificial Intelligence at NUST&rsquo;s College
              of E&amp;ME.
            </p>
            <p>
              Most of what I know comes from building things: an app that reads stories aloud, an intrusion
              detection model that can explain its own decisions, a computer vision studio, a customer support
              assistant. Along the way I&rsquo;ve worked across Python, PyTorch and TensorFlow on the model side
              and React and FastAPI on the application side, because a model only matters once someone can use it.
            </p>
            <p>
              Machine learning, deep learning and computer vision are what I enjoy most, along with explainability:
              being able to show why a model reached a decision. I&rsquo;m early in my career and still learning
              something new every week. I&rsquo;m looking for projects and collaborations where I can build useful
              software and keep growing.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 max-w-2xl">
            <dl className="divide-y divide-ink/15 border-y border-ink/15">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-display text-sm font-semibold text-olive-dark">{f.label}</dt>
                  <dd className="text-ink/90">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
