import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  VStack,
  useBreakpointValue,
  IconButton,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import {
  GraduationCap,
  Money,
  MoonStars,
  SignOut,
  Sun,
  SunHorizon,
  UserCircleGear,
  UsersThree,
} from '@phosphor-icons/react'

import sidebarTopDetailImg from '../../assets/sidebar_top_detail.png'
import sidebarBottomDetailImg from '../../assets/sidebar_bottom_detail.png'

import circleNight from '../../assets/circle_night_sidebar.png'
import circleEvening from '../../assets/circle_evening_sidebar.png'
import circleDay from '../../assets/circle_day_sidebar.png'

import logo from '../../assets/logo.png'

import { useAuth } from '../../hooks/auth'

import { getPeriodOfDay } from '../../utils/getPeriodOfDay'

interface NavButtonProps {
  linkTo: string
  title: string
  icon: ReactNode
}

function NavButton({ linkTo, title, icon }: NavButtonProps) {
  const location = window.location.href.replace(
    import.meta.env.VITE_APP_URL,
    '',
  )
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  return isLg ? (
    <Button
      size="md"
      transition="all 0.1s ease"
      borderRadius="md"
      w="100%"
      color={location.includes(linkTo) ? 'gray.100' : 'brand.blue'}
      bgColor={location.includes(linkTo) ? 'brand.blue' : 'gray.100'}
      as={Link}
      to={`/${linkTo}`}
      leftIcon={<>{icon}</>}
      justifyContent="start"
      _hover={{
        bgColor: location.includes(linkTo) ? 'brand.blue' : 'gray.200',
      }}
    >
      <Text
        fontSize="sm"
        display={{ base: 'none', sm: 'none', lg: 'inline-block' }}
      >
        {title}
      </Text>
    </Button>
  ) : (
    <IconButton
      size="sm"
      transition="all 0.1s ease"
      borderRadius="md"
      // w="100%"
      color={location.includes(linkTo) ? 'gray.100' : 'brand.blue'}
      bgColor={location.includes(linkTo) ? 'brand.blue' : 'gray.100'}
      as={Link}
      to={`/${linkTo}`}
      icon={<>{icon}</>}
      _hover={{
        bgColor: location.includes(linkTo) ? 'brand.blue' : 'gray.200',
      }}
      aria-label={title}
    />
  )
}

type imgCircleType = {
  noite: string
  tarde: string
  dia: string
}

export function Nav() {
  const { signOut, user } = useAuth()
  const period = getPeriodOfDay(new Date())
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })

  const location = window.location.href.replace(
    import.meta.env.VITE_APP_URL,
    '',
  )

  const imgCircle: imgCircleType = {
    noite: circleNight,
    tarde: circleEvening,
    dia: circleDay,
  }

  return (
    <Flex
      direction={{ base: 'row', sm: 'row', lg: 'column' }}
      justifyContent="space-between"
      w={{ base: '100vw', sm: '100vw', lg: '280px' }}
      bgColor="gray.100"
      h={{ base: '80px', sm: '80px', lg: '100vh' }}
      position="fixed"
      boxShadow={{ base: 'lg', sm: 'lg', lg: 'xl' }}
      zIndex={1000}
    >
      <Flex
        justifyContent="end"
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
      >
        <Image
          src={sidebarTopDetailImg}
          alt="Detalhe Triângulos Sidebar"
          h="120px"
          w="fit-content"
        />
      </Flex>
      <Flex
        direction={{ base: 'row', sm: 'row', lg: 'column' }}
        px={{ base: 4, sm: 4, lg: 10 }}
        h={{ base: '80px', sm: '80px', lg: '80vh' }}
        justifyContent="space-between"
        w="100%"
      >
        <Box display={{ base: 'flex', sm: 'flex', lg: 'block' }}>
          <Image
            src={isLg ? imgCircle[`${period}`] : logo}
            alt="Detalhe Triângulos Sidebar"
            h={{ base: '40px', sm: '40px', lg: '100px' }}
            mx="auto"
            my="auto"
          />
          <Flex
            direction="column"
            ml={{ base: 4, sm: 4, lg: 0 }}
            alignItems={{ base: 'start', sm: 'start', lg: 'center' }}
            justifyContent="center"
            display={{ base: 'none', sm: 'none', lg: 'flex' }}
          >
            <Flex alignItems="center" justifyContent="center" gap={2} mt={2}>
              <Text fontSize={{ base: 18, sm: 18, lg: 24 }}>
                {period === 'dia' ? 'Bom' : 'Boa'} {period}
              </Text>
              {period === 'dia' ? (
                <Sun size={24} color="#023047" weight="duotone" />
              ) : period === 'tarde' ? (
                <SunHorizon size={24} color="#023047" weight="duotone" />
              ) : (
                <MoonStars size={24} color="#023047" weight="duotone" />
              )}
            </Flex>
            <Text
              fontSize={{ base: 14, sm: 14, lg: 18 }}
              fontWeight="light"
              textAlign="center"
            >
              {user?.name}
            </Text>
          </Flex>
        </Box>
        <VStack
          spacing={{ base: 0, sm: 0, lg: 2 }}
          alignItems={{ base: 'center', sm: 'center', lg: 'start' }}
          flexDirection={{ base: 'row', sm: 'row', lg: 'column' }}
          gap={{ base: 4, sm: 4, lg: 0 }}
        >
          <NavButton
            linkTo="inscricoes"
            title="Inscrições"
            icon={
              <UsersThree
                size={18}
                color={location.includes('inscricoes') ? '#EDF2F7' : '#023047'}
                weight="duotone"
              />
            }
          />
          <NavButton
            linkTo="doacoes"
            title="Doações"
            icon={
              <Money
                size={18}
                color={location.includes('doacoes') ? '#EDF2F7' : '#023047'}
                weight="duotone"
              />
            }
          />
          <NavButton
            linkTo="cursos"
            title="Cursos"
            icon={
              <GraduationCap
                size={18}
                color={location.includes('cursos') ? '#EDF2F7' : '#023047'}
                weight="duotone"
              />
            }
          />
          <NavButton
            linkTo="usuarios"
            title="Usuários"
            icon={
              <UserCircleGear
                size={18}
                color={location.includes('usuarios') ? '#EDF2F7' : '#023047'}
                weight="duotone"
              />
            }
          />
        </VStack>
        <Flex
          alignItems="center"
          justifyContent="start"
          gap={1}
          mt={{ base: 0, sm: 0, lg: 38 }}
          cursor="pointer"
          onClick={signOut}
        >
          <SignOut size={16} color="#023047" weight="bold" />
          <Text
            fontSize={16}
            display={{ base: 'none', sm: 'none', lg: 'inline-block' }}
          >
            Log-out
          </Text>
        </Flex>
      </Flex>
      <Flex
        justifyContent="start"
        position="relative"
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
      >
        <Image
          src={sidebarBottomDetailImg}
          alt="Detalhe Triângulos Sidebar"
          h="120px"
          w="fit-content"
          display={{ base: 'none', sm: 'none', lg: 'block' }}
        />
        <Image
          src={logo}
          alt="Logo do cursinho"
          h="60px"
          w="fit-content"
          position="absolute"
          right="20px"
          bottom="20px"
        />
      </Flex>
    </Flex>
  )
}
