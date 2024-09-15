
export class Document {
    nome: string
    email: string
    valor: string

    constructor(nome: string, email: string, valor: string) {
        this.nome = nome
        this.email = email
        this.valor = valor
    }

    static fromLines(lines: string[]): Document {
        const [nome, email, valor] = lines
        return new Document(nome, email, valor)
    }
}