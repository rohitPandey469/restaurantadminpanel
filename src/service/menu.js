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