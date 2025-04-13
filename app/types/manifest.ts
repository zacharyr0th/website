/**
 * Web App Manifest Types
 *
 * Core types for the web app manifest (manifest.json).
 * @see https://w3c.github.io/manifest/
 */

/**
 * Icon configuration for the manifest
 */
export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export interface ManifestScreenshot {
  src: string;
  sizes: string;
  type: string;
  platform?: string;
  label?: string;
  form_factor?: 'wide' | 'narrow';
}

export interface ManifestShortcut {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
  icons?: ManifestIcon[];
}

export interface ShareTarget {
  action: string;
  method: string;
  enctype: string;
  params: {
    title?: string;
    text?: string;
    url?: string;
  };
}

export interface FileHandler {
  action: string;
  accept: Record<string, string[]>;
}

export interface Widget {
  name: string;
  tag: string;
  description?: string;
  ms_ac_template?: string;
}

/**
 * Core manifest configuration
 * Only includes fields we actually use in the application
 */
export interface ManifestOptions {
  /** The name of your web application */
  name: string;

  /** A shorter name for use where space is limited */
  shortName: string;

  /** A description of what your web application does */
  description: string;

  /** The start URL of your application */
  startUrl: string;

  /** A unique identifier for your application */
  id: string;

  /** The scope that defines the set of URLs that the browser considers within your app */
  scope: string;

  /** How the application should be displayed */
  display?: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';

  /** The orientation of the web application */
  orientation?: 'any' | 'natural' | 'landscape' | 'portrait';

  /** The theme color of your application */
  themeColor: string;

  /** The background color of the application */
  backgroundColor: string;

  /** The language of your application */
  lang?: string;

  /** The base direction of your application's text */
  dir?: 'ltr' | 'rtl' | 'auto';
}

/**
 * Extended manifest options for future use
 * Commented out to reduce noise, uncomment when needed
 */
/*
export interface ExtendedManifestOptions extends ManifestOptions {
  display_override?: string[];
  categories?: string[];
  iarc_rating_id?: string;
  prefer_related_applications?: boolean;
  protocol_handlers?: Array<{ protocol: string; url: string }>;
  handle_links?: 'preferred' | 'not-preferred';
  launch_handler?: {
    client_mode: string[];
  };
  edge_side_panel?: {
    preferred_width: number;
  };
}
*/
