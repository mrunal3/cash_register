import React from "react";
import "./App.css";
import { useState } from "react";

export default function App() {
  const initialState = {
    bill: "",
    cash: "",
    notes: {
      2000: "",
      500: "",
      100: "",
      20: "",
      10: "",
      5: "",
      1: "",
    },
  };
  const [localState, setLocalState] = useState({ ...initialState });
  const [error, setError] = useState(false);

  const changeCalculator = () => {
    let returnAmount = Number(localState.cash) - Number(localState.bill);
    let notes = {};
    Object.keys(localState.notes)
      .sort((a, b) => b - a)
      .forEach((note) => {
        const numberOfNotes = Math.trunc(returnAmount / Number(note));
        if (numberOfNotes > 0) {
          notes[note] = numberOfNotes;
        } else {
          notes[note] = "";
        }
        returnAmount = Number(returnAmount % note);
      });
    setLocalState({ ...localState, notes: notes });
  };

  const validate = () => {
    if (Number(localState.bill) > Number(localState.cash)) {
      displayErrorMessage();
    } else {
      changeCalculator();
    }
  };

  const displayErrorMessage = () => {
    setError(true);
  };

  const hideErrorMessage = () => {
    setError(false);
  };

  return (
    <div className="container">
      <h1 className="heading">Cash Register Manager</h1>
      <p className="description">
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <label className="input-label" htmlFor="bill-amount">
        Bill Amount:
      </label>
      <input
        className="input"
        id="bill-amount"
        type="number"
        value={localState.bill || ""}
        onChange={(e) => {
          hideErrorMessage();
          setLocalState({ ...localState, bill: e.target.value });
        }}
      />
      <p
        className={
          localState.bill === "" || localState.bill > 0 ? "hide" : "error"
        }
      >
        Invalid Bill Amount
      </p>

      <label className="input-label" htmlFor="cash-given">
        Cash Given:
      </label>
      <input
        className="input"
        id="cash-given"
        type="number"
        value={localState.cash || ""}
        disabled={localState.bill && localState.bill > 0 ? false : true}
        style={{ marginBottom: "10px" }}
        onChange={(e) => {
          hideErrorMessage();
          setLocalState({ ...localState, cash: e.target.value });
        }}
      />

      <p
        className={
          localState.cash === "" || localState.cash > 0 ? "hide" : "error"
        }
      >
        Invalid Cash Amount
      </p>

      <button
        id="check-button"
        className={
          localState.cash > 0 && localState.bill > 0 ? "enabled" : "disabled"
        }
        disabled={localState.cash > 0 && localState.bill > 0 ? false : true}
        onClick={() => {
          validate();
        }}
      >
        Check
      </button>

      <p className={error ? "error" : "hide"}>
        Your cash amount is less than bill amount
      </p>

      <table className="change-table">
        <caption>Return Change</caption>
        <tbody>
          <tr>
            <th>No of Notes</th>
            {Object.keys(localState.notes)
              .sort((a, b) => b - a)
              .map((note) => (
                <td
                  key={`${note}-${localState.notes[note]}`}
                  className="no-of-notes"
                >
                  {localState.notes[note]}
                </td>
              ))}
          </tr>
          <tr>
            <th>Note</th>
            {Object.keys(localState.notes)
              .sort((a, b) => b - a)
              .map((note) => (
                <td key={note}>{note}</td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
