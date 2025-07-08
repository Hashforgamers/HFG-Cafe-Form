import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { fieldConfig } from "./fieldConfig";

// Helper functions
const getNestedValue = (obj, path) =>
  path.split(".").reduce((o, key) => o?.[key], obj);

const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((o, k) => (o[k] ??= {}), obj);
  target[lastKey] = value;
};

const CafeForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const updated = { ...prev };
      setNestedValue(updated, name, value);
      return updated;
    });
  };

  const validate = () => {
    const newErrors = {};

    const validateField = (field) => {
      const { name, required, type, label } = field;
      const value = getNestedValue(formData, name);

      if (required && (value === undefined || value === "" || value === false)) {
        setNestedValue(newErrors, name, `${label} is required`);
        return;
      }

      if (type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setNestedValue(newErrors, name, "Invalid email format");
        }
      }

      if (type === "number" && value !== undefined) {
        if (isNaN(value) || value < 0) {
          setNestedValue(newErrors, name, `${label} must be a positive number`);
        }
      }
    };

    fieldConfig.forEach((field) => {
      if (field.type === "section") {
        field.fields.forEach(validateField);
      } else {
        validateField(field);
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderField = (field) => {
    const { type, name, label, required } = field;
    const value = getNestedValue(formData, name) ?? "";
    const error = getNestedValue(errors, name);

    if (["text", "email", "tel", "number", "date"].includes(type)) {
      return (
        <TextField
          fullWidth
          type={type}
          label={label}
          value={value}
          required={required}
          error={!!error}
          helperText={error || ""}
          onChange={(e) =>
            handleChange(name, type === "number" ? Number(e.target.value) : e.target.value)
          }
          InputLabelProps={{ style: { color: "#ccc" } }}
          InputProps={{ style: { color: "#fff" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#5f8758",
              },
              "&:hover fieldset": {
                borderColor: "#88aa82",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#a7d89c",
              },
            },
          }}
        />
      );
    }

    if (type === "checkbox") {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={!!value}
              onChange={(e) => handleChange(name, e.target.checked)}
              sx={{
                color: "#a7d89c",
                "&.Mui-checked": {
                  color: "#a7d89c",
                },
              }}
            />
          }
          label={label}
          sx={{ color: "#eee" }}
        />
      );
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Submitted data:", formData);
      alert("Form submitted!");
    } else {
      console.warn("❌ Validation errors:", errors);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#013220", // Full page dark forest green background
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 4,
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",  // full width
          maxWidth: 900,  // max width for large screens
          maxHeight: "90vh",
          overflowY: "auto",
          px: 4,
          py: 4,
          bgcolor: "#154734",   // Slightly lighter green container
          borderRadius: 2,
          boxShadow: 5,
          color: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#a7d89c" }}>
          🎮 Register Your Gaming Cafe
        </Typography>

        <form onSubmit={handleSubmit}>
          {fieldConfig.map((section, idx) => (
            <Box key={idx} sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#a7d89c" }}>
                {section.label}
              </Typography>

              <Grid container spacing={2}>
                {section.fields.map((field) => (
                  <Grid item xs={12} sm={6} md={4} key={field.name}>
                    {renderField(field)}
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Box sx={{ mt: 5 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#a7d89c",
                color: "#013220",
                fontWeight: "bold",
                "&:hover": {
                  bgcolor: "#c4efb6",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CafeForm;
