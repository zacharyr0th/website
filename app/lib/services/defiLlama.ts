interface RawProtocol {
  name: string;
  chain: string;
  category: string;
  tvl: number;
  symbol?: string;
  chains: string[];
}

interface ProcessedProtocol {
  name: string;
  category: string;
  tvl: string;
}

export async function fetchProtocolsByChain(chain: string): Promise<ProcessedProtocol[]> {
  try {
    const response = await fetch('https://api.llama.fi/protocols');
    const protocols: RawProtocol[] = await response.json();
    
    // Filter protocols by chain and format data
    return protocols
      .filter(p => p.chains.includes(chain))
      .map(p => ({
        name: p.name,
        category: p.category,
        tvl: formatTVL(p.tvl)
      }))
      .sort((a, b) => parseFloat(a.tvl.replace(/[$,]/g, '')) - parseFloat(b.tvl.replace(/[$,]/g, '')))
      .reverse();
  } catch (error) {
    console.error('Error fetching protocols:', error);
    return [];
  }
}

function formatTVL(tvl: number): string {
  if (tvl >= 1e9) {
    return `$${(tvl / 1e9).toFixed(2)}B`;
  } else if (tvl >= 1e6) {
    return `$${(tvl / 1e6).toFixed(2)}M`;
  } else if (tvl >= 1e3) {
    return `$${(tvl / 1e3).toFixed(2)}K`;
  }
  return `$${tvl.toFixed(2)}`;
} 