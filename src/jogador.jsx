import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/jogadores.css';

export function DetalharClubes() {
    const [atletas, setAtletas] = useState([]);
    const [busca, setBusca] = useState('');
    const { id } = useParams();

    const carregarAtletas = async () => {
        try {
            const response = await axios.get('https://api.cartola.globo.com/atletas/mercado');
            const todosAtletas = Object.values(response.data.atletas);
            const atletasDoClube = todosAtletas.filter(atleta => atleta.clube_id == id);
            setAtletas(atletasDoClube);
        } catch (error) {
            console.error("Erro ao carregar atletas", error);
        }
    };

    useEffect(() => {
        carregarAtletas();
    }, [id]);

    const posicoes = {
        1: "Goleiro",
        2: "Lateral",
        3: "Zagueiro",
        4: "Meia",
        5: "Atacante",
        6: "Técnico",
    };

    const atletasFiltrados = atletas.filter(atleta =>
        atleta.apelido.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className="container-atletas">
            <img className='logo' src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png" alt="" />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar jogador pelo nome"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="search-input"
                />

                <button className="search-button">Buscar</button>
            </div>
            <div className="atletas-container">
                {atletasFiltrados.length > 0 ? (
                    atletasFiltrados.map((atleta, index) => {
                        const imagemCorrigida = atleta.foto ? atleta.foto.replace('FORMATO', '220x220') : 'https://i.pinimg.com/236x/a8/da/22/a8da222be70a71e7858bf752065d5cc3.jpg';
                        return (
                            <div className="atleta-card" key={index}>
                                <img src={imagemCorrigida} width={100} alt={`Foto de ${atleta.apelido}`} />
                                <h4>{atleta.apelido}</h4>
                                <p>{posicoes[atleta.posicao_id] || "Desconhecida"}</p>
                            </div>
                        );
                    })
                ) : (
                    <p>Carregando ou nenhum jogador encontrado...</p>
                )}
            </div>
        </div>
    );
}
