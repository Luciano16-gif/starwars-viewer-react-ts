import { useState, useEffect } from 'react';
import cacheService from '../services/cache.service';

export default function Home() {
    const [cacheStats, setCacheStats] = useState({
        memoryEntries: 0,
        localStorageEntries: 0,
        totalSize: 0,
        sizeInMB: '0',
        percentUsed: 0
    });

    const clearCache = () => {
        cacheService.clear();
        refreshStats();
    };

    const refreshStats = () => {
        setCacheStats(cacheService.getStats());
    };

    useEffect(() => {
        refreshStats();
    }, []);

    return (
        <div className="relative bg-[#181818] min-h-screen">
            <header className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Explore the Star Wars Universe</h1>
                <p className="mt-4 text-yellow-100/80 max-w-2xl mx-auto">Search and browse people, films, planets, starships, and species with fast, cached results.</p>
            </header>

            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                    { title: 'People', link: '/people' },
                    { title: 'Films', link: '/films' },
                    { title: 'Planets', link: '/Planets' },
                    { title: 'Starships', link: '/starships' },
                    { title: 'Species', link: '/species' },
                ].map(card => (
                    <a key={card.title} href={card.link} className="block bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6 hover:bg-[rgba(95,96,96,0.5)] transition-colors">
                        <h3 className="text-2xl font-bold text-yellow-400">{card.title}</h3>
                        <p className="text-white/90 mt-2">Explore {card.title.toLowerCase()} from the galaxy.</p>
                    </a>
                ))}
            </section>

            <section className="max-w-6xl mx-auto px-6 mt-10 grid md:grid-cols-2 gap-6">
                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">How it works</h2>
                    <ol className="text-white/90 list-decimal list-inside space-y-1">
                        <li>Use search to find items</li>
                        <li>Browse lists and pages</li>
                        <li>Open any item for details</li>
                    </ol>
                </div>
                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">Performance</h2>
                    <p className="text-white/90">Results are cached for speed. You can clear the cache below if needed.</p>
                    <div className="text-white space-y-1 mt-3 text-sm">
                        <p><span className="font-bold">Memory Entries:</span> {cacheStats.memoryEntries}</p>
                        <p><span className="font-bold">LocalStorage Entries:</span> {cacheStats.localStorageEntries}</p>
                        <p><span className="font-bold">Total Size:</span> {cacheStats.sizeInMB} MB</p>
                        <p><span className="font-bold">Storage Used:</span> {cacheStats.percentUsed}%</p>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button 
                            onClick={refreshStats}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-colors"
                        >
                            Refresh Stats
                        </button>
                        <button 
                            onClick={clearCache}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors"
                        >
                            Clear Cache
                        </button>
                    </div>
                </div>
            </section>

            <footer className="max-w-6xl mx-auto px-6 py-12 text-yellow-200/70 text-sm">
                Data from swapi.tech • Built with React + TypeScript
            </footer>
        </div>
    );
}