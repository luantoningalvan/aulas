import { useState } from "react";
import formatDate from "./utils/formatDate";
import "./App.css";
const Diff = require("diff");

function App() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState([]);

  const handleEdit = () => {
    const diff = Diff.diffChars(
      history.length > 0 ? history[0].text : "",
      text
    );

    console.log(diff);

    const date = new Date();
    setHistory([{ date: date.getTime(), diff: diff, text: text }, ...history]);
  };

  const getDiffCount = (diff) => {
    return diff.reduce(
      (prev, current) => {
        if (current.added) {
          return { removed: prev.removed, added: prev.added + current.count };
        }

        if (current.removed) {
          return { removed: prev.removed + current.count, added: prev.added };
        }

        return prev;
      },
      { added: 0, removed: 0 }
    );
  };

  return (
    <div className="container">
      <form action="">
        <textarea
          name="texto"
          placeholder="Insira o texto"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" onClick={handleEdit}>
          Modificar
        </button>
      </form>

      <h3>Histórico de edições</h3>
      {history.map((change) => (
        <div className="change" key={change.date}>
          <span className="date">{formatDate(change.date)}</span>
          <div>
            {change.diff.map((part) => (
              <span
                className={
                  part.added || part.removed
                    ? part.added
                      ? "added"
                      : "removed"
                    : ""
                }
              >
                {part.value}
              </span>
            ))}
          </div>

          <div className="count">
            <span className="added">+ {getDiffCount(change.diff).added}</span>
            <span className="removed">
              - {getDiffCount(change.diff).removed}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
