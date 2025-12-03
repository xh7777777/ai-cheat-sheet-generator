export interface CanvasRecord {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface CanvasStorageAdapter {
  load(): CanvasRecord[]
  save(canvases: CanvasRecord[]): void
}

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

class LocalCanvasStorageAdapter implements CanvasStorageAdapter {
  constructor(private key: string) {}

  load(): CanvasRecord[] {
    if (!isBrowser()) return []
    try {
      const raw = window.localStorage.getItem(this.key)
      return raw ? (JSON.parse(raw) as CanvasRecord[]) : []
    } catch (error) {
      console.warn('Failed to parse canvas data, resetting store', error)
      window.localStorage.removeItem(this.key)
      return []
    }
  }

  save(canvases: CanvasRecord[]): void {
    if (!isBrowser()) return
    window.localStorage.setItem(this.key, JSON.stringify(canvases))
  }
}

export class CanvasRepository {
  constructor(private adapter: CanvasStorageAdapter) {}

  list(): CanvasRecord[] {
    return this.adapter.load()
  }

  save(canvases: CanvasRecord[]): void {
    this.adapter.save(canvases)
  }

  createRecord(name?: string): CanvasRecord {
    const timestamp = new Date().toISOString()
    return {
      id: createCanvasId(),
      name: name?.trim() || '未命名画布',
      createdAt: timestamp,
      updatedAt: timestamp,
    }
  }
}

const createCanvasId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `canvas-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export const canvasRepository = new CanvasRepository(
  new LocalCanvasStorageAdapter('cheet-sheet-gen:canvases'),
)
