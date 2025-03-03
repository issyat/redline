import React, { useState } from "react";
import {
  Box,
  Divider,
  Grid2 as Grid,
  Typography,
  TextField,
  Button,
  Modal,
  Fade,
} from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [openModal, setOpenModal] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpenModal(true); // Open modal to display entered data
  };

  // Close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      {/* Header */}
      <Grid container display="flex" alignItems="center" spacing={2}>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: "tomato", width: 10, height: "auto" }}
        />
        <Typography
          variant="h6"
          sx={{ p: 2, fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" } }}
        >
          Contact Us
        </Typography>
      </Grid>

      {/* Contact Form */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{xs:12,sm:6}}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            
          />
        </Grid>
        <Grid size={{xs:12,sm:6}}>
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid size={{xs:12,sm:6}}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid size={{xs:12,sm:6}}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            multiline
            rows={4}
            required
          />
        </Grid>
        <Grid size={{xs:12}}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2, bgcolor:"tomato"}}
          >
            Send Message
          </Button>
        </Grid>
      </Grid>

      {/* Modal to Display Entered Data */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "70%", md: "50%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Entered Data
            </Typography>
            <Typography><strong>First Name:</strong> {formData.firstName}</Typography>
            <Typography><strong>Last Name:</strong> {formData.lastName}</Typography>
            <Typography><strong>Email:</strong> {formData.email}</Typography>
            <Typography><strong>Subject:</strong> {formData.subject}</Typography>
            <Typography><strong>Message:</strong> {formData.message}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
              sx={{ mt: 2, bgcolor:"tomato" }}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Contact;