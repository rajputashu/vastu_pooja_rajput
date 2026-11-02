const reviews = [
  {
    tag: "Home Energy",
    quote:
      "The guidance was simple, calming, and genuinely thoughtful. It helped me understand small but meaningful changes in my home.",
    name: "Client A",
  },
  {
    tag: "Office Flow",
    quote:
      "I appreciated the clear suggestions and the practical approach. It felt supportive without being overwhelming.",
    name: "Client B",
  },
  {
    tag: "Spiritual Wellness",
    quote:
      "The consultation made me feel more aware of my rhythm and daily environment. The recommendations were easy to follow.",
    name: "Client C",
  },
];

export function Reviews() {
  return (
    <section className="home-block mx-auto max-w-6xl px-5 md:px-10">
      <p className="home-kicker">Customer reviews</p>
      <h2>Words from people seeking balance.</h2>
      <p className="home-lead mt-2">Sample notes from the studio draft, not verified public reviews yet.</p>
      <div className="home-reviews">
        {reviews.map((review) => (
          <article key={review.name} className="home-review">
            <span>{review.tag}</span>
            <p>“{review.quote}”</p>
            <strong>— {review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
