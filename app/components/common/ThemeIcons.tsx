import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import { Theme } from '../../lib/types';

export const THEME_ICONS: Record<Theme, JSX.Element> = {
  dark: <FaMoon />,
  light: <FaSun />
}; 