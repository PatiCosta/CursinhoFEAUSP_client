export type CourseFormValues = {
  title: string
  status: boolean
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
  selectiveStages: {
    when: string
    resultsDate?: string
    description: string
  }[]
  documents:
    | {
        title?: string
        downloadLink?: string
      }[]
    | []
}
