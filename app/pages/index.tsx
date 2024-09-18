/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { NotaFiscal } from "../types/NotaFiscal"
import { notas } from '../data/notas';  // Importa o array de dados local


import axios from 'axios';
import Header from '@/components/_components/header'

function formatarData(data: Date): string {
    const dia = String(data.getDate()).padStart(2, '0');  // Obtém o dia e adiciona um zero à esquerda, se necessário
    const mes = String(data.getMonth() + 1).padStart(2, '0');  // Mês começa do zero, então é necessário adicionar +1
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;  // Retorna no formato DD/MM/AAAA
}

export default function InventorySearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const [notaFiscal, setNotaFiscal] = useState<NotaFiscal | null>(null);  // Tipagem da Nota Fiscal
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setNotaFiscal(null)

        console.log(notas)

        // Busca a nota fiscal com base no número de série ou inventário
        const notaEncontrada = notas.find((nota) =>
            nota.itens.some((item) => item.num_serie === searchTerm || item.inventario === searchTerm)
        );

        console.log(notaEncontrada)

        if (notaEncontrada) {
            setNotaFiscal(notaEncontrada);
            setError(null);
            setIsLoading(false)
        } else {
            setError('Item não encontrado');
            setIsLoading(false)
        }
    }

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen">
                <Card>
                    <CardHeader>
                        <CardTitle>Buscar NF por Número de Série ou Inventário</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSearch} className="space-y-4">
                            <Input
                                type="text"
                                placeholder="NS ou INV"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Pesquisando...
                                    </>
                                ) : (
                                    'Buscar'
                                )}
                            </Button>
                        </form>

                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {notaFiscal && (
                            <div className="mt-4 space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informação do item:</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Descrição:</strong> {notaFiscal.itens[0].descricao}</p>
                                        <p><strong>Almoxarifado:</strong> {notaFiscal.itens[0].almox}</p>
                                        <p><strong>Grupo:</strong> {notaFiscal.itens[0].grupo}</p>
                                        <p><strong>NCE:</strong> {notaFiscal.itens[0].nce}</p>
                                        <p><strong>Número de Série:</strong> {notaFiscal.itens[0].num_serie}</p>
                                        <p><strong>Inventário:</strong> {notaFiscal.itens[0].inventario}</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Informação da nota:</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p><strong>Loja Emitente:</strong> {notaFiscal.loja_emit}</p>
                                        <p><strong>Loja Emitente:</strong> {notaFiscal.loja_destinat}</p>
                                        <p><strong>NF:</strong> {notaFiscal.nota_fiscal}</p>
                                        <p><strong>Série:</strong> {notaFiscal.serie}</p>
                                        <p><strong>Data de emissão:</strong> {formatarData(new Date(notaFiscal.data_de_emissao))}</p>
                                        <p><strong>Data de expedição:</strong> {formatarData(new Date(notaFiscal.data_exp))}</p>
                                        <p><strong>Data de recebimento:</strong> {formatarData(new Date(notaFiscal.data_receb))}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}