// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row justify-between items-baseline font-nunito-400 text-sm pb-4">
        <h1 className="font-rubik text-xl">a simple headline</h1>
        <div className="grow text-gray border-b border-dashed mx-4"></div>
        <div className="font-nunito font-extrabold">18.11.2024</div>
      </div>
      <p className="font-nunito text-lg text-darkgray">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </p>
    </div>
  );
}
