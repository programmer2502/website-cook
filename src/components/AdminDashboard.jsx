import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, LogOut, Pencil } from 'lucide-react';
import { getItems, createItem, updateItem, deleteItem } from '../utils/api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [newItem, setNewItem] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: ''
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }
        const fetchItems = async () => {
            try {
                const data = await getItems();
                setItems(data);
            } catch (error) {
                console.error("Failed to load items", error);
            }
        };
        fetchItems();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteItem(id);
                setItems(items.filter(i => i.id !== id));
            } catch (error) {
                console.error("Failed to delete item", error);
                alert("Failed to delete item");
            }
        }
    };

    const handleEdit = (item) => {
        setNewItem({
            name: item.name,
            price: item.price,
            category: item.category,
            description: item.description,
            image: item.image
        });
        setEditingId(item.id);
        setIsAdding(true);
    };

    const handleSaveItem = async (e) => {
        e.preventDefault();
        const itemData = {
            ...newItem,
            price: parseFloat(newItem.price)
        };

        try {
            if (editingId) {
                const updatedItem = await updateItem(editingId, itemData);
                setItems(items.map(item => item.id === editingId ? updatedItem : item));
            } else {
                const createdItem = await createItem(itemData);
                setItems([...items, createdItem]);
            }
            setIsAdding(false);
            setEditingId(null);
            setNewItem({ name: '', price: '', category: '', description: '', image: '' });
        } catch (error) {
            console.error("Failed to save item", error);
            alert("Failed to save item");
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <div className="flex justify-between items-center mb-4" style={{ marginBottom: '30px' }}>
                <h1 className="text-2xl">Menu Management</h1>
                <button onClick={handleLogout} className="btn btn-secondary text-danger">
                    <LogOut size={18} /> Logout
                </button>
            </div>

            <div className="card mb-4" style={{ marginBottom: '30px' }}>
                {!isAdding ? (
                    <button onClick={() => setIsAdding(true)} className="btn btn-primary w-full">
                        <Plus size={20} /> Add New Item
                    </button>
                ) : (
                    <form onSubmit={handleSaveItem} className="flex flex-col gap-4">
                        <h3 className="text-xl">{editingId ? 'Edit Item' : 'Add New Item'}</h3>
                        <div className="grid grid-2">
                            <input
                                className="input"
                                placeholder="Item Name"
                                required
                                value={newItem.name}
                                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            />
                            <input
                                className="input"
                                type="number"
                                step="0.01"
                                placeholder="Price"
                                required
                                value={newItem.price}
                                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
                            />
                            <input
                                className="input"
                                placeholder="Category (e.g., Burgers, Pizza)"
                                required
                                value={newItem.category}
                                onChange={e => setNewItem({ ...newItem, category: e.target.value })}
                            />
                            <input
                                className="input"
                                placeholder="Image URL"
                                required
                                value={newItem.image}
                                onChange={e => setNewItem({ ...newItem, image: e.target.value })}
                            />
                        </div>
                        <textarea
                            className="input"
                            placeholder="Description"
                            rows="3"
                            required
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        />
                        <div className="flex gap-2 justify-end">
                            <button type="button" onClick={() => {
                                setIsAdding(false);
                                setEditingId(null);
                                setNewItem({ name: '', price: '', category: '', description: '', image: '' });
                            }} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'Update Item' : 'Save Item'}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="grid grid-2">
                {items.map(item => (
                    <div key={item.id} className="card flex gap-4 items-center">
                        <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                            <p className="text-gray">{item.category}</p>
                            <p className="text-primary">₹{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="btn btn-secondary text-primary"
                                title="Edit Item"
                            >
                                <Pencil size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-secondary text-danger"
                                title="Delete Item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
