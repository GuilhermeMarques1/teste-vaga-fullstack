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

export function Paginator() {
  const pagesQuantity = 12;
  const { currentPage, setCurrentPage } = usePaginator({
    initialState: { currentPage: 1 }
  });

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
  

  return(
    <ChakraPaginator
      pagesQuantity={pagesQuantity}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
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
