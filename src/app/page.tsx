'use client';
import { useState } from 'react';

interface Suggestion {
  title: string;
  body: string;
}

const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expanding, setExpanding] = useState<boolean>(false);

  const generateIdeas = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.ideas) {
        const ideaList = data.ideas.split('\n').filter(Boolean);
        setIdeas(ideaList);
      }
    } catch (error) {
      console.error('Error generating ideas:', error);
    }
    setLoading(false);
  };

  const toggleIdeaSelection = (idea: string) => {
    if (selectedIdeas.includes(idea)) {
      setSelectedIdeas(selectedIdeas.filter(i => i !== idea));
    } else if (selectedIdeas.length < 2) {
      setSelectedIdeas([...selectedIdeas, idea]);
    }
  };

  const expandIdeas = async () => {
    if (selectedIdeas.length !== 2) return;

    setExpanding(true);
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedIdeas }),
      });
      const data = await response.json();
      if (data.suggestions) {
        const suggestionList = data.suggestions.map((suggestion: string) => {
          const titleMatch = suggestion.match(/Idea \d+: (.+?)\*\*/);
          const title = titleMatch ? titleMatch[1] : `Idea`;
          const body = suggestion.replace(titleMatch?.[0] || '', '').trim();
          return { title, body };
        });
        setSuggestions(suggestionList);
      }
    } catch (error) {
      console.error('Error expanding ideas:', error);
    }
    setExpanding(false);
  };

  return (
    <main className="min-h-screen bg-fuchsia-900/30 p-8">
      <div className="flex flex-col gap-7 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center">Idea Generator</h1>

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
        

        {ideas.length > 0 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white">Select any of 2 ideas:</h2>
            <div className="space-y-3">
              {ideas.map((idea, index) => (
                <div
                  key={index}
                  onClick={() => toggleIdeaSelection(idea)}
                  className={`p-4 rounded-lg cursor-pointer transition-colors bg-yellow-200 text-black hover:bg-yellow-100 ${
                    selectedIdeas.includes(idea) ? 'bg-fuchsia-500/90' : ''
                  }`}
                >
                  {idea}
                </div>
              ))}
            </div>

            {selectedIdeas.length === 2 && suggestions.length === 0 && (
              <button
                onClick={expandIdeas}
                disabled={expanding}
                className="w-full bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 disabled:bg-green-300"
              >
                {expanding ? 'Getting Suggestions...' : 'Get Detailed Suggestions'}
              </button>
            )}

            {suggestions.length > 0 && (
              <div className="mt-8 bg-gray-700 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-white">Detailed Suggestions:</h2>
                <div className="space-y-6">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-md shadow">
                      <h3 className="text-lg font-bold text-yellow-400">{suggestion.title}</h3>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap mt-2">{suggestion.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
