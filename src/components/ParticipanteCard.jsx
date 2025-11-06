import React from "react";
import "../styles/participanteCard.css";

const ParticipanteCard = ({ participante }) => (
  <div className="card participante-card h-100">
    <div className="card-body d-flex flex-column align-items-center text-center px-4">
      <img
        src={participante.avatar}
        alt="avatar"
        className="avatar-img"
        style={{
          width: 95,
          height: 95,
          borderRadius: "50%",
          objectFit: "cover",
          marginBottom: 18
        }}
      />
      <div className="fw-bold fs-4 mb-1 participante-nombre">
        {participante.nombre} {participante.apellidos}
      </div>
      <div className="mb-1 fs-5 participante-twitter">
        @{participante.usuario_twitter.replace(/^@/, "")}
      </div>
      <br />
      <div className="fs-6 participante-ocupacion mb-2">{participante.ocupacion}</div>
    </div>
  </div>
);

export default ParticipanteCard;