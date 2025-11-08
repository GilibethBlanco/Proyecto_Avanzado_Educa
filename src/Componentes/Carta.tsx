import './Carta.css'

function Carta ({ numero }:{numero: number | string}){
    return <div className="contenedor">{numero}</div>;
}

export default Carta;
