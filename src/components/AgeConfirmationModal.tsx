import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  Fade,
  Backdrop,
} from "@mui/material";

const AgeConfirmationModal = () => {
  const [open, setOpen] = useState(true); // Modal is open by default
  const [isConfirmed, setIsConfirmed] = useState(false); // Track if age is confirmed

  // Handle confirmation (user is of legal age)
  const handleConfirm = () => {
    setIsConfirmed(true);
    setOpen(false); // Close the modal
  };

  // Handle decline (user is not of legal age)
  const handleDecline = () => {
    setIsConfirmed(false);
    setOpen(false); // Close the modal
    // Optionally, redirect or show a message
    alert("You must be of legal age to proceed.");
  };

  return (
    <Box>
      {/* Age Confirmation Modal */}
      <Modal
        open={open}
        onClose={handleDecline} // Close modal if user clicks outside
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "70%", md: "400px" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Age Verification
            </Typography>
            <Typography sx={{ mb: 2 }}>
              You must be at least 18 years old to access this content. Are you of legal age?
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button variant="contained" sx={{bgcolor:"tomato"}} onClick={handleConfirm}>
                Yes, I am 18+
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleDecline}>
                No, I am under 18
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default AgeConfirmationModal;