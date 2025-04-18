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

export const createBanner = async (bannerData, setBanners, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.post("/api/banners", bannerData);
    if (res.status !== 201) {
      throw new Error("Failed to create banner");
    }
    const newBanner = res.data;
    setBanners((prevBanners) => [...prevBanners, newBanner]);
  } catch (error) {
    console.error("Error creating banner:", error);
  } finally {
    setIsLoading(false);
  }
}

export const updateBanner = async (bannerId, updatedData, setBanners, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.put(`/api/banners/${bannerId}`, updatedData);
    if (res.status !== 200) {
      throw new Error("Failed to update banner");
    }
    const updatedBanner = res.data;
    setBanners((prevBanners) =>
      prevBanners.map((banner) => (banner.id === bannerId ? updatedBanner : banner))
    );
  } catch (error) {
    console.error("Error updating banner:", error);
  } finally {
    setIsLoading(false);
  }
}

export const deleteBanner = async (bannerId, setBanners, setIsLoading) => {
  try {
    setIsLoading(true);
    const res = await axiosInstance.delete(`/api/banners/${bannerId}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete banner");
    }
    setBanners((prevBanners) => prevBanners.filter((banner) => banner.id !== bannerId));
  } catch (error) {
    console.error("Error deleting banner:", error);
  } finally {
    setIsLoading(false);
  }
}

