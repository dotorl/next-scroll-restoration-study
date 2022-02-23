import Image from 'next/image';

function Movie({ movie }: { movie: any }) {
  return (
    // <motion.div
    //   layout
    //   animate={{ opacity: 1 }}
    //   initial={{ opacity: 0 }}
    //   exit={{ opacity: 0 }}
    //   // transition={{ duration: 2 }}
    // >
    <>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="" />
    </>
    // </motion.div>
  );
}

export default Movie;
