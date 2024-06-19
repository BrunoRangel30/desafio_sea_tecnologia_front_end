import React, { useState, useEffect, useRef } from "react";
import esferas from "../assets/imagens/esferas.png";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getFuncionarios,
  filtrarFuncionariosAtivos,
  limparFiltroFuncionarios,
  adicionarFuncionarioEdicao,
  deleteFuncionario,
} from "../redux/actions/actionsApi"; //importa todas a actions que serão utlizadas por este componente
import { setView } from "../redux/actions/actions";
import ModalComponente from "./modal";

const FuncionarioList = () => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const { loading, funcionarios,  } = useSelector(
    (state) => state.funcionario
  );
  const dropdownRefs = useRef({});
  //abertura do dropdow de alteração e exclusao
  const toggleDropdown = (id) => {
    setDropdownVisible((prevState) => (prevState === id ? null : id));
  };

  const handleClickOutside = (event) => {
    if (dropdownVisible !== null) {
      const dropdownElement = dropdownRefs.current[dropdownVisible];
      //Se a referência existe e o clique não foi do elemento fecha
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        setDropdownVisible(null);
      }
    }
  };
  //Adiciona um event listener ao document para detectar cliques fora dos dropdowns e remove o listener quando apropriado.
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  useEffect(() => {
    dispatch(getFuncionarios()); // Disparar a ação para buscar os funcionários
  }, [dispatch]);

// Disparar a ação para ver ativos
  const verAtivos = () => {
    dispatch(filtrarFuncionariosAtivos());
  };

// Disparar a ação para limpar os filtros
  const limparFiltro = () => {
    dispatch(limparFiltroFuncionarios());
  };
  //atualizar para o formulário de cadastro
  const handleNavClick = (page) => {
    dispatch(setView(page));
  };
  //atualiza o state para edicao do funcionário
  const alterarFuncionario = (page, funcionario) => {
    dispatch(setView(page));
    dispatch(adicionarFuncionarioEdicao(funcionario));
  };
 //atualiza o state para exclusão do funcionário
  const deletarFuncionario = (id) => {
    dispatch(deleteFuncionario(id));
  };

  return (
    <div>
      <div className="titulo-form">
        <h3>Funcionário(s)</h3>
      </div>
      <div className="box-cadastro-listagem">
        <button className="botao-form" onClick={() => handleNavClick("add")}>
          + Adicionar Funcionário
        </button>
      </div>
      <div className="box-cadastro-listagem">
        <div className="botoes-filtro">
          <button className="botao-ativo" onClick={() => verAtivos()}>
            Ver apenas ativos
          </button>
          <button className="botao-limpar" onClick={() => limparFiltro()}>
            Limpar filtros
          </button>
          <span>
            Ativos {funcionarios.filter((f) => f.ativo).length}/
            {funcionarios.length}
          </span>
        </div>
      </div>
      <div className="box-tabela">
        {!loading && (
          <div className="tabela">
            {funcionarios.length > 0 ? (
              <ul>
                {funcionarios.map((func) => (
                  <li
                    key={func._id}
                    className={func.ativo ? "func-ativo" : "func-desativado"}
                  >
                    <label>{func.nome}</label>
                    <div className="box-info-geral">
                      <div className="box-info">
                        <div className="info-table">{func.cpf}</div>
                        <div className="info-table">{func.rg}</div>
                        <div className="info-table">{func.cargo}</div>
                      </div>
                    </div>
                    <div
                      className="botao-table"
                      onClick={() => toggleDropdown(func._id)}
                      ref={(el) => (dropdownRefs.current[func._id] = el)}
                    >
                      <img
                        className="icone-botao-tabela"
                        src={esferas}
                        alt="esferas-tabela"
                      />
                      {dropdownVisible === func._id && (
                        <Dropdown.Menu show>
                          <Dropdown.Item
                            onClick={() => alterarFuncionario("edit", func)}
                          >
                            Alterar
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => deletarFuncionario(func._id)}
                          >
                            Excluir
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sem-funcionarios">
                Não há funcionários cadastrados no momento.
              </p>
            )}
          </div>
        )}
      </div>
      <ModalComponente />
    </div>
  );
};

export default FuncionarioList;
