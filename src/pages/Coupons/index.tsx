import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Plus } from '@phosphor-icons/react';
import { useCallback, useEffect, useState } from 'react';
import api from '../../services/api'; // Usa o seu api.ts
import { CreateCouponModal } from './CreateCouponModal';
import { CouponsTable } from './CouponsTable';

// Interface para definir o tipo de um cupom
export interface DiscountCoupon {
  id: string;
  code: string;
  discountValue: number;
  isActive: boolean;
  currentUses: number;
  maxUses?: number;
  createdAt: string;
}

export function Coupons() {
  const [coupons, setCoupons] = useState<DiscountCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Função para buscar os cupons da API
  const fetchCoupons = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/coupons');
      setCoupons(response.data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar cupons',
        description: 'Não foi possível buscar os cupons. Tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Buscar os cupons quando a página carregar
  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <Box w="100%" h="100%" p={8} ml={80}>
      <Flex w="100%" justify="space-between" align="center" mb={8}>
        <Heading size="lg">Gerenciamento de Cupons</Heading>
        <Button
          leftIcon={<Plus size={20} />}
          colorScheme="blue"
          onClick={onOpen}
        >
          Criar Cupom
        </Button>
      </Flex>

      {isLoading ? (
        <VStack h="300px" justify="center">
          <Spinner size="xl" />
        </VStack>
      ) : (
        <CouponsTable coupons={coupons} onRefresh={fetchCoupons} />
      )}

      <CreateCouponModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={fetchCoupons} // Passa a função de refresh
      />
    </Box>
  );
}

