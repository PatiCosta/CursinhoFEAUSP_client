import { ActionTypes } from './actions'
import { Donation } from '../../../interfaces/Donation.interface'

interface DonationState {
  donations: Donation[]
  page: number
  totalDonations: number
  registersPerPage: number
}

export function donationsReducer(
  state: DonationState,
  action: any,
): DonationState {
  switch (action.type) {
    case ActionTypes.CHANGE_DONATIONS_PAGE: {
      return {
        ...state,
        page: action.payload.page,
      }
    }

    case ActionTypes.GET_DONATIONS_FROM_API: {
      return {
        ...state,
        donations: action.payload.donations,
        totalDonations: action.payload.totalDonations,
      }
    }

    default:
      return state
  }
}
