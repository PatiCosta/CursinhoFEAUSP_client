export function formatCep(cep: string) {
  return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`
}
