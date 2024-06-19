import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { setView, marcarPassoConcluido,toggleIsSim,desmarcarPassoNaoConcluido } from '../../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';



const Confirmacao_passo = () => {  
    const dispatch = useDispatch();
    const isSim = useSelector((state) => state.app.isSim)
    const passoAtual = useSelector(state => state.app.passoAtual);
    const toggleState = () => {
        const newIsSim = !isSim;
        dispatch(toggleIsSim(newIsSim));
        if (newIsSim) {
          dispatch(marcarPassoConcluido(passoAtual));
        } else {
          dispatch(desmarcarPassoNaoConcluido(passoAtual));
        }
    };
 
 

   

    return (
        <div className="box-botao-confirmacao">
            <div className="box-botao-interno">
                <span>A etapa está concluída?</span>
            <div className="toggle-button" onClick={toggleState} >
                    <div className="circle" style={{ order: isSim ? 2 : 1 }}></div>
                    <div className="text" style={{ order: isSim ? 1 : 2 }}>{isSim ? 'Sim' : 'Não'}</div>
                </div>
            </div>
        </div>
    );
};

export default Confirmacao_passo;
