const initialState = {
  loading: false,
  funcionarios: [],
  funcionario: null,
  mensagem: null,
  funcionariosAux: [],
  funcionarioEdicao: null,
};

const funcionarioReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'ADD_FUNCIONARIO_REQUEST':
      case 'UPDATE_FUNCIONARIO_REQUEST':
      case 'DELETE_FUNCIONARIO_REQUEST':
          return {
              ...state, loading: true
          };

      case 'ADD_FUNCIONARIO_SUCCESSO':
          //recebe os dados da api
          return {
              ...state, loading: false, mensagem: 'Funcionário cadastrado com sucesso!', funcionarios: [...state.funcionarios, action.payload]
          };

      case 'GET_FUNCIONARIOS_SUCCESSO':
          return {
              ...state, funcionarios: action.payload
          };

      case 'UPDATE_FUNCIONARIO_SUCCESSO':
          return {
              ...state,
              loading: false,
                  mensagem: 'Funcionário atualizado com sucesso!',
                  funcionarios: state.funcionarios.map(func =>
                      func._id === action.payload._id ? action.payload : func
                  )
          };

      case 'DELETE_FUNCIONARIO_SUCCESSO':
          return {
              ...state,
              loading: false,
                  mensagem: 'Funcionário excluído com sucesso!',
                  funcionarios: state.funcionarios.filter(func => func._id !== action.payload)
          };
      case 'FILTRAR_FUNCIONARIOS_ATIVOS':
          return {
              ...state,
              funcionarios: state.funcionarios.filter(funcionario => funcionario.ativo),
                  funcionariosAux: state.funcionarios,
          };
      case 'LIMPAR_FILTRO_FUNCIONARIOS':
          return {
              ...state,
              funcionarios: state.funcionariosAux
          };
      case 'FUNCIONARIO_EDICAO':
          return {
              ...state,
              funcionarioEdicao: action.payload
          };

      case 'ADD_FUNCIONARIO_FALHA':
      case 'GET_FUNCIONARIOS_FALHA':
      case 'UPDATE_FUNCIONARIO_FALHA':
      case 'DELETE_FUNCIONARIO_FALHA':
          return {
              ...state, loading: false, mensagem: action.payload
          };

      default:
          return state;
  }
};

export default funcionarioReducer;