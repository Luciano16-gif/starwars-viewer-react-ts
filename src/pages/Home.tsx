import TopMenu from "../components/menus/topMenu";
import StarryBackground from "../components/customStyles/StarryBackground";

export default function Home() {
    return (
        <div className="relative">
            <StarryBackground />
            <TopMenu />
            <h1 className="text-4xl text-yellow-400 font-bold flex items-center justify-center bg-[#181818] min-h-screen">
                Home placeholder
            </h1>
        </div>
    );
}