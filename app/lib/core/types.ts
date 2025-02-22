/**
 * Core type definitions
 */

// Base Types
export type ID = string;
export type DateString = string;
export type URLString = string;
export type Primitive = string | number | boolean | null | undefined;
export type JSONValue = Primitive | JSONObject | JSONArray;
export interface JSONObject {
  [key: string]: JSONValue;
}
export interface JSONArray extends Array<JSONValue> {}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export type NavItems = NavItem[];

// Writing Types
export interface WritingProject {
  id: ID;
  title: string;
  description: string;
  link: URLString;
  publishedAt?: DateString;
  updatedAt?: DateString;
  author?: string;
  tags?: string[];
  category?: string;
  status?: 'draft' | 'published' | 'archived';
  metadata?: Record<string, JSONValue>;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
  message?: string;
  timestamp: DateString;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Error Types
export interface AppError extends Error {
  code?: string;
  status?: number;
  metadata?: Record<string, JSONValue>;
}

// Config Types
export interface AppConfig {
  environment: 'development' | 'production';
  api: {
    baseUrl: string;
  };
}

// Logging context
export interface LogContext {
  [key: string]: string | number | boolean | undefined;
  component?: string;
}

// Component Props Types
export interface BaseProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  style?: React.CSSProperties;
}

export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  value?: string;
}

// Utility Types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
      ? RecursivePartial<T[P]>
      : T[P];
};

export type ValueOf<T> = T[keyof T];

export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> = T extends (
  ...args: unknown[]
) => Promise<infer R>
  ? R
  : never;
