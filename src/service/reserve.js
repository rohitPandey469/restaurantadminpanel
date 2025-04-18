import axiosInstance from "../api/axiosInstance";

// Any one
export const createReservation = async (formData, setFormData, setErrors, setTouched, setSubmitMessage, setIsSubmitting) => {
    try {
        const res = await axiosInstance.post("/api/reservations/book", formData);
        if(res.status == 400){
            setSubmitMessage({
                type: "error",
                text: res.data.error || "Reservation already done."
            });
        } else if(res.status == 201){
            setSubmitMessage({
                type: "success",
                text: "Reservation request submitted! We'll confirm your booking shortly."
            });
        }
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          time: "",
          guests: 2,
          occasion: "",
          specialRequests: ""
        });
        setErrors({});
        setTouched({});
        
      } catch (error) {
        console.error('Reservation error:', error);
        setSubmitMessage({
          type: "error",
          text: error.message || "Something went wrong. Please try again or contact us directly."
        });
      } finally {
        setIsSubmitting(false);
      }
}

// For admin
export const getReservations = async (setReservations, setIsLoading) => {
  setIsLoading(true);
  try{
    const res = await axiosInstance.get("/api/reservations/all");
    setReservations(res.data);
  }catch (error) {
    console.error('Error fetching reservations:', error);
  }
  finally {
    setIsLoading(false)
  }
}

export const updateReservation = async (reservationId, formData, setFormData, setErrors, setTouched, setSubmitMessage, setIsSubmitting) => {}

export const updateReservationStatus = async (reservationId, status, setIsLoading, setError) => {
  setIsLoading(true);
  try{
    const res = await axiosInstance.post(`/api/reservations/update-status`, { reservationId, status });
    if(res.status == 400){
      setError(res.data.error);
      return false;
    } else if(res.status == 404){
      setError(res.data.error)
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error updating reservation status:', error);
    setError(error || "Something went wrong. Please try again or contact us directly.");
    return false;
  }
  finally {
    setIsLoading(false)
  }
}