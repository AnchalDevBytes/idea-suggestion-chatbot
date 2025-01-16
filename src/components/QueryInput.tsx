import React, { Dispatch, SetStateAction } from 'react'

interface QueryInputInterface {
    query : string;
    setQuery : Dispatch<SetStateAction<string>>
    loading : boolean;
    generateIdeas : () => Promise<void>;
}

const QueryInput = ({ 
    query, 
    setQuery, 
    loading, 
    generateIdeas 
} : QueryInputInterface ) => {

return (
    <div className="flex flex-col gap-4">
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What kind of app are you looking to build?"
            className="w-full p-4 rounded-lg border text-fuchsia-900 font-medium border-fuchsia-300"
        />
        <button
            onClick={generateIdeas}
            disabled={loading || !query.trim()}
            className="w-full bg-fuchsia-700/60 text-white p-4 rounded-lg hover:bg-fuchsia-600/20 disabled:bg-fuchsia-300"
        >
            {loading ? 'Generating Ideas...' : 'Generate App Ideas'}
        </button>
</div>
)
}

export default QueryInput;
