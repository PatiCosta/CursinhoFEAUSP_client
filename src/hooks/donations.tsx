import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react'
// import { useToast } from '@chakra-ui/react'

import api from '../services/api'
import { donationsReducer } from './reducers/donations/reducer'
import {
  changeDonationsPage,
  getDonationsFromApi,
} from './reducers/donations/actions'
import { Donation } from '../interfaces/Donation.interface'
import { useBreakpointValue } from '@chakra-ui/react'

interface listProps {
  name?: string
  email?: string
  cpf?: string
  paymentStatus?: string
  endValue?: string
  initValue?: string
}

interface DonationsContextType {
  donations: Donation[]
  list: (props?: listProps) => void
  excelExport: (props?: listProps) => void
  page: number
  changePage: (page: number) => void
  registersPerPage: number
  totalDonations: number
  loadingList: boolean
}

const DonationsContext = createContext({} as DonationsContextType)

export function DonationsProvider({ children }: { children: ReactNode }) {
  const [loadingList, setIsLoadingList] = useState(false)
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  // const toast = useToast()

  const [donationsState, dispatch] = useReducer(donationsReducer, {
    donations: [],
    page: 1,
    totalDonations: 0,
    registersPerPage: isLg ? 12 : 9,
  })

  const { donations, page, totalDonations, registersPerPage } = donationsState

  const changePage = useCallback((page: number) => {
    dispatch(changeDonationsPage(page))
  }, [])

  const list = useCallback(
    async (props?: listProps) => {
      setIsLoadingList(true)

      let params = {
        page,
        pageRange: registersPerPage,
      }

      if (props?.name) {
        params = Object.assign(params, { name: props.name })
      }

      if (props?.email) {
        params = Object.assign(params, { email: props.email })
      }

      if (props?.cpf) {
        params = Object.assign(params, { cpf: props.cpf })
      }

      if (props?.paymentStatus) {
        params = Object.assign(params, { paymentStatus: props.paymentStatus })
      }

      if (props?.endValue) {
        params = Object.assign(params, { endValue: props.endValue })
      }

      if (props?.initValue) {
        params = Object.assign(params, { initValue: props.initValue })
      }

      await api
        .get('/donates', { params })
        .then((response) => {
          dispatch(
            getDonationsFromApi({
              donations: response.data.donationsList,
              totalDonations: response.data.totalDocuments,
            }),
          )
        })
        .then(() => {
          setIsLoadingList(false)
        })
    },
    [page, registersPerPage],
  )

  const excelExport = useCallback(async (props?: listProps) => {
    let params = {}

    if (props?.name) {
      params = Object.assign(params, { name: props.name })
    }

    if (props?.email) {
      params = Object.assign(params, { email: props.email })
    }

    if (props?.cpf) {
      params = Object.assign(params, { cpf: props.cpf })
    }

    if (props?.paymentStatus) {
      params = Object.assign(params, { paymentStatus: props.paymentStatus })
    }

    if (props?.endValue) {
      params = Object.assign(params, { endValue: props.endValue })
    }

    if (props?.initValue) {
      params = Object.assign(params, { initValue: props.initValue })
    }

    await api
      .get('/donates/excel', { params, responseType: 'blob' })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${Date.now()}.xlsx`)
        document.body.appendChild(link)
        link.click()
      })
  }, [])

  return (
    <DonationsContext.Provider
      value={{
        donations,
        list,
        excelExport,
        page,
        changePage,
        registersPerPage,
        totalDonations,
        loadingList,
      }}
    >
      {children}
    </DonationsContext.Provider>
  )
}

export function useDonations() {
  const context = useContext(DonationsContext)

  if (!context) {
    throw new Error('useDonations must be used within an DonationsContext')
  }

  return context
}
