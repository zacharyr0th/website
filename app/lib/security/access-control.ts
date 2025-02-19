import { createLogger, LogCategory } from '@/lib/core';

const logger = createLogger('security:access-control', { category: LogCategory.SECURITY });

// Role hierarchy and permissions
export enum Role {
  PUBLIC = 'public',
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin',
  SYSTEM = 'system',
}

export enum Permission {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  MANAGE = 'manage',
  ADMIN = 'admin',
}

export enum Resource {
  ARTICLE = 'article',
  USER = 'user',
  AUDIO = 'audio',
  SYSTEM = 'system',
  API = 'api',
}

// Role hierarchy (higher index = more permissions)
const ROLE_HIERARCHY = [Role.PUBLIC, Role.USER, Role.EDITOR, Role.ADMIN, Role.SYSTEM];

// Permission hierarchy (higher index = more access)
const PERMISSION_HIERARCHY = [
  Permission.READ,
  Permission.WRITE,
  Permission.DELETE,
  Permission.MANAGE,
  Permission.ADMIN,
];

// Role-based permission matrix
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.PUBLIC]: [Permission.READ],
  [Role.USER]: [Permission.READ, Permission.WRITE],
  [Role.EDITOR]: [Permission.READ, Permission.WRITE, Permission.DELETE],
  [Role.ADMIN]: [Permission.READ, Permission.WRITE, Permission.DELETE, Permission.MANAGE],
  [Role.SYSTEM]: [
    Permission.READ,
    Permission.WRITE,
    Permission.DELETE,
    Permission.MANAGE,
    Permission.ADMIN,
  ],
};

// Resource-specific permission requirements
const RESOURCE_PERMISSIONS: Record<Resource, Record<string, Permission>> = {
  [Resource.ARTICLE]: {
    view: Permission.READ,
    edit: Permission.WRITE,
    delete: Permission.DELETE,
    publish: Permission.MANAGE,
  },
  [Resource.USER]: {
    view: Permission.READ,
    edit: Permission.WRITE,
    delete: Permission.MANAGE,
    impersonate: Permission.ADMIN,
  },
  [Resource.AUDIO]: {
    view: Permission.READ,
    upload: Permission.WRITE,
    delete: Permission.DELETE,
    moderate: Permission.MANAGE,
  },
  [Resource.SYSTEM]: {
    view: Permission.READ,
    configure: Permission.MANAGE,
    maintain: Permission.ADMIN,
  },
  [Resource.API]: {
    use: Permission.READ,
    deploy: Permission.MANAGE,
    configure: Permission.ADMIN,
  },
};

// Add this type definition near the top with other types
export interface AccessControlContext {
  [key: string]: string | number | boolean | null | undefined;
}

class AccessControlService {
  private static instance: AccessControlService;
  private roleCache: Map<string, Role>;
  private permissionCache: Map<string, Set<Permission>>;

  private constructor() {
    this.roleCache = new Map();
    this.permissionCache = new Map();
  }

  public static getInstance(): AccessControlService {
    if (!AccessControlService.instance) {
      AccessControlService.instance = new AccessControlService();
    }
    return AccessControlService.instance;
  }

  public hasRole(userId: string, role: Role): boolean {
    const userRole = this.roleCache.get(userId);
    if (!userRole) return false;

    const userRoleIndex = ROLE_HIERARCHY.indexOf(userRole);
    const requiredRoleIndex = ROLE_HIERARCHY.indexOf(role);

    return userRoleIndex >= requiredRoleIndex;
  }

  public hasPermission(userId: string, permission: Permission): boolean {
    const userPermissions = this.permissionCache.get(userId);
    if (!userPermissions) return false;

    const permissionIndex = PERMISSION_HIERARCHY.indexOf(permission);
    return Array.from(userPermissions).some(
      (p) => PERMISSION_HIERARCHY.indexOf(p) >= permissionIndex
    );
  }

  public canAccess(
    userId: string | undefined,
    resource: Resource,
    action: string,
    context: AccessControlContext = {}
  ): boolean {
    try {
      if (!userId) return false;

      const resourceEntry = Object.entries(RESOURCE_PERMISSIONS).find(([key]) => key === resource);
      if (!resourceEntry) return false;

      const actionPermission = Object.entries(resourceEntry[1]).find(([key]) => key === action);
      if (!actionPermission) {
        logger.warn('Unknown resource action', {
          context: { resource, action },
          category: LogCategory.SECURITY,
        });
        return false;
      }

      const requiredPermission = actionPermission[1];

      // Check if user has required permission
      const hasPermission = this.hasPermission(userId, requiredPermission);

      // Log access attempt with type-safe spread
      logger.info('Access control check', {
        context: {
          resource,
          action,
          granted: hasPermission,
          category: LogCategory.SECURITY,
          ...context
        },
      });

      return hasPermission;
    } catch (error) {
      logger.error('Access control error', {
        error: new Error('Access control check failed'),
        context: {
          resource,
          action,
          category: LogCategory.SECURITY,
          ...context
        },
      });
      return false;
    }
  }

  public setUserRole(userId: string, role: Role): void {
    const rolePermissions =
      Object.entries(ROLE_PERMISSIONS).find(([key]) => key === role)?.[1] ?? [];
    this.roleCache.set(userId, role);
    this.permissionCache.set(userId, new Set(rolePermissions));

    logger.info('User role updated', {
      context: { userId, role },
      category: LogCategory.SECURITY,
    });
  }

  public clearUserAccess(userId: string): void {
    this.roleCache.delete(userId);
    this.permissionCache.delete(userId);

    logger.info('User access cleared', {
      context: { userId },
      category: LogCategory.SECURITY,
    });
  }

  public getEffectivePermissions(userId: string): Permission[] {
    return Array.from(this.permissionCache.get(userId) || []);
  }
}

export const accessControl = AccessControlService.getInstance();
