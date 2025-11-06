import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";
import "../styles/gafete.css";

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
    <div className="gafete-bg">
      <HeaderMenu />
      <div className="gafete-contenedor">
        <div className="gafete-cara">
          <img
            src={participante.avatar}
            alt="avatar"
            className="gafete-avatar"
          />
          <div className="gafete-titulo">
            {participante.nombre} {participante.apellidos}
          </div>
          <br />
          <div className="gafete-twitter">
            @{participante.usuario_twitter.replace(/^@/, "")}
          </div>
          <br />
          <div className="gafete-ocupacion">{participante.ocupacion}</div>
          <div className="gafete-email">{participante.email}</div>
          <div className="mt-auto pt-4 gafete-evento">Congreso TICs 2025</div>
        </div>
        <div className="gafete-cara2">
          <div className="gafete-evento2">Evento:</div>
          <div className="gafete-nombre">Congreso Nacional de TICs</div>
          <br />
          <div className="gafete-univ">
            Universidad Tecnológica de León <br /><br /> León, Guanajuato <br /><br /> 6-8 Noviembre 2025
          </div>
          <div className="gafete-instrucciones">
            Presenta este gafete para acceder a las conferencias y actividades.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gafete;