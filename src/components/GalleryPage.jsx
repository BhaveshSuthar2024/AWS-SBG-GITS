import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  galleryPhotos,
  galleryEvents,
  GALLERY_CATEGORIES,
  filterGallery,
} from "../utils/homePageData";
import GalleryGrid from "./GalleryGrid";
import ImageLightbox from "./ImageLightbox";
import "./Gallery.css";

export default function GalleryPage() {
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("All");
  const [event, setEvent] = useState("All");
  const [active, setActive] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const photos = useMemo(
    () => filterGallery(galleryPhotos, { category, event, sort }),
    [category, event, sort],
  );

  useEffect(() => {
    const id = params.get("photo");
    if (!id) return;
    const idx = photos.findIndex((p) => p.id === id);
    if (idx >= 0) setActive(idx);
    else setActive(null);
  }, [params, photos]);

  const openPhoto = (index) => {
    setActive(index);
    const next = new URLSearchParams(params);
    next.set("photo", photos[index].id);
    setParams(next, { replace: true });
  };

  const closePhoto = () => {
    setActive(null);
    const next = new URLSearchParams(params);
    next.delete("photo");
    setParams(next, { replace: true });
  };

  return (
    <div className="gallery-page">
      <div className="container">
        <header className="gallery-page-head">
          <p className="gallery-eyebrow">AWS Student Builder Club · GITS <span> / THE ARCHIVE</span></p>
          <h1>Stories from<br /><em>the build.</em></h1>
          <p>
            A visual record of the workshops, talks, labs, and community moments that bring builders together.
          </p>
        </header>

        <div className="gallery-filters">
          <div className="gallery-filter-group">
            <span>Sort</span>
            <button
              type="button"
              className={sort === "newest" ? "is-on" : ""}
              aria-pressed={sort === "newest"}
              onClick={() => setSort("newest")}
            >
              Newest
            </button>
            <button
              type="button"
              className={sort === "oldest" ? "is-on" : ""}
              aria-pressed={sort === "oldest"}
              onClick={() => setSort("oldest")}
            >
              Oldest
            </button>
          </div>

          <div className="gallery-filter-group">
            <span>Category</span>
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                className={category === c ? "is-on" : ""}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <label className="gallery-event-select">
            <span>Event</span>
            <select value={event} onChange={(e) => setEvent(e.target.value)}>
              <option value="All">All events</option>
              {galleryEvents.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="gallery-count">
          {photos.length} photograph{photos.length === 1 ? "" : "s"}
        </p>

        {photos.length === 0 ? (
          <p className="gallery-empty">No photographs match these filters yet.</p>
        ) : (
          <GalleryGrid photos={photos} onSelect={openPhoto} />
        )}
      </div>

      {active !== null && photos[active] && (
        <ImageLightbox
          photos={photos}
          index={active}
          onClose={closePhoto}
          onIndexChange={(i) => openPhoto(i)}
        />
      )}
    </div>
  );
}
