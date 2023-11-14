export function formatPhone(phone: string) {
  return `(${phone.slice(0, 2)}) ${
    phone.length === 10
      ? ` ${phone.slice(2, 6)}-${phone.slice(6, 11)}`
      : ` ${phone.slice(2, 7)}-${phone.slice(7, 11)}`
  }`
}
