import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setView } from "../../redux/actions/actions";
import FuncionarioList from "../funcionarioList";
import FuncionarioForm from "../funcionarioFormulario";
import Proximo_anterior from "../passos/Proximo_anterior";
import Confirmacao_passo from "../passos/Confirmacao_passo";
import fotoPerfil from "../../assets/imagens/fotoPerfil.png";
import fundo from "../../assets/imagens/fundo.png";

const Passo1 = () => {

  const currentView = useSelector((state) => state.app.currentView);
 
  return (
    <div>
      <Row className="mt-5">
        <Col lg={4} sm={12} className="mb-3">
          <div className="box-form">
            <p className="texto-perfil">
              Ana Clara Silva Santos, Gerente de Marketing experiente com um
              histórico de sucesso comprovado, tem sido parte integrante do
              crescimento da empresa desde que ingressou em 2020. Sua expertise
              em estratégias de marketing digital, principalmente SEO, SEM e
              marketing de conteúdo, foi fundamental para aumentar o tráfego do
              site em 20% e aumentar as conversões de leads em 15%. Sob sua
              liderança, as campanhas de marketing registraram um aumento
              notável de 30% no ROI, o que lhe rendeu o merecido reconhecimento
              de "Melhor Gerente de Marketing" em 2022.
            </p>
            <div className="box-img-perfil">
              <img className="foto-perfil" src={fotoPerfil} alt="foto-perfil" />
            </div>
          </div>
        </Col>
        {/*Div onde realiza a troca de contexto entre a listagem de funcionarios cadastro e edição controlado pelo state 'currentView'*/ }
        <Col lg={8} sm={12} className="mb-3">
          <div className="box-form">
            {(() => {
              switch (currentView) {
                case "list":
                  return <FuncionarioList />;
                case "add":
                  return <FuncionarioForm editMode={false} />;
                case "edit":
                  return <FuncionarioForm editMode={true} />;
                default:
                  return null;
              }
            })()}
            <Confirmacao_passo /> {/*componente responsavel pela conclusao ou não do passo atual'*/ }
          </div>
        </Col>
      </Row>
      <Proximo_anterior  /> {/*componente responsavel pela navegação entre os botoes anterior e próximo'*/ }
      <img className="imagem-fundo" src={fundo} alt="fundo-imagem-home" />
    </div>
  );
};

export default Passo1;
