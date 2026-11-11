import { useState, type ChangeEvent, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContact } from "@/lib/contact";
import { site } from "@/data/site";

type Field = "name" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;
type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "sent" }
  | { state: "mailto" }
  | { state: "error"; message: string };

const empty: Values = { name: "", email: "", subject: "", message: "" };
const fields: Field[] = ["name", "email", "subject", "message"];

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = "Enter a valid email address, like name@example.com.";
  if (v.subject.trim().length < 3) errors.subject = "Add a short subject (at least 3 characters).";
  if (v.message.trim().length < 20) errors.message = "Tell me a bit more: write at least 20 characters.";
  return errors;
}

interface FieldProps {
  id: Field;
  label: string;
  type?: string;
  value: string;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
}

function FormField({ id, label, type = "text", value, error, multiline, autoComplete, onChange, onBlur }: FieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    onChange,
    onBlur,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `w-full border bg-beige/60 px-4 py-3 text-ink placeholder:text-ink/50 outline-none transition-colors focus:border-olive focus:ring-2 focus:ring-olive/30 ${
      error ? "border-[#9B2C2C]" : "border-ink/30"
    }`,
  };
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block font-display text-sm font-semibold">
        {label}
      </label>
      {multiline ? <textarea rows={6} {...shared} /> : <input type={type} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-[#9B2C2C]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const errors = validate(values);
  const shown = (f: Field) => (touched[f] ? errors[f] : undefined);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as Field;
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (status.state === "sent" || status.state === "mailto" || status.state === "error") setStatus({ state: "idle" });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setTouched({ name: true, email: true, subject: true, message: true });

    const firstInvalid = fields.find((f) => errors[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    // Hidden honeypot: real visitors never fill it in.
    if ((new FormData(form).get("company") as string | null)?.length) {
      setStatus({ state: "sent" });
      setValues(empty);
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const result = await submitContact({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      setStatus({ state: result === "sent" ? "sent" : "mailto" });
      setValues(empty);
      setTouched({});
    } catch {
      setStatus({
        state: "error",
        message: `Your message could not be sent. Check your connection and try again, or email ${site.email} directly.`,
      });
    }
  };

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 bg-cream p-6 text-ink sm:p-9" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField id="name" label="Name" autoComplete="name" value={values.name} error={shown("name")} onChange={onChange} onBlur={() => setTouched((t) => ({ ...t, name: true }))} />
        <FormField id="email" label="Email" type="email" autoComplete="email" value={values.email} error={shown("email")} onChange={onChange} onBlur={() => setTouched((t) => ({ ...t, email: true }))} />
      </div>
      <FormField id="subject" label="Subject" value={values.subject} error={shown("subject")} onChange={onChange} onBlur={() => setTouched((t) => ({ ...t, subject: true }))} />
      <FormField id="message" label="Message" multiline value={values.message} error={shown("message")} onChange={onChange} onBlur={() => setTouched((t) => ({ ...t, message: true }))} />

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting} icon={submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={17} />}>
          {submitting ? "Sending" : "Send message"}
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {status.state === "sent" && (
          <p className="flex gap-2 border border-olive bg-olive/10 p-4 text-sm text-ink">
            <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-olive-dark" />
            Message sent. Thank you, I&rsquo;ll reply by email.
          </p>
        )}
        {status.state === "mailto" && (
          <p className="flex gap-2 border border-olive bg-olive/10 p-4 text-sm text-ink">
            <CheckCircle2 size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-olive-dark" />
            <span>
              Your email app should now be open with this message filled in. It has not been sent yet: press Send
              there. If nothing opened, write to {site.email}.
            </span>
          </p>
        )}
        {status.state === "error" && (
          <p className="flex gap-2 border border-[#9B2C2C] bg-[#9B2C2C]/10 p-4 text-sm text-ink" role="alert">
            <AlertCircle size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#9B2C2C]" />
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
