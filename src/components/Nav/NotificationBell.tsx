import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react'
import { Bell } from '@phosphor-icons/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotifications, StudentNotification } from '../../hooks/useNotifications'
import { InfoBox } from '../ViewPages/InfoBox'
import { formatCPF } from '../../utils/cpfUtils'
import { formatPhone } from '../../utils/formatPhone'

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead } = useNotifications()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected, setSelected] = useState<StudentNotification | null>(null)
  const navigate = useNavigate()

  function handleOpenDetail(notif: StudentNotification) {
    setSelected(notif)
    onOpen()
  }

  return (
    <>
      <Menu onOpen={markAllRead} closeOnSelect={false}>
        <Tooltip label="Novas inscrições" placement="right" hasArrow>
          <MenuButton
            as={Box}
            cursor="pointer"
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton
              aria-label="Notificações"
              icon={
                <Bell
                  size={18}
                  weight={unreadCount > 0 ? 'fill' : 'regular'}
                  color={unreadCount > 0 ? '#E9C46A' : '#718096'}
                />
              }
              variant="ghost"
              size="sm"
              pointerEvents="none"
            />
            {unreadCount > 0 && (
              <Badge
                position="absolute"
                top="0px"
                right="0px"
                colorScheme="red"
                borderRadius="full"
                fontSize="9px"
                minW="16px"
                h="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                pointerEvents="none"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </MenuButton>
        </Tooltip>

        <MenuList maxH="400px" overflowY="auto" minW="300px" zIndex={9999} p={0}>
          <Box px={3} py={2} borderBottom="1px solid" borderColor="gray.100">
            <Text fontWeight="semibold" fontSize="sm" color="gray.700">
              Inscrições confirmadas
            </Text>
            <Text fontSize="xs" color="gray.400">
              {notifications.length === 0
                ? 'Nenhuma nova inscrição'
                : `${notifications.length} nova${notifications.length > 1 ? 's' : ''}`}
            </Text>
          </Box>

          {notifications.length === 0 ? (
            <Flex direction="column" align="center" py={6} gap={2} color="gray.300">
              <Bell size={32} weight="duotone" />
              <Text fontSize="sm">Sem novas inscrições</Text>
            </Flex>
          ) : (
            notifications.map((notif, i) => (
              <Box
                key={`${notif.student.id}-${i}`}
                px={3}
                py={2.5}
                borderBottom="1px solid"
                borderColor="gray.50"
                cursor="pointer"
                _hover={{ bg: 'blue.50' }}
                onClick={() => handleOpenDetail(notif)}
              >
                <Text fontWeight="semibold" fontSize="sm" color="gray.700" noOfLines={1}>
                  {notif.student.name}
                </Text>
                <Flex gap={2} align="center" mt={0.5}>
                  {notif.subscription.matriculaID && (
                    <Tag size="sm" colorScheme="blue" borderRadius="full" flexShrink={0}>
                      {notif.subscription.matriculaID}
                    </Tag>
                  )}
                  <Text fontSize="xs" color="gray.400" noOfLines={1}>
                    {notif.subscription.productName || 'Turma'}
                  </Text>
                </Flex>
                <Text fontSize="xs" color="gray.400" mt={0.5}>
                  {notif.subscription.paymentDate
                    ? new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).format(new Date(notif.subscription.paymentDate))
                    : ''}
                </Text>
              </Box>
            ))
          )}
        </MenuList>
      </Menu>

      {/* Ficha do aluno */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader pb={2}>
            <Text fontSize="lg" fontWeight="bold" color="brand.blue">
              {selected?.student.name}
            </Text>
            <Flex gap={2} mt={1} wrap="wrap">
              <Tag size="sm" colorScheme="green">
                {selected?.subscription.productName || 'Turma'}
              </Tag>
              {selected?.subscription.matriculaID && (
                <Tag size="sm" colorScheme="blue">
                  {selected.subscription.matriculaID}
                </Tag>
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
              <InfoBox
                title="E-mail"
                info={selected?.student.email ?? '-'}
                copyValue={selected?.student.email}
              />
              <InfoBox
                title="Telefone"
                info={selected?.student.phoneNumber ? formatPhone(selected.student.phoneNumber) : '-'}
              />
              <InfoBox
                title="CPF"
                info={selected?.student.cpf ? formatCPF(selected.student.cpf) : '-'}
                copyValue={selected?.student.cpf}
              />
              <InfoBox
                title="Data de nascimento"
                info={selected?.student.birth ?? '-'}
              />
              <InfoBox
                title="ID Matrícula"
                info={selected?.subscription.matriculaID ?? 'Aguardando'}
                copyValue={selected?.subscription.matriculaID ?? undefined}
              />
              <InfoBox
                title="Valor pago"
                info={
                  selected?.subscription.valuePaid != null
                    ? new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(selected.subscription.valuePaid)
                    : '-'
                }
              />
              <InfoBox
                title="Data do pagamento"
                info={
                  selected?.subscription.paymentDate
                    ? new Intl.DateTimeFormat('pt-BR').format(
                        new Date(selected.subscription.paymentDate),
                      )
                    : '-'
                }
              />
              <InfoBox
                title="Método de pagamento"
                info={selected?.subscription.paymentMethod ?? '-'}
              />
            </Grid>

            <Button
              mt={5}
              size="sm"
              colorScheme="blue"
              onClick={() => {
                navigate(`/inscricoes/${selected?.student.id}`)
                onClose()
              }}
            >
              Ver ficha completa →
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
