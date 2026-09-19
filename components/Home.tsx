import type { ComponentType } from 'react';
import experience from '@/config/experience.json';
import Header from './home/Header';
import Hero from './home/Hero';
import Trust from './home/Trust';
import Catalog from './home/Catalog';
import Quiz from './home/Quiz';
import Comparison from './home/Comparison';
import How from './home/How';
import About from './home/About';
import Guides from './home/Guides';
import Transparency from './home/Transparency';
import Faq from './home/Faq';
import Footer from './home/Footer';
const sections: Record<string, ComponentType> = {
  hero: Hero,
  trust: Trust,
  catalog: Catalog,
  quiz: Quiz,
  comparison: Comparison,
  how: How,
  about: About,
  guides: Guides,
  transparency: Transparency,
  faq: Faq,
};
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {experience.sections.map((name) => {
          const Section = sections[name];
          return <Section key={name} />;
        })}
      </main>
      <Footer />
    </>
  );
}
