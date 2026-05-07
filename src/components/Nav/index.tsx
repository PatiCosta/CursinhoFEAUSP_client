import {
  Button,
  Box,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  IconButton,
  Tooltip,
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
  Ticket,
  WhatsappLogo,
} from '@phosphor-icons/react'

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
  const location = window.location.href.replace(import.meta.env.VITE_APP_URL, '')
  const isLg = useBreakpointValue({ base: false, sm: false, lg: true })
  const isActive = location.includes(linkTo)

  return isLg ? (
    <Button
      size="md"
      w="100%"
      as={Link}
      to={`/${linkTo}`}
      leftIcon={<>{icon}</>}
      justifyContent="start"
      transition="all 0.15s ease"
      bgColor={isActive ? 'brand.blueLight' : 'transparent'}
      color={isActive ? 'brand.blue' : 'gray.600'}
      fontWeight={isActive ? '600' : '400'}
      borderRadius="none"
      borderRightRadius="lg"
      borderLeftWidth="3px"
      borderLeftStyle="solid"
      borderLeftColor={isActive ? 'yellow.400' : 'transparent'}
      _hover={{
        bgColor: isActive ? 'brand.blueLight' : 'gray.100',
        color: 'brand.blue',
        borderLeftColor: isActive ? 'yellow.400' : 'gray.300',
      }}
    >
      <Text fontSize="sm">{title}</Text>
    </Button>
  ) : (
    <Tooltip label={title} placement="right" hasArrow>
      <IconButton
        size="sm"
        transition="all 0.15s ease"
        borderRadius="md"
        color={isActive ? 'brand.blue' : 'gray.600'}
        bgColor={isActive ? 'brand.blueLight' : 'transparent'}
        as={Link}
        to={`/${linkTo}`}
        icon={<>{icon}</>}
        _hover={{ bgColor: 'gray.100', color: 'brand.blue' }}
        aria-label={title}
      />
    </Tooltip>
  )
}

type imgCircleType = { noite: string; tarde: string; dia: string }

export function Nav() {
  const { signOut, user } = useAuth()
  const period = getPeriodOfDay(new Date())

  const location = window.location.href.replace(import.meta.env.VITE_APP_URL, '')

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
      bgColor="white"
      h={{ base: '80px', sm: '80px', lg: '100vh' }}
      position="fixed"
      borderRight={{ base: 'none', lg: '1px solid' }}
      borderColor="gray.200"
      boxShadow={{ base: 'md', sm: 'md', lg: 'none' }}
      zIndex={1000}
    >
      {/* Logo + greeting — desktop */}
      <Flex
        direction="column"
        alignItems="center"
        pt={8}
        pb={4}
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
        borderBottom="1px solid"
        borderColor="gray.100"
        mx={4}
      >
        <Image
          src={imgCircle[`${period}`]}
          alt="período do dia"
          h="80px"
          w="fit-content"
          mb={3}
        />
        <Flex alignItems="center" gap={1}>
          <Text fontSize={15} fontWeight="semibold" color="brand.blue">
            {period === 'dia' ? 'Bom' : 'Boa'} {period},
          </Text>
          {period === 'dia' ? (
            <Sun size={18} color="#2a255a" weight="duotone" />
          ) : period === 'tarde' ? (
            <SunHorizon size={18} color="#2a255a" weight="duotone" />
          ) : (
            <MoonStars size={18} color="#2a255a" weight="duotone" />
          )}
        </Flex>
        <Text fontSize={13} color="gray.500" fontWeight="medium">
          {user?.name}
        </Text>
      </Flex>

      {/* Logo — mobile */}
      <Box display={{ base: 'flex', sm: 'flex', lg: 'none' }} alignItems="center" px={4}>
        <Image src={logo} alt="Logo cursinho" h="36px" />
      </Box>

      {/* Nav links */}
      <Flex
        direction={{ base: 'row', sm: 'row', lg: 'column' }}
        px={{ base: 4, sm: 4, lg: 0 }}
        py={{ base: 0, lg: 4 }}
        gap={{ base: 3, sm: 3, lg: 1 }}
        alignItems={{ base: 'center', lg: 'stretch' }}
        flex="1"
        justifyContent={{ base: 'center', lg: 'flex-start' }}
      >
        <NavButton
          linkTo="inscricoes"
          title="Inscrições"
          icon={
            <UsersThree
              size={18}
              color={location.includes('inscricoes') ? '#2a255a' : '#718096'}
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
              color={location.includes('doacoes') ? '#2a255a' : '#718096'}
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
              color={location.includes('cursos') ? '#2a255a' : '#718096'}
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
              color={location.includes('usuarios') ? '#2a255a' : '#718096'}
              weight="duotone"
            />
          }
        />
        <NavButton
          linkTo="cupons"
          title="Cupons"
          icon={
            <Ticket
              size={18}
              color={location.includes('cupons') ? '#2a255a' : '#718096'}
              weight="duotone"
            />
          }
        />
      </Flex>

      {/* Suporte — desktop */}
      <Flex
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
        px={4}
        mb={2}
      >
        <Flex
          as="a"
          href="https://wa.me/5511971415567?text=Olá! Preciso de suporte com o painel do Cursinho FEA USP."
          target="_blank"
          rel="noopener noreferrer"
          w="100%"
          align="center"
          gap={2}
          px={3}
          py={2}
          borderRadius="lg"
          bg="green.50"
          color="green.700"
          fontSize="sm"
          fontWeight="semibold"
          borderLeft="3px solid"
          borderLeftColor="green.400"
          _hover={{ bg: 'green.100', textDecoration: 'none' }}
          transition="background 0.15s"
          cursor="pointer"
        >
          <WhatsappLogo size={18} color="#25d366" weight="fill" />
          Suporte
        </Flex>
      </Flex>

      {/* Logout + logo — desktop */}
      <Flex
        direction="column"
        px={4}
        pb={6}
        gap={4}
        display={{ base: 'none', sm: 'none', lg: 'flex' }}
        borderTop="1px solid"
        borderColor="gray.100"
        pt={4}
      >
        <Image src={logo} alt="Logo cursinho" h="36px" w="fit-content" mx="auto" opacity={0.7} />
        <Flex
          alignItems="center"
          gap={2}
          cursor="pointer"
          onClick={signOut}
          color="gray.500"
          _hover={{ color: 'red.500' }}
          transition="color 0.15s"
          justifyContent="center"
        >
          <SignOut size={16} weight="bold" />
          <Text fontSize={14}>Sair</Text>
        </Flex>
      </Flex>

      {/* Suporte + Logout — mobile */}
      <Box display={{ base: 'flex', sm: 'flex', lg: 'none' }} alignItems="center" gap={2} px={4}>
        <Tooltip label="Suporte via WhatsApp" placement="bottom">
          <IconButton
            as="a"
            href="https://wa.me/5511971415567?text=Olá! Preciso de suporte com o painel do Cursinho FEA USP."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Suporte"
            icon={<WhatsappLogo size={18} color="#25d366" weight="fill" />}
            variant="ghost"
            size="sm"
          />
        </Tooltip>
        <Tooltip label="Sair" placement="bottom">
          <IconButton
            aria-label="Sair"
            icon={<SignOut size={18} color="#718096" weight="bold" />}
            variant="ghost"
            size="sm"
            onClick={signOut}
          />
        </Tooltip>
      </Box>
    </Flex>
  )
}
