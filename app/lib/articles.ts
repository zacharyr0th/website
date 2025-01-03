import path from 'path';
import { ARTICLE_CONFIG } from '@/app/writing/types';

export const ARTICLE_DIRECTORY = path.join(process.cwd(), ARTICLE_CONFIG.directory);
