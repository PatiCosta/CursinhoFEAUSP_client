import * as Yup from 'yup'

export const updateCourseInfoSchema = Yup.object({
  title: Yup.string()
    .required('O título é obrigatório')
    .min(3, 'O título precisa ter no mínimo três caracteres'),
  informations: Yup.object({
    description: Yup.string().required('A descrição do curso é obrigatória'),
    whoCanParticipate: Yup.string().required(
      'Define quem pode participar deste curso',
    ),
    observations: Yup.string(),
    classContent: Yup.string().required(
      'Inclua o conteúdo que será estudado neste curso',
    ),
    dateSchedule: Yup.string().required('As datas das aulas são obrigatórias'),
    hourSchedule: Yup.string().required('O horário das aulas é obrigatório'),
    color: Yup.string().required(
      'A cor que será utilizada para este curso no site é obrigatória',
    ),
  }).required('As informações do curso são obrigatórias'),
  subscriptions: Yup.object({
    status: Yup.string()
      // .oneOf(['Aberto', 'Fechado', 'Em breve'])
      .required('O status das inscrições é obrigatório'),
    price: Yup.string().required('O preço da inscrição é obrigatório'),
    subscriptionSchedule: Yup.string().required(
      'A data das inscrições é obrigatória',
    ),
  }).required('As informações sobre inscrição são obrigatórias'),
})
