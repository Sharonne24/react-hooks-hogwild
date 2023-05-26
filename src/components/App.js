import React, { useState } from 'react';
import hogs from '../porkers_data';

function App() {
  const [greasedOnly, setGreasedOnly] = useState(false);
  const [sortBy, setSortBy] = useState(null);

  const toggleGreasedOnly = () => {
    setGreasedOnly(!greasedOnly);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const filteredHogs = hogs.filter((hog) => {
    return !greasedOnly || hog.greased;
  });

  const sortedHogs = filteredHogs.sort((hogA, hogB) => {
    if (sortBy === 'name') {
      return hogA.name.localeCompare(hogB.name);
    } else if (sortBy === 'weight') {
      return hogA.weight - hogB.weight;
    }
    return 0;
  });

  return (
    <div className="ui grid container">
      <div className="row">
        <div className="column">
          <div>
            <label>
              <input
                type="checkbox"
                checked={greasedOnly}
                onChange={toggleGreasedOnly}
              />
              Greased Only
            </label>
          </div>
        </div>
      </div>

	  <div className="row">
        <div className="column">
          <div>
            <label>
              Sort By:
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        {sortedHogs.map((hog) => (
          <div className="ui eight wide column" key={hog.name}>
            <h3>{hog.name}</h3>
            <img src={hog.image} alt={hog.name} />
            <p>Specialty: {hog.specialty}</p>
            <p>Weight: {hog.weight}</p>
            <p>Greased: {hog.greased ? 'Yes' : 'No'}</p>
            <p>Highest Medal Achieved: {hog['highest medal achieved']}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
