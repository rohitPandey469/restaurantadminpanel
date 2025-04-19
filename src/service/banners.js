import axiosInstance from "../api/axiosInstance";

export const getAllBanners = async (setBanners, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.get("/api/banners");
    if (res.status !== 200) {
      throw new Error("Failed to fetch banners");
    }
    const data = res.data;
    setBanners(data);
  } catch (error) {
    console.error("Error fetching banners:", error);
  } finally {
    setIsLoading(false);
  }
}

export const getActiveBanners = async (setActiveBanners, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.get("/api/banners/active");
    if (res.status !== 200) {
      throw new Error("Failed to fetch active banners");
    }
    const data = res.data;
    setActiveBanners(data);
  } catch (error) {
    console.error("Error fetching active banners:", error);
  } finally {
    setIsLoading(false);
  }
}

export const createBanner = async (bannerData, setMessage, setError) => {
  try {
    const res = await axiosInstance.post("/api/banners", bannerData);
    if (res.status !== 201) {
      throw new Error("Failed to create banner");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error creating banner:", error);
    setError("Failed to create banner. Please try again.");
  }
}

export const updateBanner = async (bannerId, updatedData, setMessage, setError) => {
  try {
    const res = await axiosInstance.put(`/api/banners/${bannerId}`, updatedData);
    if(res.status === 404 ){
      setError("Banner not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error("Failed to update banner");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error updating banner:", error);
    setError("Failed to update banner. Please try again.");
  }
}

export const deleteBanner = async (bannerId, setMessage, setError) => {
  try {
    const res = await axiosInstance.delete(`/api/banners/${bannerId}`);
    if(res.status === 404 ){
      setError("Banner not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error("Failed to delete banner");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error deleting banner:", error);
    setError("Failed to delete banner. Please try again.");
  }
}

export const toggleBannerState = async (bannerId, setMessage, setError) => {
  try {
    const res = await axiosInstance.patch(`/api/banners/toggle/${bannerId}`);
    if(res.status === 404 ){
      setError("Banner not found");
      return;
    }
    if (res.status !== 200) {
      throw new Error("Failed to toggle banner state");
    }
    setMessage(res.data.message);
    setError(null);
  } catch (error) {
    console.error("Error toggling banner state:", error);
    setError("Failed to toggle banner state. Please try again.");
  }
}

