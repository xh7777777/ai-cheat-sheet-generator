import type { CanvasRecord } from '../middleware/canvasRepository'

interface MainPageProps {
  canvases: CanvasRecord[]
  onCreate: () => void
  onSelect: (canvasId: string) => void
}

const Main = ({ canvases, onCreate, onSelect }: MainPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 px-6 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Canvas Library
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">速查画布管理台</h1>
          <p className="text-sm text-slate-500 sm:text-base">
            创建画布、继续编辑，或导出为 PDF。保持布局拆分，方便未来扩展云端存储。
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-slate-900">全部画布</p>
              <p className="text-sm text-slate-500">{canvases.length} 个条目</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {canvases.map(canvas => (
              <button
                key={canvas.id}
                type="button"
                onClick={() => onSelect(canvas.id)}
                className="group flex min-h-[140px] flex-1 basis-64 flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50/70 p-4 text-left shadow-md shadow-slate-900/5 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <p className="text-lg font-semibold text-slate-900 group-hover:text-slate-800">{canvas.name}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">
                  更新于 {formatDate(canvas.updatedAt)}
                </p>
              </button>
            ))}

            <button
              type="button"
              onClick={onCreate}
              className="flex min-h-[140px] flex-1 basis-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
            >
              <span className="text-4xl font-light">+</span>
              <span className="mt-1 text-sm font-semibold">新建画布</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat('zh-CN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch (error) {
    console.warn('Failed to format date', error)
    return value
  }
}

export default Main
