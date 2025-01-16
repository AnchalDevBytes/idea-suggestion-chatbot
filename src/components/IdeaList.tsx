import { Idea } from "@/app/page";

interface IdeaListProps {
  ideas: Idea[];
  selectedIdeas: string[];
  setSelectedIdeas: React.Dispatch<React.SetStateAction<string[]>>;
  fetchSuggestions: () => void;
}

const IdeaList: React.FC<IdeaListProps> = ({
  ideas,
  selectedIdeas,
  setSelectedIdeas,
  fetchSuggestions,
}) => {
  const toggleSelection = (id: string): void => {
    setSelectedIdeas((prev) =>
      prev.includes(id) ? prev.filter((ideaId) => ideaId !== id) : [...prev, id]
    );
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Generated Ideas</h2>
      <ul>
        {ideas.map((idea) => (
          <li
            key={idea.id}
            className={`border p-2 rounded mb-2 cursor-pointer ${
              selectedIdeas.includes(idea.id) ? 'bg-blue-100' : ''
            }`}
            onClick={() => toggleSelection(idea.id)}
          >
            {idea.title}
          </li>
        ))}
      </ul>
      {selectedIdeas.length > 0 && (
        <button
          onClick={fetchSuggestions}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
        >
          Get Suggestions
        </button>
      )}
    </div>
  );
};

export default IdeaList;
