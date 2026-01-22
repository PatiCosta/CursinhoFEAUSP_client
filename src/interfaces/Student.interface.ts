interface purcharsedSubscriptions {
  schoolClassID: string
  productID: string | undefined
  productName: string
  codigoDesconto: string | null
  paymentMethod: string
  paymentStatus: string
  paymentDate: Date | null
  valuePaid: number
  matriculaID: string | null
  
  txid: string
  pixStatus: string | undefined
  pixCopiaECola: string | undefined
  pixQrCode: string | undefined
}

export interface Student {
  id?: string
  name: string // ok
  email: string // ok
  gender: string // ok
  birth: string // ok
  phoneNumber: string // ok
  isPhoneWhatsapp: boolean // ok

  emailResponsavel: string | null // ok

  state: string // ok
  city: string // ok
  street: string // ok
  homeNumber: string // ok
  complement: string | null // ok
  district: string // ok
  zipCode: string // ok

  cpf: string // ok
  rg?: string // ok
  ufrg?: string // ok
  selfDeclaration: string // ok
  oldSchool: string // ok
  oldSchoolAdress: string // ok
  highSchoolGraduationDate: string // ok
  highSchoolPeriod: string
  metUsMethod: string // ok
  exStudent: string // ok
  stripeCustomerID?: string

  purcharsedSubscriptions: purcharsedSubscriptions[]
  createdAt: Date
}
