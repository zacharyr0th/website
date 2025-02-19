import { createLogger, LogCategory } from '@/lib/core';
import { SECURITY_MEMORY_LIMITS } from './constants';

const logger = createLogger('security:memory-service', { category: LogCategory.SECURITY });

interface SecureBuffer extends Buffer {
  secure: true;
  metadata: {
    createdAt: number;
    lastAccessed: number;
    purpose: string;
  };
}

class SecureMemoryService {
  private static instance: SecureMemoryService;
  private heap: Map<string, SecureBuffer>;
  private currentSize: number;
  private readonly maxSize: number;

  private constructor() {
    this.heap = new Map();
    this.currentSize = 0;
    this.maxSize = Object.values(SECURITY_MEMORY_LIMITS).reduce((a, b) => a + b, 0);
    this.startMemoryMonitoring();
  }

  public static getInstance(): SecureMemoryService {
    if (!SecureMemoryService.instance) {
      SecureMemoryService.instance = new SecureMemoryService();
    }
    return SecureMemoryService.instance;
  }

  private startMemoryMonitoring(): void {
    setInterval(() => this.cleanupUnusedMemory(), 60000); // Cleanup every minute
    setInterval(() => this.checkMemoryPressure(), 30000); // Check memory pressure every 30 seconds
  }

  private cleanupUnusedMemory(): void {
    const now = Date.now();
    let freedMemory = 0;

    for (const [id, buffer] of this.heap.entries()) {
      if (now - buffer.metadata.lastAccessed > 300000) {
        // 5 minutes
        this.free(id);
        freedMemory += buffer.length;
      }
    }

    if (freedMemory > 0) {
      logger.info('Memory cleanup completed', {
        context: {
          freedMemory,
          remainingSize: this.currentSize,
          totalBuffers: this.heap.size,
        },
      });
    }
  }

  private checkMemoryPressure(): void {
    const memoryUsageRatio = this.currentSize / this.maxSize;

    if (memoryUsageRatio > 0.9) {
      logger.warn('High memory pressure detected', {
        context: {
          currentSize: this.currentSize,
          maxSize: this.maxSize,
          bufferCount: this.heap.size,
        },
      });
      this.cleanupUnusedMemory();
    }
  }

  public allocate(size: number, purpose: string): { id: string; buffer: SecureBuffer } {
    if (this.currentSize + size > this.maxSize) {
      throw new Error('Secure memory capacity exceeded');
    }

    const buffer = Buffer.allocUnsafe(size) as SecureBuffer;
    buffer.fill(0);

    const id = crypto.randomUUID();
    Object.defineProperties(buffer, {
      secure: { value: true, enumerable: true },
      metadata: {
        value: {
          createdAt: Date.now(),
          lastAccessed: Date.now(),
          purpose,
        },
        enumerable: false,
      },
    });

    this.heap.set(id, buffer);
    this.currentSize += size;

    logger.debug('Allocated secure memory', {
      context: {
        id,
        size,
        purpose,
        currentSize: this.currentSize,
      },
    });

    return { id, buffer };
  }

  public access(id: string): SecureBuffer {
    const buffer = this.heap.get(id);
    if (!buffer) {
      throw new Error('Invalid secure buffer ID');
    }

    buffer.metadata.lastAccessed = Date.now();
    return buffer;
  }

  public free(id: string): void {
    const buffer = this.heap.get(id);
    if (!buffer) {
      return;
    }

    buffer.fill(0);
    this.currentSize -= buffer.length;
    this.heap.delete(id);

    logger.debug('Freed secure memory', {
      context: {
        id,
        freedSize: buffer.length,
        currentSize: this.currentSize,
      },
    });
  }

  public getStats(): {
    currentSize: number;
    maxSize: number;
    bufferCount: number;
    memoryPressure: number;
  } {
    return {
      currentSize: this.currentSize,
      maxSize: this.maxSize,
      bufferCount: this.heap.size,
      memoryPressure: this.currentSize / this.maxSize,
    };
  }
}

export const secureMemory = SecureMemoryService.getInstance();
