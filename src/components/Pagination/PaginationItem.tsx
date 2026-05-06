import { Button } from '@chakra-ui/react'

interface PaginationItemProps {
  isCurrent?: boolean
  number: number
  onPageChange: (value: number) => void
}

export function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        w="8"
        minW="8"
        bgColor="brand.blue"
        color="white"
        borderRadius="md"
        isDisabled
        _disabled={{ bgColor: 'brand.blue', cursor: 'default', opacity: 1 }}
        _hover={{ bgColor: 'brand.blue' }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="8"
      minW="8"
      variant="ghost"
      colorScheme="gray"
      borderRadius="md"
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
}
