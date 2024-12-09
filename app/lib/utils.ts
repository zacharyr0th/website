export const truncateDescription = (
  description: string,
  variant: 'default' | 'featured' | 'side'
): string => {
  const maxLengths = {
    default: 150,
    featured: 150,
    side: 100,
  } as const;

  return description.length <= maxLengths[variant]
    ? description
    : `${description.slice(0, maxLengths[variant] - 3)}...`;
};
