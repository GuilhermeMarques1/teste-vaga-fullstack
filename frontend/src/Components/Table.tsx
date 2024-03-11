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
import { LoadingSpinner } from "./LoadingSpinner";
import { Paginator } from "./Paginator";
import { usePaginator } from "chakra-paginator";

export function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ICsvRow[]>([]);
  const [pagesQuantity, setPageQuatity] = useState(1);
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/data?page=${currentPage}`);
        const data = res.data;
        setData(data.data as ICsvRow[]);
        setPageQuatity(data.totalPages);
        setIsLoading(false);
      } catch (error) {
        toast.error("Houve um erro ao buscar os dados");
      }
    }

    if(isLoading) fetchData();
  }, [currentPage]);

  return isLoading ?
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh"
      }}
    >
      <LoadingSpinner /> 
    </div> :
    (
      <>
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
                data.map((row, index) => (
                  <Tr key={index}>
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
        <Paginator 
          pagesQuantity={pagesQuantity}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsLoading={setIsLoading}
        />
      </>
    );
}
