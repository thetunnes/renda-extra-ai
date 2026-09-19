import { site } from '@/lib/site';
import copy from '@/content/copy.json';
export default function About() {
  return (
    <>
      <section id="sobre" className="editorial section wrap">
        <div>
          <span className="eyebrow">{copy.about.eyebrow}</span>
          <h2>
            {copy.about.title}
            <br />
            {copy.about.titleLine2}
          </h2>
        </div>
        <div>
          <p>{copy.about.intro}</p>
          <p>
            {copy.about.bodyBeforeBrand} <strong>{site.name}</strong> {copy.about.bodyAfterBrand}
          </p>
          <span className="editorial-note">
            <span className="green-dot" />
            {copy.about.note}
          </span>
        </div>
      </section>
    </>
  );
}
