import { MenuDivider, MenuItem, MenuOptionGroup, Icon } from '@chakra-ui/react'
import { CheckCircle, Clock, XCircle } from '@phosphor-icons/react'

interface PaymentStatusFilterProps {
  handleAddFilter: (data: { key: 'paymentStatus'; value: string }) => void
  isDisabled: boolean
}

export function PaymentStatusFilter({
  handleAddFilter,
  isDisabled,
}: PaymentStatusFilterProps) {
  return (
    <>
      <MenuDivider />
      <MenuOptionGroup title="Status do Pagamento">
        <MenuItem
          isDisabled={isDisabled}
          icon={<Icon as={CheckCircle} color="green.500" weight="bold" />}
          onClick={() => handleAddFilter({ key: 'paymentStatus', value: 'CONCLUIDA' })}
        >
          Confirmado (Única/PIX)
        </MenuItem>
        
        <MenuItem
          isDisabled={isDisabled}
          icon={<Icon as={CheckCircle} color="blue.500" weight="bold" />}
          onClick={() => handleAddFilter({ key: 'paymentStatus', value: 'active' })}
        >
          Ativo (Assinatura)
        </MenuItem>

        <MenuItem
          isDisabled={isDisabled}
          icon={<Icon as={Clock} color="yellow.500" weight="bold" />}
          onClick={() => handleAddFilter({ key: 'paymentStatus', value: 'PENDENTE' })}
        >
          Pendente
        </MenuItem>

        <MenuItem
          isDisabled={isDisabled}
          icon={<Icon as={XCircle} color="red.500" weight="bold" />}
          onClick={() => handleAddFilter({ key: 'paymentStatus', value: 'canceled' })}
        >
          Cancelado
        </MenuItem>
      </MenuOptionGroup>
    </>
  )
}