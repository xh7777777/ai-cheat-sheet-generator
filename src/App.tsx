import { useEffect, useMemo, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './App.css'

type PaperSize = {
  id: string
  label: string
  widthMm: number
  heightMm: number
  description: string
}

type View = 'choose' | 'edit'

const PAPER_SIZES: PaperSize[] = [
  { id: 'a5', label: 'A5 · 148 × 210mm', widthMm: 148, heightMm: 210, description: '手册、随记' },
  { id: 'a4', label: 'A4 · 210 × 297mm', widthMm: 210, heightMm: 297, description: '常见打印' },
  { id: 'letter', label: 'Letter · 8.5 × 11in', widthMm: 215.9, heightMm: 279.4, description: '北美标准' },
  { id: 'legal', label: 'Legal · 8.5 × 14in', widthMm: 215.9, heightMm: 355.6, description: '合同/协议' },
]

const mmToPx = (mm: number) => mm * 3.7795275591

function App() {
  const [view, setView] = useState<View>('choose')
  const [selectedId, setSelectedId] = useState<string>('a4')
  const [isExporting, setIsExporting] = useState(false)
  const paperRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const selectedSize = useMemo(() => {
    return PAPER_SIZES.find((size) => size.id === selectedId) ?? PAPER_SIZES[1]
  }, [selectedId])

  const handleSizeClick = (id: string) => {
    setSelectedId(id)
    setView('edit')
  }

  useEffect(() => {
    if (view === 'edit') {
      requestAnimationFrame(() => editorRef.current?.focus())
    }
  }, [view])

  const handleExport = async () => {
    if (!paperRef.current) return
    setIsExporting(true)

    try {
      const canvas = await html2canvas(paperRef.current, {
        backgroundColor: '#ffffff',
        scale: window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio,
        useCORS: true,
      })
      const imageData = canvas.toDataURL('image/png')
      const orientation = selectedSize.widthMm > selectedSize.heightMm ? 'landscape' : 'portrait'

      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: [selectedSize.widthMm, selectedSize.heightMm],
      })

      pdf.addImage(imageData, 'PNG', 0, 0, selectedSize.widthMm, selectedSize.heightMm)
      pdf.save(`paper-${selectedSize.id}.pdf`)
    } catch (error) {
      console.error('导出失败', error)
      window.alert('导出失败，请重试。')
    } finally {
      setIsExporting(false)
    }
  }

  const changeToChoose = () => {
    setView('choose')
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">Cheet Sheet Gen</p>
        <h1>选择纸张，开始编辑</h1>
        <p className="muted">
          先挑选合适的纸张尺寸，再在纸面内输入内容，完成后可一键导出 PDF。
        </p>
      </header>

      {view === 'choose' ? (
        <section className="picker-panel">
          <p className="panel-title">主流纸张</p>
          <div className="size-grid">
            {PAPER_SIZES.map((size) => (
              <button
                key={size.id}
                className="size-card"
                type="button"
                onClick={() => handleSizeClick(size.id)}
              >
                <span className="size-label">{size.label}</span>
                <span className="size-desc">{size.description}</span>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="editor-panel">
          <div className="toolbar">
            <label className="toolbar-field">
              <span>纸张尺寸</span>
              <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
                {PAPER_SIZES.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.label}
                  </option>
                ))}
              </select>
            </label>
            <div className="toolbar-actions">
              <button type="button" className="ghost" onClick={changeToChoose}>
                重新选择
              </button>
              <button type="button" className="primary" onClick={handleExport} disabled={isExporting}>
                {isExporting ? '导出中…' : '导出 PDF'}
              </button>
            </div>
          </div>

          <div className="paper-stage">
            <div className="paper-wrapper">
              <div
                className="paper"
                ref={paperRef}
                style={{
                  width: `${mmToPx(selectedSize.widthMm)}px`,
                  height: `${mmToPx(selectedSize.heightMm)}px`,
                }}
              >
                <div
                  ref={editorRef}
                  className="paper-editable"
                  contentEditable
                  data-placeholder="在此输入内容..."
                  suppressContentEditableWarning
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default App
