import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Gafete = () => {
  const { id } = useParams();
  const [participante, setParticipante] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/participante/${id}`)
      .then((res) => res.json())
      .then((data) => setParticipante(data));
  }, [id]);

  if (!participante) {
    return <div className="text-center py-5">Cargando...</div>;
  }

  return (
    <div className="d-flex justify-content-center flex-wrap gap-5 py-5">
      <div className="border rounded shadow p-4 bg-light" style={{ width: 330, height: 480 }}>
        <div className="d-flex flex-column align-items-center h-100">
          <img
            src={participante.avatar}
            alt="avatar"
            style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 16, border: "3px solid #0d6efd" }}
          />
          <div className="fw-bold fs-4 mt-2 mb-1">
            {participante.nombre} {participante.apellidos}
          </div>
          <div className="fs-5 mb-2">
            @{participante.usuario_twitter.replace(/^@/, "")}
          </div>
          <div className="fs-6 mb-2">{participante.ocupacion}</div>
          <div className="text-muted">{participante.email}</div>
          <div className="mt-auto pt-4 text-primary">Congreso TICs 2025</div>
        </div>
      </div>
      <div className="border rounded shadow p-4 bg-light" style={{ width: 330, height: 480 }}>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
          <div className="fs-5 mb-2">Evento:</div>
          <div className="fw-bold fs-4 mb-2">Congreso Nacional de TICs</div>
          <div className="mb-3 text-center" style={{ maxWidth: 220 }}>
            Universidad Tecnológica de León <br /> León, Guanajuato <br /> 6-8 Noviembre 2025
          </div>
          <div className="mt-4 text-secondary">
            Presenta este gafete para acceder a las conferencias y actividades.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gafete;
