/**
 * Security Components
 * @module components/security
 */

import ClientAntiClickjack from './ClientAntiClickjack';

export { default as AntiClickjack } from './AntiClickjack';
export { ClientAntiClickjack };

// Re-export for direct usage in server components
export const ServerAntiClickjack = ClientAntiClickjack;
