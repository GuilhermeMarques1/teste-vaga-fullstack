import { useEffect, useState } from "react";
import { 
  TableContainer, 
  Table as TableChakra,
  Thead, Tr, Th,
  Tbody, Td
} from "@chakra-ui/react";
import api from "@/services/api";
import { ICsvRow } from "@/types/IData";
import { toast } from "react-toastify";

export function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ICsvRow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/data?page=${page}`);
        console.log(res.data);
        const data = res.data as ICsvRow[];
        setData(data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Houve um erro ao buscar os dados");
      }
    }

    if(isLoading) fetchData();
  }, []);

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
          {
            data.map((row) => (
              <Tr>
                <Td>{row.nrCpfCnpj}</Td>
                <Td>{row.nmClient}</Td>
                <Td>{row.nrInst}</Td>
                <Td>{row.dtContrato}</Td>
                <Td>{row.dtVctPre}</Td>
                <Td>{row.vlTotal}</Td>
                <Td>{row.vlPresta}</Td>
                <Td>{row.vlMulta}</Td>
                <Td>{row.vlAtual}</Td>
              </Tr>
            ))
          }
        </Tbody>
      </TableChakra>
    </TableContainer>
  );
}
