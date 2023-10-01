import React from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from 'reactstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <Button
      outline
      color='info'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaArrowLeft/>
       
      </Button>
      <span>Página {currentPage} de {totalPages}</span>
      <Button
      outline
      color='info'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
         <FaArrowRight/>
        
      </Button>
    </div>
  );
};

export default Pagination;
