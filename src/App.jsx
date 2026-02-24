import { marked } from "marked";
import { useMemo, useState } from "react";

const experiences = [
  {
    company: "Meta",
    role: "Incoming Software Engineer Intern",
    location: "Menlo Park, CA",
    summary: "Awaiting team matching.",
    logo: "/meta.png"
  },
  {
    company: "Spice AI",
    role: "Software Engineer Intern",
    location: "Seattle, WA",
    summary: "Runtime.",
    logo: "/spice.jpeg"
  },
  {
    company: "Software Engineering Career Club",
    role: "Software Engineer, Co-President",
    location: "Seattle, WA",
    summary: "Performance, AI services, and presidenting.",
    logo: "/swecc.png"
  },
  {
    company: "Husky Coding Project",
    role: "Software Engineer",
    location: "Seattle, WA",
    summary: "AI testing + RAG tooling.",
    logo: "/husky.jpeg"
  }
];

const projects = [
  {
    name: "geeRPC",
    tag: "Rust • Systems",
    summary: "Built a Rust async RPC framework with code-generated stubs and a concurrency-first design."
  },
  {
    name: "SnapCook",
    tag: "AR • RAG",
    summary: "Built a voice-controlled AR cooking assistant with a RAG pipeline and a NextJS API."
  },
  {
    name: "Skyline Notes",
    tag: "React • Firebase",
    summary: "Built a real-time collaborative notes app with React, Firebase, and shared workspaces."
  }
];

const rawNotes = import.meta.glob("./notes/**/*.md", { as: "raw", eager: true });

const parseFrontmatter = (content) => {
  if (!content.startsWith("---")) {
    return { data: {}, body: content };
  }

  const end = content.indexOf("---", 3);
  if (end === -1) {
    return { data: {}, body: content };
  }

  const frontmatter = content.slice(3, end).trim();
  const body = content.slice(end + 3).trimStart();
  const data = {};

  let currentKey = null;
  frontmatter.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;

    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, rawValue] = keyMatch;
      currentKey = key;
      if (!rawValue) {
        data[key] = [];
        return;
      }
      if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
        data[key] = rawValue
          .slice(1, -1)
          .split(",")
          .map((val) => val.trim())
          .filter(Boolean);
      } else if (rawValue.includes(",")) {
        data[key] = rawValue
          .split(",")
          .map((val) => val.trim())
          .filter(Boolean);
      } else {
        data[key] = rawValue.trim();
      }
      return;
    }

    const listMatch = line.match(/^\s*-\s*(.+)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
      }
      data[currentKey].push(listMatch[1].trim());
    }
  });

  return { data, body };
};

const extractTitle = (content, fallback) => {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
};

const slugToTitle = (slug) =>
  slug
    .split("/")
    .pop()
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const createExcerpt = (body) => {
  const cleaned = body.replace(/[#>*_`]/g, "").replace(/\s+/g, " ").trim();
  return cleaned.length > 180 ? `${cleaned.slice(0, 180)}…` : cleaned;
};

const titleFromGroup = (group) =>
  group
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const notes = Object.entries(rawNotes)
  .map(([path, content]) => {
    const { data, body } = parseFrontmatter(content);
    const slug = path.replace(/^.*\/notes\//, "").replace(/\.md$/, "");
    const title = data.title || extractTitle(body, slugToTitle(slug));
    const tags = Array.isArray(data.tags)
      ? data.tags
      : data.tags
      ? [data.tags]
      : [];
    const cleanedBody = body.replace(/^#\s+.+$/m, "").trim();
    const [group, subgroup] = slug.split("/");
    return {
      slug,
      title,
      tags,
      group: group || "Notes",
      subgroup: subgroup || null,
      snippet: createExcerpt(cleanedBody),
      html: marked.parse(cleanedBody)
    };
  })
  .filter((note) => note.slug !== "index")
  .sort((a, b) => a.title.localeCompare(b.title));

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [activeGroup, setActiveGroup] = useState("all");
  const [activeNote, setActiveNote] = useState(null);

  const availableTags = useMemo(() => {
    const tagSet = new Set();
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
    return ["all", ...Array.from(tagSet).sort()];
  }, []);

  const groupMap = useMemo(() => {
    return notes.reduce((acc, note) => {
      const group = note.group;
      if (!acc[group]) acc[group] = { total: 0, subgroups: new Set() };
      acc[group].total += 1;
      if (note.subgroup) acc[group].subgroups.add(note.subgroup);
      return acc;
    }, {});
  }, []);

  const availableGroups = useMemo(() => {
    const groupSet = Object.keys(groupMap).sort();
    return ["all", ...groupSet];
  }, [groupMap]);

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return notes.filter((note) => {
      const matchesTag = activeTag === "all" || note.tags.includes(activeTag);
      const matchesGroup = activeGroup === "all" || note.group === activeGroup;
      if (!matchesTag || !matchesGroup) return false;
      if (!normalizedQuery) return true;
      const haystack = `${note.title} ${note.snippet} ${note.tags.join(" ")}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, activeTag, activeGroup]);

  const notesByGroup = useMemo(() => {
    return filteredNotes.reduce((acc, note) => {
      const key = note.group;
      if (!acc[key]) acc[key] = [];
      acc[key].push(note);
      return acc;
    }, {});
  }, [filteredNotes]);

  const searchMode = query.trim().length > 0;

  const currentNote = useMemo(() => {
    if (!activeNote) return null;
    return notes.find((note) => note.slug === activeNote) || null;
  }, [activeNote]);

  return (
    <main className="page">
      <header className="tabs">
        <button
          className={activeTab === "home" ? "tab active" : "tab"}
          type="button"
          onClick={() => {
            setActiveTab("home");
            setActiveNote(null);
          }}
        >
          Home
        </button>
        <button
          className={activeTab === "notes" ? "tab active" : "tab"}
          type="button"
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </header>

      {activeTab === "home" && (
        <>
          <section className="hero" id="top">
            <p className="role">Computer Science @ University of Washington</p>
            <h1>Advay Patil</h1>
            <p className="text mission">
              Interested in distributed systems, infrastructure, and backend engineering, with a focus on building
              reliable systems that scale.
            </p>
            <div className="links">
              <a href="https://github.com/Advayp" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/advaypatil27" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:apat23@uw.edu">apat23@uw.edu</a>
            </div>
          </section>

          <section className="section" id="work">
            <div className="section-head">
              <h2>Experience</h2>
            </div>
            <div className="scroll-panel" role="region" aria-label="Experience list">
              {experiences.map((exp) => (
                <article key={exp.company}>
                  <div className="row">
                    <div className="company">
                      <img className="logo" src={exp.logo} alt={`${exp.company} logo`} />
                      <div>
                        <h3>{exp.company}</h3>
                        <p className="meta">
                          {exp.role} · {exp.location}
                        </p>
                        <p className="summary">{exp.summary}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="projects">
            <div className="section-head">
              <h2>Projects</h2>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-tag">{project.tag}</div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="contact">
            <div className="section-head">
              <h2>Contact</h2>
            </div>
            <p className="text">apat23@uw.edu · Seattle, WA</p>
          </section>

          <footer className="footer">© 2026 Advay Patil</footer>
        </>
      )}

      {activeTab === "notes" && (
        <section className="section notes-view" id="notes">
          <div className="section-head notes-header">
            <h2>Notes</h2>
            {currentNote && (
              <button className="back" type="button" onClick={() => setActiveNote(null)}>
                Back to all notes
              </button>
            )}
          </div>

          {!currentNote && (
            <>
              <div className="notes-controls">
                <input
                  type="search"
                  placeholder="Search by title, tag, or content"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="tag-row">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    className={tag === activeTag ? "tag active" : "tag"}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="notes-layout">
                <aside className="notes-sidebar">
                  <button
                    className={activeGroup === "all" ? "sidebar-item active" : "sidebar-item"}
                    type="button"
                    onClick={() => setActiveGroup("all")}
                  >
                    All notes
                  </button>
                  {availableGroups
                    .filter((group) => group !== "all")
                    .map((group) => (
                      <div key={group} className="sidebar-group">
                        <button
                          className={activeGroup === group ? "sidebar-item active" : "sidebar-item"}
                          type="button"
                          onClick={() => setActiveGroup(group)}
                        >
                          {titleFromGroup(group)}
                        </button>
                        {groupMap[group]?.subgroups?.size > 0 && (
                          <div className="sidebar-subgroup">
                            {Array.from(groupMap[group].subgroups)
                              .sort()
                              .map((subgroup) => (
                                <span key={`${group}-${subgroup}`} className="sidebar-subitem">
                                  {titleFromGroup(subgroup)}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </aside>
                <div className="notes-grid">
                  {searchMode && (
                    <div className="note-group">
                      <h3 className="group-title">Search results</h3>
                      <div className="note-list">
                        {filteredNotes.map((note) => (
                          <button
                            className="note-item"
                            key={note.slug}
                            type="button"
                            onClick={() => setActiveNote(note.slug)}
                          >
                            <div>
                              <div className="note-title">{note.title}</div>
                              <div className="note-path">
                                {titleFromGroup(note.group)}
                                {note.subgroup ? ` / ${titleFromGroup(note.subgroup)}` : ""}
                              </div>
                            </div>
                            {note.tags.length > 0 && (
                              <div className="note-tags">
                                {note.tags.map((tag) => (
                                  <span key={`${note.slug}-${tag}`} className="note-tag">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!searchMode &&
                    Object.entries(notesByGroup).map(([group, groupNotes]) => (
                      <div className="note-group" key={group}>
                        <h3 className="group-title">{titleFromGroup(group)}</h3>
                        <div className="note-list">
                          {groupNotes.map((note) => (
                            <button
                              className="note-item"
                              key={note.slug}
                              type="button"
                              onClick={() => setActiveNote(note.slug)}
                            >
                              <div>
                                <div className="note-title">{note.title}</div>
                                {note.subgroup && (
                                  <div className="note-path">{titleFromGroup(note.subgroup)}</div>
                                )}
                              </div>
                              {note.tags.length > 0 && (
                                <div className="note-tags">
                                  {note.tags.map((tag) => (
                                    <span key={`${note.slug}-${tag}`} className="note-tag">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {filteredNotes.length === 0 && <p className="text">No notes match that filter.</p>}
            </>
          )}

          {currentNote && (
            <article className="note-page">
              <div className="note-page-header">
                <h2>{currentNote.title}</h2>
                {currentNote.tags.length > 0 && (
                  <div className="note-tags">
                    {currentNote.tags.map((tag) => (
                      <span key={`${currentNote.slug}-${tag}`} className="note-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="note-body" dangerouslySetInnerHTML={{ __html: currentNote.html }} />
            </article>
          )}
        </section>
      )}
    </main>
  );
}
