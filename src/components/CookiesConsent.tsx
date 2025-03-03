import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Fade,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";

const CookiesConsent = () => {
  const [open, setOpen] = useState(false); // Controls the cookies modal
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Controls the snackbar
  const [cookiesAccepted, setCookiesAccepted] = useState(false); // Tracks if cookies are accepted

  // Check if cookies consent has already been given
  useEffect(() => {
    const cookiesConsent = localStorage.getItem("cookiesConsent");
    if (!cookiesConsent) {
      setOpen(true); // Show the cookies modal if no consent has been given
    } else {
      setCookiesAccepted(cookiesConsent === "accepted");
    }
  }, []);

  // Handle accepting cookies
  const handleAccept = () => {
    localStorage.setItem("cookiesConsent", "accepted"); // Store consent in localStorage
    setCookiesAccepted(true);
    setOpen(false); // Close the modal
    setSnackbarOpen(true); // Show a confirmation snackbar
  };

  // Handle declining cookies
  const handleDecline = () => {
    localStorage.setItem("cookiesConsent", "declined"); // Store consent in localStorage
    setCookiesAccepted(false);
    setOpen(false); // Close the modal
    setSnackbarOpen(true); // Show a confirmation snackbar
  };

  // Close the snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box>
      {/* Cookies Consent Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)} // Prevent closing by clicking outside
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "90%", sm: "70%", md: "500px" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              We Use Cookies
            </Typography>
            <Typography sx={{ mb: 2 }}>
              This website uses cookies to ensure you get the best experience. By continuing to use
              this site, you agree to our use of cookies.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAccept}>
                Accept
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleDecline}>
                Decline
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Snackbar for Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Snackbar will close after 3 seconds
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={cookiesAccepted ? "success" : "info"}
          sx={{ width: "100%" }}
        >
          {cookiesAccepted
            ? "Cookies accepted. Thank you!"
            : "Cookies declined. Some features may not work."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CookiesConsent;