import Carta, { type CardData } from "../Componentes/Carta"; 

interface VistaMazoProps {
  cards: CardData[];
  onEdit: (card: CardData) => void;
  onDelete: (id: number) => void;
}

function VistaMazo({ cards, onEdit, onDelete }: VistaMazoProps) {
 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
      {cards.map((card) => (
        <Carta 
          key={card.id}
          data={card}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default VistaMazo;