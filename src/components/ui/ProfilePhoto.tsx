import { useState } from "react";
import { site } from "@/data/site";

/** Shows the real photo when site.profileImage is set; otherwise a clean placeholder. */
export function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  if (site.profileImage && !failed) {
    return (
      <img
        src={site.profileImage}
        alt={`Portrait of ${site.name}`}
        width={800}
        height={1000}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Portrait placeholder. Add your photo in src/data/site.ts."
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill="#B7AD98" />
      <circle cx="200" cy="200" r="150" fill="#E9E1D2" opacity="0.35" />
      <circle cx="200" cy="200" r="100" fill="none" stroke="#F5F1E8" strokeWidth="1.5" strokeDasharray="3 7" />
      <circle cx="200" cy="190" r="62" fill="#F5F1E8" opacity="0.85" />
      <path d="M58 500 C58 385 125 322 200 322 S342 385 342 500 Z" fill="#F5F1E8" opacity="0.85" />
      <text
        x="200"
        y="440"
        textAnchor="middle"
        fontSize="20"
        fill="#191A17"
        opacity="0.75"
        style={{ fontFamily: '"DM Sans Variable", sans-serif' }}
      >
        Your photo goes here
      </text>
    </svg>
  );
}
