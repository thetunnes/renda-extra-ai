import { platforms } from '@/lib/site';
import Mark from '@/components/ui/PlatformMark';
import { comparisonFacts } from '@/domain/platforms';
import copy from '@/content/copy.json';
export default function Comparison() {
  return (
    <>
      <section id="comparar" className="section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{copy.comparison.eyebrow}</span>
            <h2>{copy.comparison.title}</h2>
            <p>{copy.comparison.description}</p>
          </div>
        </div>
        <div className="comparison" id="comparison">
          <table>
            <caption className="sr-only">{copy.comparison.caption}</caption>
            <thead>
              <tr>
                <th>{copy.comparison.columnTitle}</th>
                {platforms.map((p) => (
                  <th key={p.id}>
                    <span>
                      <Mark p={p} />
                      {p.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFacts(platforms[0])
                .map(([label], i) => [label, ...platforms.map((p) => comparisonFacts(p)[i][1])])
                .map((row) => (
                  <tr key={row[0]}>
                    {row.map((v, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {v}
                        </th>
                      ) : (
                        <td key={i}>{v}</td>
                      ),
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="mobile-comparison">
          {platforms.map((p) => (
            <article key={p.id}>
              <h3>
                <Mark p={p} />
                {p.name}
              </h3>
              <dl>
                {comparisonFacts(p).map(([a, b]) => (
                  <div key={a}>
                    <dt>{a}</dt>
                    <dd>{b}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <p className="footnote">{copy.comparison.disclaimer}</p>
      </section>
    </>
  );
}
