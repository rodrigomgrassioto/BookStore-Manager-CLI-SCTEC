
export interface ClienteModel { 
    readonly id_cliente: number; 
    nome: string;
    email: string;
    telefone?: string;
    data_nascimento?: Date;
    data_cadastro: Date;
};

export interface ClienteCadastro {
  nome: string;
  email: string;
  telefone?: string;
  data_nascimento?: Date;
};






