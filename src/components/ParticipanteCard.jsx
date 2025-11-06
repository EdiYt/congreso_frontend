import React from "react";

const ParticipanteCard = ({ participante }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="card-title mb-2">
          {participante.nombre} {participante.apellidos}
        </h5>
        <p className="mb-1">
          <strong>Ocupación:</strong> {participante.ocupacion}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {participante.email}
        </p>
        <p className="mb-1">
          <strong>Twitter:</strong>{" "}
          <a
            
            target="_blank"
            rel="noopener noreferrer"
          >
            {participante.usuario_twitter}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ParticipanteCard;
