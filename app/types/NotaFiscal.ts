import { Item } from './Item';

export interface NotaFiscal {
    loja_emit: string;        // Sigla da loja emitente (3 letras)
    loja_destinat: string;    // Sigla da loja destinatária (3 letras)
    nota_fiscal: string;      // Número da Nota Fiscal
    data_de_emissao: string;  // Data de emissão da NF
    data_exp: string;         // Data de expedição
    data_receb: string;       // Data de recebimento
    mdf: string;              // Número do Manifesto de Documentos Fiscais
    motorista: string;        // Nome do motorista
    ci: string;               // Código de Identificação da Carga
    emissor: string;          // Quem emitiu a Nota Fiscal
    recebedor: string;        // Quem recebeu a mercadoria
    serie: string;            // Série (ex: C, 1)
    valor_total: number;      // Valor total da Nota Fiscal
    itens: Item[];            // Lista de itens
}