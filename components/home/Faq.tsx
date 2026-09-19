import { brandText } from '@/lib/presentation';
import { Plus } from 'lucide-react';
import copy from '@/content/copy.json';
export default function Faq() {
  return (
    <>
      <section className="faq section wrap">
        <div>
          <span className="eyebrow">{copy.faq.eyebrow}</span>
          <h2>
            {copy.faq.title} <br />
            {copy.faq.titleLine2}
          </h2>
        </div>
        <div>
          {copy.faq.items.map(([q, a]) => (
            <details key={q}>
              <summary>
                {brandText(q)}
                <Plus size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
