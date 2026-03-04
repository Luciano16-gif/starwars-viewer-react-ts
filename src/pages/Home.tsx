import { useState, useEffect, useCallback } from 'react';
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

    const refreshStats = useCallback(() => {
        setCacheStats(cacheService.getStats());
    }, []);

    const clearCache = useCallback(() => {
        cacheService.clear();
        refreshStats();
    }, [refreshStats]);

    useEffect(() => {
        refreshStats();
    }, [refreshStats]);

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

            {/* Hero */}
            <header className="max-w-5xl mx-auto px-6 pt-8 pb-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-2">Star Wars Explorer</h1>
                <div className="h-1 w-20 bg-yellow-400 rounded mx-auto mb-4" />
                <p className="text-yellow-100/70 max-w-2xl mx-auto leading-relaxed">
                    This app lets anyone quickly look up Star Wars people, planets, films, starships, vehicles, and species.
                    It fetches live data and keeps recent results cached so pages load fast even on slow connections.
                </p>
            </header>

            {/* Content — 3 cards in one row on desktop */}
            <section className="max-w-5xl mx-auto px-6 pb-4">
                <div className="grid md:grid-cols-3 gap-5 h-full">
                    {/* How to use */}
                    <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-5 border-2 border-yellow-400/10 flex flex-col">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">How to use</h2>
                        <ul className="text-gray-100 space-y-3 flex-1">
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400/50 font-semibold">1.</span>
                                <span>Use the navigation bar to choose a section</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400/50 font-semibold">2.</span>
                                <span>Search or browse the list to find what you need</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-yellow-400/50 font-semibold">3.</span>
                                <span>Open any item to see clear, organized details</span>
                            </li>
                        </ul>
                    </div>

                    {/* What's inside */}
                    <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-5 border-2 border-yellow-400/10 flex flex-col">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">What's inside</h2>
                        <p className="text-gray-100/80 leading-relaxed flex-1">
                            Clean pages for each category, quick search, and simple pagination so you
                            can hop through the galaxy without getting lost.
                        </p>
                    </div>

                    {/* Performance & privacy */}
                    <div className="bg-[rgba(57,58,58,0.3)] rounded-lg p-5 border-2 border-yellow-400/10 flex flex-col">
                        <h2 className="text-xl font-bold text-yellow-400 mb-3">Performance & privacy</h2>
                        <p className="text-gray-100/80 leading-relaxed">
                            Very fast: cached results, client-side rendering, lightweight UI, incremental fetching. You can
                            refresh or clear the cache anytime below.
                        </p>
                        <div className="mt-3 space-y-1 text-sm">
                            <div className="flex items-baseline gap-2">
                                <span className="text-yellow-400/70 font-semibold">Memory Entries</span>
                                <span className="text-gray-100">{cacheStats.memoryEntries}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-yellow-400/70 font-semibold">LocalStorage Entries</span>
                                <span className="text-gray-100">{cacheStats.localStorageEntries}</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-yellow-400/70 font-semibold">Total Size</span>
                                <span className="text-gray-100">{cacheStats.sizeInMB} MB</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-yellow-400/70 font-semibold">Storage Used</span>
                                <span className="text-gray-100">{cacheStats.percentUsed}%</span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={refreshStats}
                                className="px-3 py-1.5 bg-[rgba(57,58,58,0.5)] text-yellow-400 font-semibold text-sm rounded-lg
                                border-2 border-yellow-400/20 hover:border-yellow-400/40 hover:bg-yellow-400/5
                                transition-all duration-200"
                            >
                                Refresh Stats
                            </button>
                            <button
                                onClick={clearCache}
                                className="px-3 py-1.5 bg-red-900/30 text-red-400 font-semibold text-sm rounded-lg
                                border-2 border-red-400/20 hover:border-red-400/40 hover:bg-red-400/10
                                transition-all duration-200"
                            >
                                Clear Cache
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="max-w-5xl mx-auto px-6 py-4 text-yellow-200/40 text-sm text-center">
                Data from swapi.tech &bull; Built with React + TypeScript
            </footer>
        </div>
    );
}