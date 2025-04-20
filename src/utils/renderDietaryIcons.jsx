export const dietaryOptions = [
  'vegetarian',
  'vegan',
  'non-vegetarian',
  'eggetarian',
  'pescatarian',
  'gluten-free',
  'dairy-free',
  'nut-free',
  'egg-free',
  'halal',
  'kosher',
  'keto',
  'paleo',
  'low-carb'
]

const dietaryConfig = {
  'vegetarian': { bg: 'bg-green-100', text: 'text-green-800', abbr: 'Veg' },
  'vegan': { bg: 'bg-teal-100', text: 'text-teal-800', abbr: 'V' },
  'non-vegetarian': { bg: 'bg-red-100', text: 'text-red-800', abbr: 'Non-Veg' },
  'eggetarian': { bg: 'bg-yellow-100', text: 'text-yellow-800', abbr: 'Egg' },
  'pescatarian': { bg: 'bg-blue-100', text: 'text-blue-800', abbr: 'Pesc' },
  'gluten-free': { bg: 'bg-purple-100', text: 'text-purple-800', abbr: 'GF' },
  'dairy-free': { bg: 'bg-indigo-100', text: 'text-indigo-800', abbr: 'DF' },
  'nut-free': { bg: 'bg-amber-100', text: 'text-amber-800', abbr: 'NF' },
  'egg-free': { bg: 'bg-lime-100', text: 'text-lime-800', abbr: 'EF' },
  'halal': { bg: 'bg-emerald-100', text: 'text-emerald-800', abbr: 'H' },
  'kosher': { bg: 'bg-sky-100', text: 'text-sky-800', abbr: 'K' },
  'keto': { bg: 'bg-violet-100', text: 'text-violet-800', abbr: 'Keto' },
  'paleo': { bg: 'bg-orange-100', text: 'text-orange-800', abbr: 'P' },
  'low-carb': { bg: 'bg-rose-100', text: 'text-rose-800', abbr: 'LC' }
};

export const renderDietaryIcons = (dietary) => {
  if (!dietary || dietary.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {dietary.map((diet) => {
        const config = dietaryConfig[diet] || { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800', 
          abbr: diet.substring(0, 2).toUpperCase() 
        };
        
        return (
          <span 
            key={diet}
            title={diet.charAt(0).toUpperCase() + diet.slice(1)} 
            className={`${config.bg} ${config.text} text-xs px-2 py-0.5 rounded-full`}
          >
            {config.abbr}
          </span>
        );
      })}
    </div>
  );
};

// For rendering a full badge with the complete name
export const renderDietaryBadges = (dietary) => {
  if (!dietary || dietary.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {dietary.map((diet) => {
        const config = dietaryConfig[diet] || { 
          bg: 'bg-gray-100', 
          text: 'text-gray-800'
        };
        
        return (
          <span 
            key={diet}
            className={`${config.bg} ${config.text} text-xs px-2 py-0.5 rounded-full capitalize`}
          >
            {diet}
          </span>
        );
      })}
    </div>
  );
};