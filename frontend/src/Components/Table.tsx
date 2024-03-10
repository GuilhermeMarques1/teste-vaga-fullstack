import { 
  TableContainer, 
  Table as TableChakra,
  Thead, Tr, Th,
  Tbody, Td
} from "@chakra-ui/react";

export function Table() {
  return (
    <TableContainer
      marginRight="4"
      marginLeft="4"
    >
      <TableChakra 
        variant='striped' 
        colorScheme='blackAlpha'
        mt={4}
        color="black.800"
      >
        <Thead>
          <Tr>
            <Th>CPF/CNPJ</Th>
            <Th>Nome</Th>
            <Th>Instituição</Th>
            <Th>Data do contrato</Th>
            <Th>Data vencimento</Th>
            <Th>vlTotal</Th>
            <Th>vlPresta</Th>
            <Th>vlMulta</Th>
            <Th>vlAtual</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>41854274761</Td>
            <Td>CLIENTE 1</Td>
            <Td>533</Td>
            <Td>27/12/2022</Td>
            <Td>06/04/2022</Td>
            <Td>83720.19</Td>
            <Td>17524.03</Td>
            <Td>536.4</Td>
            <Td>47257.39</Td>
          </Tr>
          <Tr>
            <Td>41854274761</Td>
            <Td>CLIENTE 2</Td>
            <Td>1150</Td>
            <Td>27/12/2022</Td>
            <Td>06/04/2022</Td>
            <Td>83720.19</Td>
            <Td>17524.03</Td>
            <Td>536.4</Td>
            <Td>47257.39</Td>
          </Tr>
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
}
