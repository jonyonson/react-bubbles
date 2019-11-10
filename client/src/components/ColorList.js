import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('http://localhost:5000/api/colors', colorToAdd)
      .then((res) => {
        updateColors(res.data);
        setColorToAdd(initialColor);
      })
      .catch((err) => console.log(err));
  };

  const saveEdit = (e) => {
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        const updatedColors = colors.map((color) =>
          color.id === res.data.id ? colorToEdit : color
        );
        updateColors(updatedColors);
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        updateColors(colors.filter((col) => col.id !== res.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.id} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* ================================================ */}
      {/* stretch - build another form here to add a color */}
      {/* ================================================ */}

      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            value={colorToAdd.color}
            onChange={(e) =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
          />
        </label>
        <label>
          hex code:
          <input
            value={colorToAdd.code.hex}
            onChange={(e) =>
              setColorToAdd({ ...colorToAdd, code: { hex: e.target.value } })
            }
          />
        </label>
        <div className="button-row">
          <button type="submit">add</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setColorToAdd(initialColor);
            }}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
