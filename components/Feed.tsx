import { formatMoney } from "@/lib/money";
import { people, type Person } from "@/lib/people";
import { Avatar } from "./Avatar";
import { Reveal } from "./Reveal";

export function Feed() {
  return (
    <section className="feed" aria-labelledby="feed-title">
      <div className="shell feed-grid">
        <div className="feed-copy">
          <Reveal as="p" className="kicker">Social</Reveal>
          <Reveal as="h2" className="section-title" delay={60}>
            <span id="feed-title">Every payment is a moment.</span>
          </Reveal>
          <Reveal as="p" className="lede" delay={120}>
            Your people, wherever they live: the rent split, the wedding gift, the thank-you that
            came with a 🍲. React, reply, laugh about it later.
          </Reveal>
          <Reveal as="p" className="lede" delay={180}>
            Everything starts private. You choose, one payment at a time, who gets to see it.
          </Reveal>
        </div>

        <Reveal className="feed-visual" delay={120}>
          <div aria-hidden="true">
            <FeedItem
              from={people.lea}
              to={people.jonas}
              amount={formatMoney(450, "EUR")}
              note="rent, my half 🏠"
              where="Lisbon → Berlin"
              when="2m"
              audience="Just us"
            />
            <FeedItem
              from={people.priya}
              to={people.mum}
              amount={formatMoney(60, "GBP")}
              note="thank you for the food parcel 🍲"
              where="London → Mumbai"
              when="1h"
              audience="Friends"
              reactions={["❤️", "🥹", "🙌"]}
              comment={{ who: people.asha, text: "she sent me one too 😭" }}
            />
            <FeedItem
              from={people.rafa}
              to={people.kemi}
              amount={formatMoney(100, "BRL")}
              note="you were right about the final ⚽"
              where="São Paulo → Lagos"
              when="3h"
              audience="Friends"
              reactions={["🔥", "😂"]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FeedItem({
  from,
  to,
  amount,
  note,
  where,
  when,
  audience,
  reactions,
  comment,
}: {
  from: Person;
  to: Person;
  amount: string;
  note: string;
  where: string;
  when: string;
  audience: "Just us" | "Friends";
  reactions?: string[];
  comment?: { who: Person; text: string };
}) {
  return (
    <div className="feed-item">
      <div className="feed-faces">
        <Avatar person={from} size={44} />
        <span className="feed-face-to">
          <Avatar person={to} size={24} ring />
        </span>
      </div>
      <div className="feed-main">
        <p className="feed-line">
          <strong>{from.name}</strong> <span className="v-muted">zended</span> <strong>{to.name}</strong>
          <span className="feed-when"> · {when}</span>
        </p>
        <p className="feed-note">{note}</p>
        <div className="feed-meta">
          <span className={audience === "Just us" ? "audience" : "audience audience-open"}>{audience}</span>
          <span className="feed-where">{where}</span>
          {reactions && <span className="feed-reactions">{reactions.join(" ")}</span>}
        </div>
        {comment && (
          <p className="feed-comment">
            <Avatar person={comment.who} size={20} />
            <span>
              <strong>{comment.who.name}</strong> {comment.text}
            </span>
          </p>
        )}
      </div>
      <p className="feed-amount" suppressHydrationWarning>{amount}</p>
    </div>
  );
}
