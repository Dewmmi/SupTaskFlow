import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./styles/BoardDetails.css";

function BoardDetails() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [newColTitle, setNewColTitle] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [editData, setEditData] = useState({
    description: "",
    duedate: "",
    labels: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:1337/api/boards/${id}?populate[columns][populate]=cards`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setBoard(data.data);
      })
      .catch(err => console.error(err));
  }, [id, token]);

  function addColumn() {

    if (!newColTitle) return;

    fetch("http://localhost:1337/api/columns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          title: newColTitle,
          board: { connect: [board.id] }
        }
      })
    }).then(() => {
      setNewColTitle("");
      window.location.reload();
    });
  }

  function renameColumn(colId) {

    const name = prompt("New column name:");
    if (!name) return;

    fetch(`http://localhost:1337/api/columns/${colId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: { title: name }
      })
    }).then(() => window.location.reload());
  }

  function deleteColumn(colId) {

    if (!window.confirm("Delete column?")) return;

    fetch(`http://localhost:1337/api/columns/${colId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => window.location.reload());
  }

  function addCard(colId) {

    const title = prompt("Card Title:");
    if (!title) return;

    fetch("http://localhost:1337/api/cards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: {
          title: title,
          column: { connect: [colId] }
        }
      })
    }).then(() => window.location.reload());
  }

  function saveCard() {

    fetch(`http://localhost:1337/api/cards/${selectedCard.documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        data: editData
      })
    }).then(() => {
      setSelectedCard(null);
      window.location.reload();
    });
  }

  function deleteCard(cardId) {

    if (!window.confirm("Delete card?")) return;

    fetch(`http://localhost:1337/api/cards/${cardId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setSelectedCard(null);
      window.location.reload();
    });
  }

  if (!board) return <h1>Loading...</h1>;

  return (
    <div className={darkMode ? "background-details dark-mode" : "background-details"}>
      <h1 className="detail-h1">{board.title}</h1>
      <hr />
      <div className="add-column">

        <input
          className="column-input"
          value={newColTitle}
          onChange={e => setNewColTitle(e.target.value)}
          placeholder="Column title"/>

        <button
          className="button-add-column"
          onClick={addColumn}>
          Add Column
        </button>

        <button className="dark-toggle-about"
          onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      <div className="columns-grid">
        {board.columns?.map(col => (
          <div key={col.id} className="column-box">
            <div className="column-header">

              <h2
                className="fix-h2-details"
                onClick={() => renameColumn(col.documentId)}>
                {col.title} 🖊
              </h2>

              <button
                className="delete-column"
                onClick={() => deleteColumn(col.documentId)}>
                Delete
              </button>
            </div>

            <div className="card-list-detail">

              {col.cards?.map(card => (
                <div
                  key={card.id}
                  className="card-name-detail"
                  onClick={() => {

                    setSelectedCard(card);

                    setEditData({
                      description: card.description || "",
                      duedate: card.duedate || "",
                      labels: card.labels || ""
                    });}}>

                  <p>{card.title}</p>

                  {card.labels &&
                    <span className="view-labels">
                      {card.labels}
                    </span>
                  }

                  {card.duedate &&
                    <span className="view-date"> {card.duedate}</span>}
                </div>
              ))}
            </div>

            <button
              className="button-add-card"onClick={() => addCard(col.id)}>                         
              Add Card
            </button>
          </div>
        ))}
      </div>

      {selectedCard && (

        <div className="edit-card">
          <div className="detail-edit">
            <h2>Edit {selectedCard.title}</h2>

            <div className="details-details">
              <label className="title-description">Description</label>

              <textarea className="details-description"
                value={editData.description}onChange={e =>setEditData({...editData,description: e.target.value })}/>
                                                                                 
              <label className="title-dueDate">Due Date</label>
              <input type="date" className="details-date" value={editData.duedate} onChange={e => setEditData({ ...editData, duedate: e.target.value})}/>
              <label className="title-labels">Labels</label>

              <input className="details-label"
                value={editData.labels}
                onChange={e =>
                  setEditData({...editData, labels: e.target.value})}/>
            </div>

            <div className="button-edit-details">
              <button
                className="save-details"
                onClick={saveCard}>
                Save
              </button>

              <button
                className="delete-details"
                onClick={() => deleteCard(selectedCard.documentId)}>
                Delete
              </button>

              <button
                className="cancel-details"
                onClick={() => setSelectedCard(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardDetails;