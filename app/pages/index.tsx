'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { Item } from "../types/Item"
import { NotaFiscal } from "../types/NotaFiscal"

import axios from 'axios';


interface SearchResult {
    item: Item
    invoice: NotaFiscal
}

export default function InventorySearch() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
    const [notaFiscal, setNotaFiscal] = useState<NotaFiscal | null>(null);  // Tipagem da Nota Fiscal
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSearchResult(null)

        try {
            const response = await axios.get<NotaFiscal[]>('http://localhost:3001/notas');  // Tipagem da resposta da API
            const notas = response.data;
            console.log(notas)
            console.log(searchTerm)
            const notaEncontrada = notas.find(nota =>
                nota.itens.some(item => item.num_serie === searchTerm || item.inventario === searchTerm)
            );
            console.log(notaEncontrada)
            if (notaEncontrada) {
                setIsLoading(false)
                setNotaFiscal(notaEncontrada);
                setError(null);
            } else {
                setError('Item não encontrado');
            }
        } catch (err) {
            console.error('Erro ao buscar nota fiscal:', err);
            setError('Erro ao buscar dados');
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Inventory Search</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Enter item ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Searching...
                                </>
                            ) : (
                                'Search'
                            )}
                        </Button>
                    </form>

                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {notaFiscal && (
                        <div className="mt-4 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Item Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p><strong>ID:</strong> {notaFiscal.itens[0].descricao}</p>
                                    <p><strong>Name:</strong> {notaFiscal.itens[0].almox}</p>
                                    <p><strong>Quantity:</strong> {notaFiscal.itens[0].num_serie}</p>
                                    <p><strong>Price:</strong> ${notaFiscal.itens[0].inventario}</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Invoice Information</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p><strong>ID:</strong> {notaFiscal.data_receb}</p>
                                    <p><strong>Date:</strong> {notaFiscal.data_receb}</p>
                                    <p><strong>Total:</strong> ${notaFiscal.data_exp}</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}