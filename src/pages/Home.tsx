import { useState, useEffect } from "react";
import cacheService from "../services/cache.service";

export default function Home() {
    const [cacheStats, setCacheStats] = useState(cacheService.getStats());

    const refreshStats = () => {
        setCacheStats(cacheService.getStats());
    };

    const clearCache = () => {
        cacheService.clear();
        refreshStats();
    };

    useEffect(() => {
        refreshStats();
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#181818] p-8">
                <h1 className="text-3xl lg:text-4xl text-yellow-400 font-bold mb-8">
                    Home placeholder
                </h1>

                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6 mb-6 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cache Statistics</h2>
                    <div className="text-white space-y-2">
                        <p><span className="font-bold">Memory Entries:</span> {cacheStats.memoryEntries}</p>
                        <p><span className="font-bold">LocalStorage Entries:</span> {cacheStats.localStorageEntries}</p>
                        <p><span className="font-bold">Total Size:</span> {cacheStats.sizeInMB} MB</p>
                        <p><span className="font-bold">Storage Used:</span> {cacheStats.percentUsed}%</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={refreshStats}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
                    >
                        Refresh Stats
                    </button>
                    <button 
                        onClick={clearCache}
                        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors"
                    >
                        Clear Cache
                    </button>
                </div>
            </div>
        </div>
    );
}