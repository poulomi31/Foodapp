import { useState } from 'react'
import axios from 'axios'
import React from 'react'

export const AddGroceryItems = ({ baseUrl, fetchGroceryItems }) => {
  const [groceryInputText, setGroceryInputText] = useState("");

  async function handleButtonClick() {
    const createTask = await axios.post(`${baseUrl}/grocery/add`, {
      groceryItem: groceryInputText,
      isPurchased: false,
    });
    console.log(createTask);
    // alert("Item added successfully");
    setGroceryInputText("");
    fetchGroceryItems();
  }
  return (
    <div className="w-50 mt-2">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Grocery Item"
          aria-label="Grocery Item"
          aria-describedby="basic-addon2"
          onChange={(e) => setGroceryInputText(e.target.value)}
          value={groceryInputText}
        />
        <div className="input-group-append">
          <button
            onClick={handleButtonClick}
            className="custom-button"
            id="basic-addon2">Add Grocery Item</button>
        </div>
      </div>
    </div>
  )
}
