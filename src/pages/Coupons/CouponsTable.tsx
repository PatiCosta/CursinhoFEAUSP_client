import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  IconButton,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Ticket } from '@phosphor-icons/react';
import { Trash } from '@phosphor-icons/react';
import { DiscountCoupon } from './index';
import api from '../../services/api'; // Usa o seu api.ts
import { useRef, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CouponsTableProps {
  coupons: DiscountCoupon[];
  onRefresh: () => void;
}

export function CouponsTable({ coupons, onRefresh }: CouponsTableProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCouponId, setSelectedCouponId] = useState<string | null>(null);
  const cancelRef = useRef(null);

  // Função para ativar/desativar cupom
  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await api.put(`/coupons/${id}`, {
        isActive: !currentStatus,
      });
      toast({
        title: `Cupom ${!currentStatus ? 'ativado' : 'desativado'}.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onRefresh();
    } catch (error) {
      toast({
        title: 'Erro ao atualizar cupom',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Funções para deletar cupom
  const openDeleteDialog = (id: string) => {
    setSelectedCouponId(id);
    onOpen();
  };

  const handleDelete = async () => {
    if (!selectedCouponId) return;
    try {
      await api.delete(`/coupons/${selectedCouponId}`);
      toast({
        title: 'Cupom deletado!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      onRefresh();
      onClose();
      setSelectedCouponId(null);
    } catch (error) {
      toast({
        title: 'Erro ao deletar cupom',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  if (coupons.length === 0) {
    return (
      <VStack justify="center" h="240px" color="gray.400" spacing={3}>
        <Ticket size={48} weight="duotone" />
        <Text fontSize="md" fontWeight="medium">Nenhum cupom cadastrado.</Text>
        <Text fontSize="sm">Clique em "Criar Cupom" para adicionar o primeiro.</Text>
      </VStack>
    )
  }

  return (
    <>
      <Table variant="striped" colorScheme="gray" mt={4}>
        <Thead>
          <Tr bg="brand.blue">
            <Th color="gray.300" borderColor="transparent">Código</Th>
            <Th isNumeric color="gray.300" borderColor="transparent">Valor (R$)</Th>
            <Th color="gray.300" borderColor="transparent">Criação</Th>
            <Th color="gray.300" borderColor="transparent">Ativo?</Th>
            <Th color="gray.300" borderColor="transparent">Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon.id}>
              <Td fontWeight="bold">{coupon.code}</Td>
              <Td isNumeric>
                {coupon.discountValue.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Td>
              <Td>
                {format(new Date(coupon.createdAt), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </Td>
              <Td>
                <Switch
                  colorScheme="green"
                  isChecked={coupon.isActive}
                  onChange={() => handleToggleActive(coupon.id, coupon.isActive)}
                />
              </Td>
              <Td>
                <IconButton
                  aria-label="Deletar cupom"
                  icon={<Trash />}
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => openDeleteDialog(coupon.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal de Confirmação para Deletar */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Cupom
            </AlertDialogHeader>
            <AlertDialogBody>
              Você tem certeza? Esta ação não pode ser desfeita.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

