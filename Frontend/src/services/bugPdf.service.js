import { jsPDF } from 'jspdf'

export function downloadPDFBugs(bugs) {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Bug List', 10, 10)

  doc.setFontSize(12)

  bugs.forEach((bug, idx) => {
    const y = 20 + idx * 10
    doc.text(`${idx + 1}. ${bug.title} (Severity: ${bug.severity})`, 10, y)
  })

  doc.save('bugs.pdf')
}
