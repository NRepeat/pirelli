import MainCanvas from "~/components/main-canvas";

export function Welcome() {
  return (
    <main className="flex items-center justify-center ">
      <div className="flex-1 flex flex-col items-center  ">
        <div className="w-full space-y-6 relative flex">

          <div className="w-[300px] absolute bg-gray-400/30 rounded-sm p-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate iusto, qui et earum saepe quos ex est, eum quidem exercitationem, laborum impedit quo itaque! Accusamus beatae error dolorem non quas!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis consequatur asperiores fugiat necessitatibus tenetur placeat, fugit libero maiores saepe repellat dolores atque, pariatur provident quod inventore eos cupiditate, eius sapiente!
          </div>
          <MainCanvas />
        </div>
      </div>
    </main>
  );
}

