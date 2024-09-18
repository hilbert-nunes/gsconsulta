export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-100 py-4 mt-auto">
            <div className="container mx-auto px-4">
                <p className="text-center text-sm text-gray-600">
                    &copy; {currentYear} CLAUDINO S/A. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}