import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Confirmacao_passo from "../passos/Confirmacao_passo";
import Proximo_anterior from "../passos/Proximo_anterior";
import fundo from "../../assets/imagens/fundo.png";

const Passo2 = () => {
  return (
    <div className="passo-container">
      <Row className="passo-container-filho">
        <div style={{ height: "50vh" }}>
          <div className="box-breve">
            <span>Em Breve</span>
          </div>
        </div>
        <Confirmacao_passo />
      </Row>
      <Proximo_anterior />
      <img className="imagem-fundo" src={fundo} alt="fundo-imagem-home" />
    </div>
  );
};

export default Passo2;
