import './Carta.css'

type props ={
    numero: number;
    nombre: string;
    imagen: string;

};

function Carta({
    imagen,
    nombre,
    numero, 
}: props ) {
    return(

  <div className="flex flex-col items-center w-50 transition-transform duration-300 hover:scale-1.03"> 
    <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg border-2 border-gray-700 hover:border-red-500">
        

     <img src={imagen} alt={nombre} className="absolute inset-0 w-full h-full object-cover"/>
   
     <div className="absolute inset-0 flex flex-col justify-between p-2 bg-linear-to-t from-black via-transparent to-transparent" >
     
     <div className="absolute top-2 left-2 bg-red-700 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-red-500 shadow-md">
      <h3>
     {numero}
     </h3>
     </div>

     <div className="absolute bottom-0 left-0 right-0 p-2 text-center bg-linear-to-t from-gray-900 via-gray-900/80 to-transparent">
     <h3 className="text-white text-md font-bold uppercase truncate">
     {nombre} 
     </h3>
     </div>

    </div>
    </div>
    
    <div className="flex space-x-2 w-full justify-center mt-3">

      <button className="flex items-center justify-center px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition duration-150 shadow-md w-1/2">
        Eliminar
      </button>

      <button className="flex items-center justify-center px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition duration-150 shadow-md w-1/2">
        Editar
      </button>
    </div>
  </div>
  
  );
}


export default Carta;





