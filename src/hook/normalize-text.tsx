export function Normalize(text: string) {
  return text.trim()
    .toLowerCase()
    .replace(/ç/gi, match => (match === 'Ç' ? '__CC__' : '__cc__'))
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/__cc__/g, 'ç')
    .replace(/__CC__/g, 'ç')
}