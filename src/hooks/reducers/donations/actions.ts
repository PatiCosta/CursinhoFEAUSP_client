import { Donation } from '../../../interfaces/Donation.interface'

export enum ActionTypes {
  GET_DONATIONS_FROM_API = 'GET_DONATIONS_FROM_API',
  CHANGE_DONATIONS_PAGE = 'CHANGE_DONATIONS_PAGE',
}

export function changeDonationsPage(page: number) {
  return {
    type: ActionTypes.CHANGE_DONATIONS_PAGE,
    payload: {
      page,
    },
  }
}

export function getDonationsFromApi({
  donations,
  totalDonations,
}: {
  donations: Donation[]
  totalDonations: number
}) {
  return {
    type: ActionTypes.GET_DONATIONS_FROM_API,
    payload: {
      donations,
      totalDonations,
    },
  }
}
