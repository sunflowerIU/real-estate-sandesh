"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import type { PropertyMedia } from "@/types/property";

interface PropertyMediaCarouselProps {
  media: PropertyMedia[];
  title: string;
}

export function PropertyMediaCarousel({ media, title }: PropertyMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const hasMultiple = media.length > 1;
  const activeMedia = media[activeIndex] ?? media[0];

  const showPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + media.length) % media.length);
  }, [media.length]);

  const showNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % media.length);
  }, [media.length]);

  return (
    <section
      className="media-carousel"
      aria-label={`${title} media gallery`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showPrevious();
        if (event.key === "ArrowRight") showNext();
      }}
    >
      <div className="detail-image carousel-stage">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`${activeMedia.src}-${activeIndex}`}
            className="carousel-slide"
            custom={direction}
            initial={{ opacity: 0, x: direction * 90 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -90 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            drag={hasMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={(_, info) => {
              if (info.offset.x < -45 || info.velocity.x < -450) showNext();
              if (info.offset.x > 45 || info.velocity.x > 450) showPrevious();
            }}
          >
            {activeMedia.type === "video" ? (
              <video controls preload="metadata" poster={activeMedia.poster} aria-label={activeMedia.alt ?? `${title} video`}>
                <source src={activeMedia.src} />
                Your browser does not support this property video.
              </video>
            ) : (
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt ?? title}
                fill
                priority={activeIndex === 0}
                sizes="(max-width: 900px) 100vw, 65vw"
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <span className="media-counter">{activeIndex + 1} / {media.length}</span>
        {hasMultiple && <span className="swipe-hint">Swipe to explore</span>}
        {hasMultiple && (
          <div className="carousel-controls">
            <Button variant="secondary" size="icon-lg" onClick={showPrevious} aria-label="Previous photo or video"><ChevronLeft /></Button>
            <Button variant="secondary" size="icon-lg" onClick={showNext} aria-label="Next photo or video"><ChevronRight /></Button>
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="media-thumbnails" aria-label="Choose gallery item">
          {media.map((item, index) => (
            <button
              key={`${item.src}-${index}`}
              className={activeIndex === index ? "active" : ""}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              aria-label={`Show ${item.type} ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
            >
              {item.type === "image" ? (
                <Image src={item.src} alt="" fill sizes="90px" />
              ) : item.poster ? (
                <Image src={item.poster} alt="" fill sizes="90px" />
              ) : (
                <span className="video-thumbnail"><Play aria-hidden="true" /></span>
              )}
              <span className="thumbnail-type" aria-hidden="true">{item.type === "image" ? <ImageIcon /> : <Play />}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
