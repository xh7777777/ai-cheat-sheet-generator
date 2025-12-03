import { useCallback, useMemo, useState } from 'react'
import type { CanvasRecord, CanvasRepository } from '../middleware/canvasRepository'
import { canvasRepository } from '../middleware/canvasRepository'

interface UseCanvasLibraryOptions {
  repository?: CanvasRepository
}

export const useCanvasLibrary = (options?: UseCanvasLibraryOptions) => {
  const repo = useMemo(() => options?.repository ?? canvasRepository, [options?.repository])
  const [canvases, setCanvases] = useState<CanvasRecord[]>(() => repo.list())

  const persist = useCallback(
    (updater: (prev: CanvasRecord[]) => CanvasRecord[]) => {
      setCanvases(prev => {
        const next = updater(prev)
        repo.save(next)
        return next
      })
    },
    [repo],
  )

  const createCanvas = useCallback(
    (name?: string) => {
      let created: CanvasRecord | null = null
      persist(prev => {
        created = repo.createRecord(name)
        return [...prev, created]
      })
      return created!
    },
    [persist, repo],
  )

  const updateCanvas = useCallback(
    (id: string, patch: Partial<CanvasRecord>) => {
      let updated: CanvasRecord | null = null
      persist(prev =>
        prev.map(item => {
          if (item.id === id) {
            updated = {
              ...item,
              ...patch,
              updatedAt: new Date().toISOString(),
            }
            return updated
          }
          return item
        }),
      )
      return updated
    },
    [persist],
  )

  return {
    canvases,
    createCanvas,
    updateCanvas,
  }
}
