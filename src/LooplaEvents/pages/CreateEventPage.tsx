import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


type FormData = {
  title: string;
  description: string;
  date: string;
  location: string;
};


const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Type-safe handleChange
  const handleChange = <K extends keyof FormData>(field: K, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log('this cehck', this)

  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    const emojiRegex = /\p{Emoji}$/u;

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (!emojiRegex.test(formData.title.trim())) {
      newErrors.title = "Title must end with an emoji";
    }
    if (!formData.date || isNaN(Date.parse(formData.date)))
      newErrors.date = "Valid date is required";
    if (!formData.location.trim())
      newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      formData.location = formData.location.toUpperCase();
      await axios.post("/api/events", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Form submitted successfully!");
      setFormData({ title: "", description: "", date: "", location: "" });
      setErrors({});
      // Retrieve existing events
      const existing = localStorage.getItem("events");
      const events: FormData[] = existing ? JSON.parse(existing) : [];

      // Add new event
      events.push(formData);

      // Save back to localStorage
      localStorage.setItem("events", JSON.stringify(events));

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <Box
      maxWidth={500}
      mx="auto"
      mt={5}
      p={4}
      borderRadius={2}
      boxShadow={3}
      bgcolor="background.paper"
    >
      <Typography variant="h5" mb={3} fontWeight="bold">
        Create Event
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
          placeholder="Event Title 🌟"
        />

        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          margin="normal"
          multiline
          rows={4}
          error={!!errors.description}
          helperText={errors.description}
          placeholder="Event Description"
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          margin="normal"
          error={!!errors.date}
          helperText={errors.date}
        />

        <TextField
          fullWidth
          label="Location"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          margin="normal"
          error={!!errors.location}
          helperText={errors.location}
          placeholder="Event Location"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default EventForm;
