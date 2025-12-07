export const QueryKey = {
  all: ['blog', 'comments'] as const,
  details: () => [...QueryKey.all[1], 'detail'] as const,
  detail: (id: number) => [...QueryKey.details(), id] as const,
};
