export type UpdateCourseInfoFormValues = {
  title: string
  informations: {
    description: string
    whoCanParticipate: string
    observations?: string
    classContent: string
    dateSchedule: string
    hourSchedule: string
    color: string
  }
  subscriptions: {
    status: string
    price: string
    subscriptionSchedule: string
  }
}
