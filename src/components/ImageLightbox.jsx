import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Share2, Download, Info, Check, ChevronLeft, ChevronRight } from "lucide-react";
import "./Gallery.css";

function formatDate(iso) {
  try {
    return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function ImageLightbox({ photos, index, onClose, onIndexChange }) {
  const photo = photos[index];
  const [copied, setCopied] = useState(false);
  const [showProps, setShowProps] = useState(true);
  const [natural, setNatural] = useState({ w: null, h: null });
  const [downloadState, setDownloadState] = useState("idle");

  useEffect(() => {
    setNatural({ w: null, h: null });
    setDownloadState("idle");
  }, [photo?.id]);

  useEffect(() => {
    if (!photo) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [photo, index, photos.length, onClose, onIndexChange]);

  if (!photo) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/gallery?photo=${photo.id}`
      : photo.src;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: photo.title,
          text: `${photo.title} — ${photo.event}, AWS Student Builder Club GITS`,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {
        /* ignore */
      }
    }
  };

  const handleDownload = async () => {
    setDownloadState("busy");
    const filename = `gits-aws-${photo.id}.jpg`;
    try {
      const res = await fetch(photo.src);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadState("done");
    } catch {
      const a = document.createElement("a");
      a.href = photo.src;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDownloadState("done");
    }
    setTimeout(() => setDownloadState("idle"), 1600);
  };

  return createPortal((
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lb-shell" onClick={(e) => e.stopPropagation()}>
        <button className="lb-close" type="button" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {photos.length > 1 && (
          <>
            <button
              className="lb-nav lb-nav--prev"
              type="button"
              aria-label="Previous photo"
              onClick={() => onIndexChange((index - 1 + photos.length) % photos.length)}
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="lb-nav lb-nav--next"
              type="button"
              aria-label="Next photo"
              onClick={() => onIndexChange((index + 1) % photos.length)}
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <div className="lb-stage">
          <img
            src={photo.src}
            alt={photo.title}
            onLoad={(e) =>
              setNatural({
                w: e.currentTarget.naturalWidth,
                h: e.currentTarget.naturalHeight,
              })
            }
          />
        </div>

        <div className="lb-bar">
          <div className="lb-bar-copy">
            <p className="lb-kicker">{photo.event}</p>
            <h3>{photo.title}</h3>
          </div>
          <div className="lb-actions">
            <button type="button" onClick={handleShare}>
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copied ? "Link copied" : "Share"}</span>
            </button>
            <button type="button" onClick={handleDownload} disabled={downloadState === "busy"}>
              <Download size={16} />
              <span>
                {downloadState === "busy"
                  ? "Saving…"
                  : downloadState === "done"
                    ? "Saved"
                    : "Download"}
              </span>
            </button>
            <button
              type="button"
              className={showProps ? "is-on" : ""}
              onClick={() => setShowProps((v) => !v)}
            >
              <Info size={16} />
              <span>Properties</span>
            </button>
          </div>
        </div>

        {showProps && (
          <dl className="lb-props">
            <div>
              <dt>Event</dt>
              <dd>{photo.event}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{photo.category}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>{formatDate(photo.date)}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{photo.location}</dd>
            </div>
            <div>
              <dt>Archive</dt>
              <dd>{photo.photographer}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{natural.w && natural.h ? `${natural.w} × ${natural.h}` : "Loading…"}</dd>
            </div>
          </dl>
        )}
      </div>
    </div>
  ), document.body);
}
