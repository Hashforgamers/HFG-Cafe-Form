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

      if (type === "number" && value !== undefined && value !== "") {
        if (isNaN(value) || value < 0) {
          setNestedValue(newErrors, name, `${label} must be a positive number`);
        }
      }

      if (type === "date" && value) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(value)) {
          setNestedValue(newErrors, name, "Invalid date format (YYYY-MM-DD)");
        }
      }

      if (type === "tel" && value) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(value)) {
          setNestedValue(newErrors, name, "Invalid phone number");
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
    const value = getNestedValue(formData, name) ?? (type === "checkbox" ? false : "");
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
            handleChange(
              name,
              type === "number" ? Number(e.target.value) : e.target.value
            )
          }
          InputLabelProps={{ style: { color: "#00f2ff", fontFamily: "'Orbitron', sans-serif" } }}
          InputProps={{ style: { color: "#fff", fontFamily: "'Orbitron', sans-serif" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ff00ff", boxShadow: "0 0 10px #ff00ff" },
              "&:hover fieldset": { borderColor: "#00f2ff", boxShadow: "0 0 15px #00f2ff" },
              "&.Mui-focused fieldset": { borderColor: "#39ff14", boxShadow: "0 0 20px #39ff14" },
              "&.Mui-error fieldset": { borderColor: "#ff4444", boxShadow: "0 0 10px #ff4444" },
            },
            "& .MuiFormHelperText-root": { color: "#ff4444", fontFamily: "'Orbitron', sans-serif" },
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
                color: "#ff00ff",
                "&.Mui-checked": { color: "#39ff14" },
                "&:hover": { color: "#00f2ff" },
              }}
            />
          }
          label={label}
          sx={{ color: "#fff", fontFamily: "'Orbitron', sans-serif" }}
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
        bgcolor: "#0a0a1a",
        minHeight: "100vh",
        width: "100%",
        py: { xs: 4, md: 8 },
        px: { xs: 3, md: 6 },
        overflowY: "auto",
        background: "linear-gradient(135deg, #0a0a1a, #1a1a3a)",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(57, 255, 20, 0.15), transparent 70%),
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M0 0 H100 M0 10 H100 M0 20 H100 M0 30 H100 M0 40 H100 M0 50 H100 M0 60 H100 M0 70 H100 M0 80 H100 M0 90 H100 M0 0 V100 M10 0 V100 M20 0 V100 M30 0 V100 M40 0 V100 M50 0 V100 M60 0 V100 M70 0 V100 M80 0 V100 M90 0 V100" stroke="rgba(0, 242, 255, 0.2)" stroke-width="0.5"/></svg>') repeat
          `,
          animation: "gridMove 20s linear infinite",
          zIndex: 0,
        },
        "&:after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.1), transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 242, 255, 0.1), transparent 50%)
          `,
          animation: "pulse 15s ease-in-out infinite",
          zIndex: 0,
        },
        "@keyframes gridMove": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "100px 100px" },
        },
        "@keyframes pulse": {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          color: "#fff",
          position: "relative",
          zIndex: 1,
          background: "rgba(10, 10, 26, 0.7)",
          borderRadius: 3,
          p: { xs: 2, md: 4 },
          boxShadow: "0 0 30px rgba(57, 255, 20, 0.3)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <img
            src="public/logo.png" // Replace with the path to your logo file
            alt="Gaming Cafe Logo"
            style={{
              maxWidth: "300px",
              height: "auto",
              filter: "drop-shadow(0 0 10px #39ff14)",
              animation: "glow 2s ease-in-out infinite alternate",
            }}
          />
        </Box>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            color: "#39ff14",
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700,
            mb: 6,
            textShadow: "0 0 15px #39ff14, 0 0 30px #00f2ff",
            animation: "glow 2s ease-in-out infinite alternate",
            "@keyframes glow": {
              from: { textShadow: "0 0 10px #39ff14, 0 0 20px #00f2ff" },
              to: { textShadow: "0 0 20px #39ff14, 0 0 40px #00f2ff" },
            },
          }}
        >
          Register Your Gaming Cafe
        </Typography>

        <form onSubmit={handleSubmit}>
          {fieldConfig.map((section, idx) => (
            <Box
              key={idx}
              sx={{
                background: "rgba(20, 20, 40, 0.85)",
                borderRadius: 2,
                p: 3,
                mb: 4,
                boxShadow: "0 0 15px rgba(0, 242, 255, 0.5)",
                border: "1px solid #ff00ff",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  my: 3,
                }}
              >
                <Box sx={{ flex: 1, height: "2px", background: "linear-gradient(to right, #ff00ff, #00f2ff)" }} />
                <Typography
                  variant="h6"
                  sx={{
                    color: "#00f2ff",
                    fontFamily: "'Orbitron', sans-serif",
                    fontWeight: 600,
                    textShadow: "0 0 10px #00f2ff",
                  }}
                >
                  {section.label.toUpperCase()}
                </Typography>
                <Box sx={{ flex: 1, height: "2px", background: "linear-gradient(to left, #ff00ff, #00f2ff)" }} />
              </Box>

              <Grid container spacing={3}>
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

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              type="submit"
              fullWidth
              sx={{
                bgcolor: "linear-gradient(45deg, #ff00ff, #00f2ff)",
                color: "#fff",
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                py: 1.5,
                fontSize: "1.2rem",
                borderRadius: 2,
                boxShadow: "0 0 15px #00f2ff, 0 0 30px #ff00ff",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "linear-gradient(45deg, #00f2ff, #ff00ff)",
                  boxShadow: "0 0 20px #39ff14, 0 0 40px #ff00ff",
                  transform: "scale(1.05)",
                },
              }}
            >
              LAUNCH REGISTRATION
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default CafeForm;