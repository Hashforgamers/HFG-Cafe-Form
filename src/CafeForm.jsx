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
import { fieldConfig } from "./fieldConfig"; // Make sure it's updated per below

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

    fieldConfig.forEach((section) => {
      section.fields.forEach(validateField);
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderField = (field) => {
    const { type, name, label, required } = field;
    const value = getNestedValue(formData, name) ?? "";
    const error = getNestedValue(errors, name);

    if (["text", "email", "tel", "number"].includes(type)) {
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
      bgcolor: "#0f1c13",
      minHeight: "100vh",
      width: "100%",
      py: { xs: 3, md: 6 },
      px: { xs: 2, md: 6 },
      overflowY: "auto",
    }}
  >
    <Box
      sx={{
        maxWidth: "1400px",
        mx: "auto",
        color: "#fff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: "#fff", fontWeight: "bold", mb: 4 }}
      >
        Register Your Cafe
      </Typography>

      <form onSubmit={handleSubmit}>
        {fieldConfig.map((section, idx) => (
          <Box key={idx}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                my: 3,
              }}
            >
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#555" }} />
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#ccc",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                {section.label.toUpperCase()}
              </Typography>
              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#555" }} />
            </Box>

            <Grid container spacing={2}>
              {section.fields.map((field) => (
                <Grid
                  item
                  xs={12}
                  sm={field.fullWidth ? 12 : 6}
                  md={field.fullWidth ? 12 : 4}
                  key={field.name}
                >
                  {renderField(field)}
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Box sx={{ mt: 5 }}>
          <Button
            type="submit"
            fullWidth
            sx={{
              bgcolor: "#fff",
              color: "#154734",
              fontWeight: "bold",
              py: 1.4,
              fontSize: "1rem",
              "&:hover": {
                bgcolor: "#e0e0e0",
              },
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </form>
    </Box>
  </Box>
);
  };

export default CafeForm;
