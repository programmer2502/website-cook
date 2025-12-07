const API_URL = 'http://localhost:5000/api';

export const getItems = async () => {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
};

export const saveItem = async (item) => {
    // Determine if it's an update (has id and we are editing) or create
    // The backend uses POST for create and PUT for update/:id
    // But the frontend `saveItems` was generic.
    // We need to adapt.
    // However, looking at AdminDashboard, it calls `saveItems` with the WHOLE list.
    // This is inefficient for a backend.
    // We need to refactor AdminDashboard to call createItem or updateItem individually.
    // For now, I will provide generic methods.
};

export const createItem = async (item) => {
    const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to create item');
    return response.json();
};

export const updateItem = async (id, item) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    if (!response.ok) throw new Error('Failed to update item');
    return response.json();
};

export const deleteItem = async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete item');
    return response.json();
};

export const loginAdmin = async (password) => {
    const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data;
};
