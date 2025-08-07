import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
            <Helmet>
                <title>Star Wars Explorer | React Portfolio</title>
                <meta name="description" content="Interactive Star Wars universe explorer built with React & TypeScript. Browse characters, planets, starships and more with advanced search and caching." />
                <meta property="og:title" content="Star Wars Explorer | React Portfolio" />
                <meta property="og:description" content="Interactive Star Wars universe explorer built with React & TypeScript" />
                <meta name="twitter:title" content="Star Wars Explorer | React Portfolio" />
                <meta name="twitter:description" content="Interactive Star Wars universe explorer built with React & TypeScript" />
            </Helmet>
            
            <header className="max-w-4xl mx-auto px-6 pt-20 pb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400">Star Wars Explorer</h1>
                <p className="mt-4 text-yellow-100/80">
                    This app lets anyone quickly look up Star Wars people, planets, films, starships, vehicles, and species. It fetches live data and 
                    keeps recent results cached so pages load fast even on slow connections.
                </p>
            </header>

            <section className="max-w-4xl mx-auto px-6">
                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">How to use</h2>
                    <ul className="text-white/90 list-disc list-inside space-y-1">
                        <li>Use the navigation bar to choose a section</li>
                        <li>Search or browse the list to find what you need</li>
                        <li>Open any item to see clear, organized details</li>
                    </ul>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-6 mt-8 grid md:grid-cols-2 gap-6">
                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">What’s inside</h2>
                    <p className="text-white/90">Clean pages for each category, quick search, and simple pagination so you can hop through the 
                    galaxy without getting lost.</p>
                </div>
                <div className="bg-[rgba(57,58,58,0.5)] outline outline-2 outline-yellow-400 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-2">Performance & privacy</h2>
                    <p className="text-white/90">Very fast: cached results, client-side rendering, lightweight UI, incremental fetching. You can refresh or clear the cache anytime below.</p>
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

            <footer className="max-w-6xl mx-auto px-6 py-12 text-yellow-200/70 text-sm text-center">
                Data from swapi.tech • Built with React + TypeScript
            </footer>
        </div>
    );}