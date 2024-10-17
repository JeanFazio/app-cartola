import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/homeStyle.css';

export function Home() {
    const [clubes, setClubes] = useState([]);
    const [filtra, setFiltra] = useState('');

    const buscarDados = async () => {
        try {
            const clubesResponse = await axios.get('https://api.cartola.globo.com/clubes');
            setClubes(Object.values(clubesResponse.data));
        } catch (error) {
            console.error("Erro ao buscar dados", error);
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    const clubesFiltrados = clubes.filter(clube =>
        clube.nome.toLowerCase().includes(filtra.toLowerCase())
    );

    return (
        <div className="container-home">

            <div className="search-container">
                <img
                    className="logo"
                    src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
                    alt="Logo do Cartola FC"
                />
                <div className='input-container'>
                <input
                    type="text"
                    placeholder="Buscar time pelo nome"
                    value={filtra}
                    onChange={(e) => setFiltra(e.target.value)}
                    className="search-input"
                />
                <button className="search-button">Buscar</button>
                </div>
            </div>
            <section id='clubes'>
                <div className="clubes-container">
                    <ul>
                        {clubesFiltrados.map((clube) => (
                            <Link to={`/clubes/${clube.id}`} key={clube.id} className='link-decoration'>
                                <li className="clube-card">
                                    <img src={clube.escudos['60x60']} alt={clube.nome} />
                                    <div className='clube-info'>
                                        <h4>{clube.nome}</h4>
                                        <h4 className='clube-apelido'>{clube.apelido}</h4>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );

}
