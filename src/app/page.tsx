import CreateItem from "./_components/menu/CreateItem";
import GetItems from "./_components/menu/GetItems";

export default async function Home() {
  return (
    <main className=" flex h-dvh gap-8 items-center justify-center">
      <CreateItem />
      <GetItems />
    </main>
  );
}
