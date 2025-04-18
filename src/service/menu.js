import axiosInstance from "../api/axiosInstance";

export const getFeaturedItems = async (setFeaturedItems, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.get("/api/menu/featured");
    const data = res.data;
    setFeaturedItems(data);
  } catch (error) {
    console.error("Error fetching featured items:", error);
  } finally {
    setIsLoading(false);
  }
}

export const getMenuItems = async (setMenuItems, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.get("/api/menu");
    if (res.status !== 200) {
      throw new Error("Failed to fetch menu items");
    }
    const data = res.data;
    setMenuItems(data);
  } catch (error) {
    console.error("Error fetching menu items:", error);
  } finally {
    setIsLoading(false);
  }
}

export const addMenuItem = async (menuItem, setMessage, setError) => {
  try {
    const res = await axiosInstance.post("/api/menu", menuItem);
    if (res.status !== 201) {
      throw new Error("Failed to add menu item");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error adding menu item:", error);
    setError("Failed to add menu item. Please try again.");
  }
}

export const updateMenuItem = async (menuItemId, updatedData, setMessage, setError) => {
  try {
    const res = await axiosInstance.put(`/api/menu/${menuItemId}`, updatedData);
    if(res.status === 404 ){
      setError("Menu item not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error("Failed to update menu item");
    }
    setMessage(res.data.message);
    setError(null);
    return res.data.item;
  } catch (error) {
    console.error("Error updating menu item:", error);
    setError("Failed to update menu item. Please try again.");
  }
}

export const deleteMenuItem = async (menuItemId, setMessage, setError) => {
  try {
    const res = await axiosInstance.delete(`/api/menu/${menuItemId}`);
    if(res.status === 404 ){
      setError("Menu item not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error("Failed to delete menu item");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error deleting menu item:", error);
    setError("Failed to delete menu item. Please try again.");
  }
}