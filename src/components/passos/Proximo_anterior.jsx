import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleIsSim,
  setPassoAtivo,
} from "../../redux/actions/actions";

const Proximo_anterior = () => {

  const dispatch = useDispatch();
  const passoAtual = useSelector((state) => state.app.passoAtual);
  const passos = useSelector((state) => state.app.passos);
  const indexAtual = passos.findIndex((passo) => passo.id === passoAtual);
  //let isConcluido

  const handleProximoPassoClick = () => {
    //alert( 'proximo')
    if (indexAtual < passos.length - 1) {
       let proximoPassoId = passos[indexAtual + 1].id; //posição atual + a proxima
      dispatch(setPassoAtivo(proximoPassoId, passos));  //atualiza o menu de passos
    }
    //atualizar o estado do botao para etapa
    let isConcluido = (passos[indexAtual + 1].concluido); 
    isConcluido ?   dispatch(toggleIsSim(true)) : dispatch(toggleIsSim(false))
  };

  const handlePassoAnteriorClick = () => {
    if (indexAtual > 0) {
      const passoAnteriorId = passos[indexAtual - 1].id;  //retirna a posição atual - anterior
      dispatch(setPassoAtivo(passoAnteriorId, passos));
    }
    let isConcluido = (passos[indexAtual - 1].concluido); 
    isConcluido ?   dispatch(toggleIsSim(true)) : dispatch(toggleIsSim(false))
    
   // dispatch(toggleIsSim(false));
  };

  return (
    <Row>
      <div className="box-botao-etapas">
        <button onClick={handleProximoPassoClick} className="botao-proximo">
          Próximo passo
        </button>
        {passoAtual !== 1 && (
          <button onClick={handlePassoAnteriorClick} className="botao-anterior">
            Passo Anterior
          </button>
        )}
      </div>
    </Row>
  );
};

export default Proximo_anterior;
