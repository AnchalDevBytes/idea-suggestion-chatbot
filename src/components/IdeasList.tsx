import { Suggestion } from "@/app/page";
import SuggestionsList from "@/components/SuggestionsList";

interface IdeasListInterface {
    ideas : string[]; 
    selectedIdeas : string[]
    toggleIdeaSelection : (idea: string) => void;
    expandIdeas : () => Promise<void>;
    expanding : boolean;
    suggestions : Suggestion[]
}

const IdeasList = ({ 
    ideas, 
    selectedIdeas, 
    toggleIdeaSelection, 
    expandIdeas, 
    expanding, 
    suggestions 
} : IdeasListInterface) => {

return (
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-white">
            Select any of 2 ideas:
        </h2>
        <div className="space-y-3">
            {ideas.map((idea, index) => (
                <div
                    key={index}
                    onClick={() => toggleIdeaSelection(idea)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors bg-yellow-200 text-black hover:bg-yellow-100 ${
                        selectedIdeas.includes(idea) ? 'border-2 border-red-400' : ''
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

        {suggestions.length > 0 && <SuggestionsList suggestions={suggestions} />}
    </div>
)
};

export default IdeasList;
