import CreateItem from "./_components/menu/CreateItem";

export default async function Home() {
  return (
    <main className=" flex min-h-screen flex-col content-center items-center justify-center">
      <CreateItem />
    </main>
  );
}
