import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import { setView } from '../../redux/actions/actions';
import { setPassoAtivo, toggleIsSim } from "../redux/actions/actions";
import linhaMenu from "../assets/imagens/line.png";
import iconeMenu from "../assets/imagens/icone.png";

const MenuPassos = () => {

  const dispatch = useDispatch();
  const passos = useSelector((state) => state.app.passos);
  //atualiza o state do menu passos 
  const handlePassoClick = (id) => {
    const passoAtualizado = passos.find((passo) => passo.id === id);
    dispatch(setPassoAtivo(id, passos)); //atualiza qual passo foi selecionado
    if (passoAtualizado.concluido) {
      dispatch(toggleIsSim(true)); //atualiza o botao se a etapa foi concluída
    } else {
      dispatch(toggleIsSim(false));
    }
  };

  return (
    <Row>
      <Col>
        <div className="box-menu-superior">
          <div className="box-menu-interno">
            <div className="passo-item">
              {passos.map((passo) => (
                <div
                  key={passo.id}
                  className={
                    passo.ativo
                      ? "box-icone-ativo"
                      : passo.concluido
                      ? "box-icone-concluido"
                      : "box-icone-desativado"
                  }
                  onClick={() => handlePassoClick(passo.id)}
                >
                  <img
                    className="icone-menu"
                    src={iconeMenu}
                    alt="icone-menu-superior"
                  />
                </div>
              ))}
              <img
                className="linha-menu"
                src={linhaMenu}
                alt="linha-menu-superior"
              />
            </div>
            <div className="info-menu">
              {passos.map((passo) => (
                <div className="titulo-menu" key={passo.id}>
                  <span>{passo.nome}</span>
                  {passo.concluido && (
                    <span className="concluido">Concluído</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MenuPassos;
