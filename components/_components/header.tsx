import Image from "next/image"

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center">
                    <div className="flex items-center">
                        <div className="mr-4">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <h1 className="text-xl font-semibold text-gray-800">GSCONSULTA</h1>
                    </div>
                </div>
            </div>
        </header>
    )
}