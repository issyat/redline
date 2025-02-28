import { Button, Grid2 as Grid, Typography } from "@mui/material";
import CallIcon from '@mui/icons-material/Call';

const Authentication = () => {

    return (
        <Grid container size={12} display={"flex"} sx={{ backgroundColor: "tomato", padding: "10px" }}>
            <Grid display={"flex"} sx={{ backgroundColor: "tomato" }}>

                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <CallIcon sx={{ color: "white" }} />
                </Grid>

                <Grid ml={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <Typography component={"p"} sx={{ color: "white" }}>1-800-123-4567</Typography>
                </Grid>

                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {/* Two black button one for login and register */}
                    <Button variant={"contained"} sx={{ backgroundColor: "black", color: "white", margin: "0 10px" }}>Login</Button>
                    <Button variant={"contained"} sx={{ backgroundColor: "black", color: "white" }}>Register</Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Authentication;