'use client';
import IdeasList from '@/components/IdeasList';
import QueryInput from '@/components/QueryInput';
import { useState } from 'react';

export interface Suggestion {
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
        <QueryInput
          query={query}
          setQuery={setQuery}
          loading={loading}
          generateIdeas={generateIdeas}
        />
        {ideas.length > 0 && (
          <IdeasList
            ideas={ideas}
            selectedIdeas={selectedIdeas}
            toggleIdeaSelection={toggleIdeaSelection}
            expandIdeas={expandIdeas}
            expanding={expanding}
            suggestions={suggestions}
          />
        )} 
      </div>
    </main>
  );
};

export default Home;
