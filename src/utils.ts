export const downloadTextAsTxt = (filename: string = 'file', text: string) => {
  const blob = new Blob([text || ''], {
    type: 'text/plain;charset=utf-8',
  })

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.txt`

  link.click()

  URL.revokeObjectURL(link.href)
}
