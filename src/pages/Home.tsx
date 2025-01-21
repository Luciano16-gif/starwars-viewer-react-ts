import StarryBackground from "../components/customStyles/StarryBackground";

export default function Home() {
    return (
        <div className="relative">
            <StarryBackground />
            <div className="flex items-center justify-center min-h-screen bg-[#181818]">
            
                <h1 className="flex justify-center text-3xl lg:text-4xl text-yellow-400 font-bold">
                    Home placeholder
                </h1>

            </div>
        </div>
    );
}