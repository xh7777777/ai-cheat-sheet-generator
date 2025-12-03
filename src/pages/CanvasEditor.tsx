import { useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import type { CanvasRecord } from '../middleware/canvasRepository'

interface CanvasEditorProps {
  canvas: CanvasRecord
  onBack: () => void
  onNameChange: (name: string) => void
}

const CanvasEditor = ({ canvas, onBack, onNameChange }: CanvasEditorProps) => {
  const paperRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!paperRef.current) return
    const canvasBitmap = await html2canvas(paperRef.current, {
      scale: 2,
      backgroundColor: '#ffffff',
    })
    const imgData = canvasBitmap.toDataURL('image/png')
    const pdf = new jsPDF('portrait', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()
    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`${canvas.name || '画布'}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 px-4 py-6 text-slate-900 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              返回列表
            </button>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Canvas Studio</p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="rounded-full border border-slate-900/10 bg-slate-900/90 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5"
          >
            导出 PDF
          </button>
        </header>

        <section className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-900/5">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">画布名称</label>
          <input
            type="text"
            value={canvas.name}
            onChange={event => onNameChange(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-slate-300 bg-slate-50/70 px-4 py-3 text-base font-medium text-slate-900 outline-none ring-0 transition focus:border-slate-900"
            placeholder="输入画布名称"
          />
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-gradient-to-b from-white to-slate-50/50 p-6 shadow-xl shadow-slate-900/5">
          <div className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">A4 预览</div>
          <div className="mt-4 flex justify-center overflow-auto rounded-2xl border border-slate-100 bg-slate-100/60 p-6">
            <div
              ref={paperRef}
              className="a4-canvas flex w-full max-w-[840px] flex-col items-center justify-center bg-white text-slate-400"
            >
              <div className="text-center text-sm uppercase tracking-[0.4em]">A4 Placeholder</div>
              <p className="mt-2 text-xs text-slate-400">内容将在后续功能中填充</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default CanvasEditor
