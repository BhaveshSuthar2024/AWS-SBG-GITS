import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { featuredGalleryPhotos } from "../utils/galleryData";
import GalleryGrid from "./GalleryGrid";
import ImageLightbox from "./ImageLightbox";
import "./Gallery.css";

export default function GalleryPreview() {
  const navigate = useNavigate();
  const photos = featuredGalleryPhotos(9);
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="gallery-home">
      <div className="container">
        <div className="gallery-home-head">
          <div>
            <p className="gallery-eyebrow">The club archive</p>
            <h2>Built together.<br /><em>Remembered together.</em></h2>
            <p>
              Moments from workshops, labs, talks, and community gatherings at AWS Student Builder Club, GITS.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-premium gallery-explore"
            onClick={() => navigate("/gallery")}
          >
            Explore more
            <ArrowUpRight size={18} />
          </button>
        </div>

        <GalleryGrid photos={photos} onSelect={setActive} />
      </div>

      {active !== null && (
        <ImageLightbox
          photos={photos}
          index={active}
          onClose={() => setActive(null)}
          onIndexChange={setActive}
        />
      )}
    </section>
  );
}
