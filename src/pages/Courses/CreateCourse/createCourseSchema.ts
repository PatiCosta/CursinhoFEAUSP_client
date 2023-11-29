import * as Yup from 'yup'

export const createCourseFormSchema = Yup.object({
  title: Yup.string()
    .required('O título é obrigatório')
    .min(3, 'O título precisa ter no mínimo três caracteres'),
  status: Yup.boolean().required('O status é obrigatório'),
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
    status: Yup.string().required('O status das inscrições é obrigatório'),
    price: Yup.string().required('O preço da inscrição é obrigatório'),
    subscriptionSchedule: Yup.string().required(
      'A data das inscrições é obrigatória',
    ),
  }).required('As informações sobre inscrição são obrigatórias'),
  registrations: Yup.object({
    description: Yup.string().required('A descrição é obrigatória.'),
    value: Yup.number().required('Valor obrigatório'),
  }).required('Dados da matrícula obrigatórios'),
  selectiveStages: Yup.array()
    .of(
      Yup.object({
        when: Yup.string().required('Defina quando a etapa irá acontecer'),
        resultsDate: Yup.string(),
        description: Yup.string().required('Descreva esta etapa'),
      }),
    )
    .required('Adicione pelo menos uma etapa para o processo seletivo'),
  documents: Yup.array()
    .of(
      Yup.object({
        title: Yup.string(),
        downloadLink: Yup.string(),
      }),
    )
    .required('Adicione pelo menos uma etapa para o processo seletivo'),
})
