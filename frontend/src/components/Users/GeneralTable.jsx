import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';

const TableUsers = (props) => {
  const { data, currentPage, itemsPerPage, status } = props;
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    setStartIndex((currentPage - 1) * itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return (
    <div className="d-flex">
    <Table >
      <thead>
        <tr>
          <th>No.</th>
          <th>Usuario</th>
          <th>Rol</th>
          <th>Fecha de creacion</th>
          <th>Fecha de actualizacion</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((usuario, index) => (
          <tr key={index}>
            <td>{startIndex + index + 1}</td>
            <td>{usuario.users}</td>
            <td>{usuario.rol}</td>
            <td>{usuario.createdAt}</td>
            <td>{usuario.updatedAt}</td>
            <td>
              <Button
                onClick={() => status(usuario.user_id, usuario.status, index)}

                style={{
                  color: usuario.status ? 'white' : 'white',
                  borderRadius: '10px',
                  // border: "1px solid",
                  textAlign: 'center',
                  background: usuario.status ? 'green' : 'red',
                }}
              >
                {usuario.status ? 'Activo' : 'Inactivo'}
              </Button>
            </td>
            <td>
              <i>Borrar</i> <i>Editar</i>
            </td>
          </tr>
        ))}
      </tbody>
    </Table></div>
  );
};

export default TableUsers;
