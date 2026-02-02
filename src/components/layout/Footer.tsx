import { MapPin, Phone, Mail, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-muted py-12 px-6 border-t border-secondary/20" id="contato">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif text-foreground">Micaela Sampaio</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Estética Científica e Bem-Estar.<br />
                        Tratamentos personalizados para realçar sua beleza natural.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Instagram className="w-5 h-5 text-primary hover:text-secondary cursor-pointer transition-colors" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="font-serif text-lg text-foreground">Contato</h4>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Praceta+25+de+Abril,+Vila+Nova+de+Gaia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Praceta 25 de Abril, Vila Nova de Gaia</span>
                    </a>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>+351 912 420 210</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>cesteticams@gmail.com</span>
                    </div>
                </div>

                <a
                    href="https://www.google.com/maps/search/?api=1&query=Praceta+25+de+Abril,+Vila+Nova+de+Gaia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-48 bg-gray-200 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 relative group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=Praceta+25+de+Abril,+Vila+Nova+de+Gaia&zoom=15&size=600x300&maptype=roadmap&key=YOUR_API_KEY')" }}>
                        {/* Fallback to simple map text/image if no API key */}
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                            <MapPin className="w-8 h-8 text-primary mb-2" />
                            <span className="text-gray-600 text-sm font-medium">Ver no Google Maps</span>
                        </div>
                    </div>
                </a>
            </div>
            <div className="mt-12 pt-6 border-t border-secondary/10 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Estética Micaela Sampaio. Todos os direitos reservados.
            </div>
        </footer>
    );
}
