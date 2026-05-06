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
        bgImage={`${import.meta.env.VITE_APP_URL}/img/bg_${period}_login.png`}
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
        px={4}
      >
        <Box
          bg="white"
          p={{ base: 8, lg: 10 }}
          borderRadius="2xl"
          boxShadow="formCard"
          w={{ base: '100%', sm: '380px', lg: '440px' }}
        >
          <Flex direction="column" alignItems="center" mb={8}>
            <Image
              src={`${import.meta.env.VITE_APP_URL}/img/logo.png`}
              alt="logo do cursinho FEAUSP"
              h="64px"
              w="fit-content"
              mb={5}
            />
            <Flex alignItems="center" gap={2}>
              <Text fontSize={24} fontWeight="semibold" color="brand.blue">
                {period === 'dia' ? 'Bom' : 'Boa'} {period}
              </Text>
              {period === 'dia' ? (
                <Sun size={28} color="#2a255a" weight="duotone" />
              ) : period === 'tarde' ? (
                <SunHorizon size={28} color="#2a255a" weight="duotone" />
              ) : (
                <MoonStars size={28} color="#2a255a" weight="duotone" />
              )}
            </Flex>
            <Text fontSize={14} color="gray.500" mt={1}>
              Bem vindo de volta!
            </Text>
          </Flex>

          <Box
            as="form"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <Box>
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
              mt={6}
              bgVariant="sidebar"
              text="Entrar"
              type="submit"
              isLoading={formState.isSubmitting}
              size="lg"
            />
          </Box>

          <Text
            fontSize={12}
            color="gray.400"
            mt={6}
            textAlign="center"
          >
            <Highlight
              query={['não tem uma conta', 'esqueceu sua senha']}
              styles={{ fontWeight: 'semibold', color: 'brand.blue' }}
            >
              Ainda não tem uma conta ou esqueceu sua senha? Converse com o
              administrador da sua equipe!
            </Highlight>
          </Text>
        </Box>
      </Flex>
    </Flex>
  )
}
