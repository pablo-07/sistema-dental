import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";

// Componente que recibe la url de la API, la cantidad de columnas y el nombre de las columnas
function TablaDinamica({ url, columnas, nombres }) {
  // Estado para guardar los datos de la API
  const [datos, setDatos] = useState([]);

  // Función para hacer la petición a la API
  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Efecto para llamar a la función cuando se monta el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Función para renderizar las filas de la tabla
  const renderRows = () => {
    return datos.map((dato, index) => {
      return (
        <tr key={index}>
          {/* Iteramos sobre las columnas y mostramos el valor correspondiente del dato */}
          {columnas.map((columna) => (
            <td key={columna}>{dato[columna]}</td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            {/* Iteramos sobre los nombres y mostramos el encabezado de cada columna */}
            {nombres.map((nombre) => (
              <th key={nombre}>{nombre}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </Table>
    </div>
  );
}

export default TablaDinamica;
