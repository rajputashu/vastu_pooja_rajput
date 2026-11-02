const pieces = [
  {
    kind: "Reel",
    title: "Three paintings to skip indoors",
    meta: "Instagram · @poojarajputt_vastu",
    href: "https://www.instagram.com/reel/DVeLkZkjOPu/",
    image: "/images/pooja-home.png",
    alt: "Pooja Rajput",
  },
  {
    kind: "YouTube",
    title: "Five simple ways to bring a home to rest",
    meta: "YouTube · add the video link when it is live",
    href: "",
    image: "/images/courtyard.jpg",
    alt: "A sandstone courtyard",
  },
  {
    kind: "Podcast",
    title: "A longer conversation about a workplace",
    meta: "Audio · add the episode link when it is live",
    href: "",
    image: "/images/studio.jpg",
    alt: "A quiet studio interior",
  },
];

export function MediaShelf() {
  return (
    <section className="home-block mx-auto max-w-6xl px-5 pb-12 md:px-10">
      <p className="home-kicker">Watch and listen</p>
      <h2>Reels, videos, and longer talks.</h2>
      <p className="home-lead mt-2">Each card is only a film or a conversation. Nothing here is for sale.</p>
      <div className="home-media">
        {pieces.map((piece) => {
          const inner = (
            <>
              <img src={piece.image} alt={piece.alt} />
              <span className="kind">{piece.kind}</span>
              <span className="play" aria-hidden="true">
                {piece.kind === "Podcast" ? "♪" : "▶"}
              </span>
              <span className="copy">
                <strong>{piece.title}</strong>
                <small>{piece.meta}</small>
              </span>
            </>
          );
          return piece.href ? (
            <a key={piece.kind} className="home-media-card" href={piece.href} target="_blank" rel="noreferrer">
              {inner}
            </a>
          ) : (
            <article key={piece.kind} className="home-media-card">
              {inner}
            </article>
          );
        })}
      </div>
    </section>
  );
}
