export const metadata = {
  title: "Movie",
};

export default function Movie({ params: { id } }: { params: { id: string } }) {
  console.log({ id });
  return (
    <div>
      <h1>Movie {id}</h1>
    </div>
  );
}
