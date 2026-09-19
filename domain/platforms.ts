import type { Platform, Task, Device } from './types';
export const tasks = ['Vídeo', 'Áudio', 'Fotos', 'Robótica', 'Tarefas no computador'] as const;
export const taskFilters = ['Todas', ...tasks] as const;
export const preferences = [...tasks, 'Tanto faz'] as const;
export const devices = ['Celular', 'Computador', 'Ambos'] as const;
export type TaskFilter = 'Todas' | Task;
export type Preference = Task | 'Tanto faz';
export type DevicePreference = Device | 'Ambos';

export function isTaskFilter(value: unknown): value is TaskFilter {
  return typeof value === 'string' && (taskFilters as readonly string[]).includes(value);
}
export function filterPlatforms(records: Platform[], task: TaskFilter): Platform[] {
  return records.filter((p) => task === 'Todas' || p.tasks.includes(task));
}
/** No ranking by commission. Unknown equipment never becomes a positive match. */
export function recommendPlatforms(
  records: Platform[],
  task: Preference,
  device: DevicePreference,
): Platform[] {
  return records.filter(
    (p) =>
      p.verification === 'confirmed' &&
      (task === 'Tanto faz' || p.tasks.includes(task)) &&
      (device === 'Ambos' ? p.taskDevices.length > 0 : p.taskDevices.includes(device)),
  );
}
export function platformDestination(p: Pick<Platform, 'url' | 'affiliateUrl'>) {
  const href = p.affiliateUrl || p.url;
  if (new URL(href).protocol !== 'https:') throw new Error('Platform links require HTTPS');
  return { href, rel: p.affiliateUrl ? 'noopener noreferrer sponsored' : 'noopener noreferrer' };
}
export function platformPath(id: string) {
  return `/plataformas/${id}/`;
}
export function comparisonFacts(p: Platform): [string, string][] {
  return [
    ['Tarefas', p.tasks.join(', ') || 'Não informado'],
    ['Para realizar tarefas', p.device],
    ['Modelos compatíveis', p.supportedModels],
    ['Região', p.region],
    ['Pagamento', p.payment],
    ['Experiência', p.experience],
    ['Status', p.status],
  ];
}
