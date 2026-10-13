'use client';
import { useState } from 'react';
import { ArrowUpRight, ArrowRight, Smartphone, Monitor, Check, Sparkles } from 'lucide-react';
import { platforms, type Platform } from '@/lib/site';
import {
  recommendPlatforms,
  preferences,
  devices,
  type Preference,
  type DevicePreference,
} from '@/domain/platforms';
import copy from '@/content/copy.json';
import PlatformDetails from './PlatformDetails';
export default function Quiz() {
  const [preference, setPreference] = useState<Preference>('Tanto faz');
  const [device, setDevice] = useState<DevicePreference>('Ambos');
  const [result, setResult] = useState(false);
  const [detail, setDetail] = useState<Platform | null>(null);
  const matches = recommendPlatforms(platforms, preference, device);
  return (
    <>
      <section id="encontrar" className="quiz-section wrap">
        <div className="quiz-intro">
          <span className="eyebrow">
            <Sparkles size={14} />
            {copy.quiz.eyebrow}
          </span>
          <h2>
            {copy.quiz.title} <br />
            {copy.quiz.titleLine2}
          </h2>
          <p>{copy.quiz.description}</p>
          <span className="quiz-time">{copy.quiz.privacyNote}</span>
        </div>
        <div className="quiz-form">
          <fieldset>
            <legend>
              <span>{copy.quiz.step1}</span> {copy.quiz.taskQuestion}
            </legend>
            <div className="choices">
              {preferences.map((t) => (
                <button
                  aria-pressed={preference === t}
                  className={preference === t ? 'selected' : ''}
                  onClick={() => {
                    setPreference(t);
                    setResult(false);
                  }}
                  key={t}
                >
                  {t}
                  {preference === t && <Check size={13} />}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span>{copy.quiz.step2}</span> {copy.quiz.deviceQuestion}
            </legend>
            <div className="choices">
              {devices.map((t) => (
                <button
                  aria-pressed={device === t}
                  className={device === t ? 'selected' : ''}
                  onClick={() => {
                    setDevice(t);
                    setResult(false);
                  }}
                  key={t}
                >
                  {t === 'Celular' ? <Smartphone size={15} /> : <Monitor size={15} />} {t}
                </button>
              ))}
            </div>
          </fieldset>
          <button className="button" onClick={() => setResult(true)}>
            {copy.quiz.action}
            <ArrowRight size={17} />
          </button>
          {result && (
            <div className="quiz-results" role="status">
              <b>{copy.quiz.resultsTitle}</b>
              {matches.length ? (
                matches.map((p) => (
                  <button key={p.id} onClick={() => setDetail(p)}>
                    {p.name}
                    <ArrowUpRight size={14} />
                  </button>
                ))
              ) : (
                <p>{copy.quiz.empty}</p>
              )}
              <small>{copy.quiz.requirementsNote}</small>
            </div>
          )}
        </div>
      </section>
      {detail && <PlatformDetails platform={detail} onClose={() => setDetail(null)} />}
    </>
  );
}
