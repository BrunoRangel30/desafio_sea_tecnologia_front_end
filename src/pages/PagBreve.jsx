import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import fundo from "../assets/imagens/fundo.png";
const PagBreve = () => {
  return (
    <Container className="tela-full">
      <Row>
        <div className="box-breve">
          <span>Em Breve</span>
        </div>
      </Row>
      <img className="imagem-fundo" src={fundo} alt="fundo-imagem-home" />
    </Container>
  );
};

export default PagBreve;
