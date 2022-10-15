
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const terms = ['Fall', 'Winter', 'Spring'];

    const TermButton = ({term, selection, setSelection}) => (
        <div>
          <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
            onChange={() => setSelection(term)} />
          <label className="btn btn-success mb-1 p-2" htmlFor={term}>
          { term }
          </label>
        </div>
      );
      
      const NextTerm = ({selection, setSelection}) => (
        <div className="btn-group">
          { 
            terms.map(term => <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />)
          }
        </div>
      );

      export const TermSelector = () => {
        const [selection, setSelection] = useState(() => Object.keys(terms)[0]);
        return (
          <div>
            <NextTerm selection={selection} setSelection={setSelection} />
          </div>
        );
      };