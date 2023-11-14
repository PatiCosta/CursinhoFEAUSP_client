import { Box, Flex, Highlight, Image, Text } from '@chakra-ui/react'
import { MoonStars, Sun, SunHorizon } from '@phosphor-icons/react'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '../../components/Button'
import { getPeriodOfDay } from '../../utils/getPeriodOfDay'
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { useAuth } from '../../hooks/auth'

const signInFormSchema = Yup.object().shape({
  username: Yup.string().required('O username é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
})

type FormValues = {
  username: string
  password: string
}

export function SignIn() {
  const period = getPeriodOfDay(new Date())

  const { register, formState, handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(signInFormSchema),
  })

  const { errors } = formState

  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async (data: FormValues) => {
      const formData = Object.assign({
        username: data.username,
        password: data.password,
      })
      await signIn(formData)
    },
    [signIn],
  )

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box
        w="680px"
        h="100%"
        bgImage={`src/assets/bg_${period}_login.png`}
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        display={{ base: 'none', lg: 'block' }}
      />
      <Flex
        direction="column"
        flex="1"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="src/assets/logo.png"
          alt="logo do cursinho FEAUSP"
          h="80px"
          w="fit-content"
          mb={8}
        />
        <Flex alignItems="center" gap={2}>
          <Text fontSize={32}>
            {period === 'dia' ? 'Bom' : 'Boa'} {period}
          </Text>
          {period === 'dia' ? (
            <Sun size={40} color="#023047" weight="duotone" />
          ) : period === 'tarde' ? (
            <SunHorizon size={40} color="#023047" weight="duotone" />
          ) : (
            <MoonStars size={40} color="#023047" weight="duotone" />
          )}
        </Flex>
        <Text fontSize={24} fontWeight="light">
          Bem vindo de volta!
        </Text>

        <Box
          as="form"
          w={{ base: '300px', lg: '400px' }}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Box mt={14}>
            <Input
              placeholder="Usuário"
              {...register('username')}
              error={errors.username}
            />
          </Box>
          <Box mt={4}>
            <PasswordInput
              placeholder="Senha"
              {...register('password')}
              error={errors.password}
            />
          </Box>
          <Button
            w="100%"
            mt={4}
            bgVariant="yellow"
            text="Entrar"
            type="submit"
            isLoading={formState.isSubmitting}
          />
        </Box>
        <Text
          fontSize={12}
          fontWeight="light"
          mt={7}
          textAlign="center"
          w={{ base: '300px', lg: '400px' }}
        >
          <Highlight
            query={['não tem uma conta', 'esqueceu sua senha']}
            styles={{ fontWeight: 'bold' }}
          >
            Ainda não tem uma conta ou esqueceu sua senha? Converse com o
            administrador da sua equipe!
          </Highlight>
        </Text>
      </Flex>
    </Flex>
  )
}
