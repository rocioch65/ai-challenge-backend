import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => {
    return (
        <header className="bg-yellow-300 px-4 py-3 shadow-md">
            <div className="max-w-6xl mx-auto flex items-center gap-6">
                {/* SearchBar centflex */}
                <div className="flex-1">
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>
        </header>
    );
};

export default Header;
