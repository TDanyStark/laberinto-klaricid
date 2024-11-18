import Questions from '../components/Questions';

const Labyrinth = () => {
  return (
    <main className='text-white'>
      <section className='max-w-[1400px] mx-auto px-2 py-8'>
        <p className='text-3xl leading-normal text-pretty'>
          Para encontrar la salida del laberinto, deberás elegir la opción correcta en cada parte del camino. <span className='font-bold'>Si eliges la opción incorrecta, te perderás en el laberinto.</span> 
        </p>
        <Questions />
      </section>
    </main>
  );
}

export default Labyrinth;