import { useState, useEffect } from "react";
import React from 'react'
import axios from 'axios'
import classNamesModule from 'classnames'
import { AddGroceryItems } from "./AddGroceryItems"
const API_BASE_URL = "http://localhost:8080";
export const GrocerySection = () => {
    const [GroceryItems, setGroceryItems] = useState([]);

    async function fetchGroceryItems() {
        const groceryData = await axios.get(`${API_BASE_URL}/grocery/getAll`)
        console.log(groceryData.data.results);
        // const dataFromAPI = groceryData.data.results;
        setGroceryItems(groceryData.data.results);
        console.log(GroceryItems);
    }

    useEffect(() => {
        fetchGroceryItems();
        // eslint-disable-next-line
    }, []);

    async function handlePurchasedButton(item) {
        const updateData = await axios.put(`${API_BASE_URL}/grocery/updatePurchasedStatus`,
            {
                _id: item._id,
                isPurchased: true
            })
        console.log(updateData);
        // alert("Item updated successfully"); 
        fetchGroceryItems();
    }

    async function handleDeleteButton(item){
        const deleteResponse = await axios.delete(`${API_BASE_URL}/grocery/deleteGroceryItem`, {
            data: {
                _id: item._id
            }
        })
        console.log(deleteResponse);
        // alert("data deleted successfully");
        fetchGroceryItems();
    }

    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long' });;

    function renderGroceryItems() {
        return GroceryItems.map((item, index) => {
            return (
                <div key={index} className={classNamesModule("grocery-item d-flex", {
                    "purchased": item.isPurchased === true,
                })}>
                    <h2 className="ms-3">{item.groceryItem}</h2>
                    <div className="grocery-actions ml-auto">
                        {item.isPurchased === false &&
                            <button
                                onClick={() => handlePurchasedButton(item)}
                                className="complete-btn"
                                >
                                <i className="fas fa-check"></i>
                        </button>}
                        <button
                            onClick={() => handleDeleteButton(item)}
                            className="trash-btn">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            )
        })
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="mt-4" style={{ color: "#b34122"}}>Plan for the Month of {month}</h2>
            <AddGroceryItems 
                fetchGroceryItems={fetchGroceryItems}
                baseUrl={API_BASE_URL} />
            {renderGroceryItems()}
        </div>
    )
}
