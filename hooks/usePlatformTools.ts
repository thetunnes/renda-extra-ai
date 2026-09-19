'use client';
import { useEffect } from 'react';
import { platforms } from '@/lib/site';
import experience from '@/config/experience.json';
import { filterPlatforms, isTaskFilter, taskFilters, type TaskFilter } from '@/domain/platforms';
/** Progressive enhancement: no model service, key, personal data or network call. */
export function usePlatformTools(setFilter: (filter: TaskFilter) => void) {
  useEffect(() => {
    if (!experience.features.assistantTools) return;
    const context = (
      document as Document & {
        modelContext?: {
          registerTool: (tool: unknown, options: { signal: AbortSignal }) => void | Promise<void>;
        };
      }
    ).modelContext;
    if (!context) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: 'filter_platforms',
            description:
              'Filtra plataformas por tipo de tarefa. Não garante elegibilidade ou ganhos.',
            inputSchema: {
              type: 'object',
              properties: { task: { type: 'string', enum: taskFilters } },
              required: ['task'],
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false },
            execute: async (input: unknown) => {
              const task =
                typeof input === 'object' && input !== null
                  ? (input as { task?: unknown }).task
                  : undefined;
              if (!isTaskFilter(task)) throw new Error('Tipo de tarefa inválido');
              setFilter(task);
              return {
                platforms: filterPlatforms(platforms, task).map((p) => ({
                  name: p.name,
                  verification: p.verification,
                })),
              };
            },
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => {
        /* Optional browser API; ordinary filters keep working. */
      });
    } catch {
      /* Unsupported registration is not fatal. */
    }
    return () => lifecycle.abort();
  }, [setFilter]);
}
