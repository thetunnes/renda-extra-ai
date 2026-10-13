import { Video, CircleDollarSign, MousePointer2, Link2 } from 'lucide-react';
import copy from '@/content/copy.json';
const stepIcons = { MousePointer2, Link2, Video, CircleDollarSign };
export default function How() {
  return (
    <>
      <section id="como-funciona" className="how-section">
        <div className="wrap">
          <span className="eyebrow">{copy.how.eyebrow}</span>
          <h2>
            {copy.how.title}
            <br />
            {copy.how.titleLine2}
          </h2>
          <ol className="steps" role="list">
            {copy.how.steps
              .map((s) => ({ ...s, icon: stepIcons[s.icon as keyof typeof stepIcons] }))
              .map((s) => (
                <li key={s.title}>
                  <div className="step-top">
                    <span>
                      <s.icon size={22} />
                    </span>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
          </ol>
        </div>
      </section>
    </>
  );
}
