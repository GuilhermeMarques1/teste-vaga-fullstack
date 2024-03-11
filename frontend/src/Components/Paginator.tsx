import { CgChevronLeft, CgChevronRight } from "react-icons/cg"
import {
  Paginator as ChakraPaginator,
  Container,
  Previous,
  Next,
  PageGroup,
  usePaginator
} from "chakra-paginator";
import { ButtonProps } from "@chakra-ui/react";

type PaginatorProps = {
  pagesQuantity: number,
  currentPage: number,
  setCurrentPage: (value: number) => void;
  setIsLoading: (value: boolean) => void;
}

export function Paginator({ pagesQuantity, currentPage, setCurrentPage, setIsLoading }: PaginatorProps) {
  const normalStyles: ButtonProps = {
    w: 7,
    bg: "green.50",
    fontSize: "sm",
    _hover: {
      bg: "green.300"
    },
  };
  
  const activeStyles: ButtonProps = {
    w: 7,
    bg: "green.300",
    fontSize: "sm",
    _hover: {
      bg: "blue.300"
    },
  };
  
  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200"
  };

  function handlePageChange(value: number) {
    setIsLoading(true);
    setCurrentPage(value);
  }

  return(
    <ChakraPaginator
      pagesQuantity={pagesQuantity}
      currentPage={currentPage}
      onPageChange={(value) => handlePageChange(value)}
      activeStyles={activeStyles}
      separatorStyles={separatorStyles}
      normalStyles={normalStyles}
    >
      <Container align="center" justify="space-between" w="full" p={4}>
        <Previous>
          <CgChevronLeft />
        </Previous>
        <PageGroup align="center" />
        <Next>
          <CgChevronRight />
        </Next>
      </Container>
    </ChakraPaginator>
  );
}
