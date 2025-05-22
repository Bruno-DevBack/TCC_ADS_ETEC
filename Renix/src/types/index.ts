export interface Usuario {
    id?: string;
    nome_usuario: string;
    email_usuario: string;
    senha_usuario?: string;
    telefone_usuario?: string;
    eAdmin?: boolean;
    ePremium?: boolean;
    fotoPerfilBase64?: string | null;
    dashboards?: string[];
    historico_investimentos?: any[];
    historico_dashboards?: any[];
}

export interface Banco {
    id?: string;
    nome_banco: string;
    IOF_diario: number;
    cdi: number;
    IR_ate_180_dias: number;
    IR_ate_360_dias: number;
    IR_ate_720_dias: number;
    IR_acima_720_dias: number;
    caracteristicas: Record<string, any>;
}

export type TipoInvestimento = 'CDB' | 'LCI' | 'LCA' | 'TESOURO_DIRETO' | 'FUNDOS';

export interface Investimento {
    id?: string;
    usuario_id: string;
    banco_id: string;
    valor_investimento: number;
    data_inicio: string;
    data_fim: string;
    tipo_investimento: TipoInvestimento;
    caracteristicas: Record<string, any>;
}

export interface Dashboard {
    id?: string;
    usuario_id: string;
    informacoes: Record<string, any>;
    comparativos: Record<string, any>;
    alertas: string[];
    historico: any[];
}