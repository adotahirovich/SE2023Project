import { useNavigate } from "react-router-dom";
import * as React from "react";
import { Avatar, Box, Card, Button, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";

const MyProfile = ({ user }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        py: 2,
      }}
    >
      <Card sx={{ minWidth: 376, width: { xs: '90%', sm: '60%', md: '40%' }, p: 4, textAlign: 'center' }}>
        <Avatar sx={{ mx: 'auto', width: 80, height: 80 }}><BadgeIcon /></Avatar>
        <Typography variant="h5" component="div" gutterBottom mt={2}>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {user.email}
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-around' }}>
          <Button 
            variant="contained" 
            onClick={() => navigate("/update_profile")}
            sx={{
              bgcolor: 'primary.main', 
              '&:hover': { bgcolor: 'primary.dark' },
              borderRadius: 3,
              textTransform: 'none'
            }}
          >
            Update Profile
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate("/my_posts")}
            sx={{
              bgcolor: 'secondary.main', 
              '&:hover': { bgcolor: 'secondary.dark' },
              borderRadius: 3,
              textTransform: 'none'
            }}
          >
            My Posts
          </Button>
          <Button 
            variant="contained" 
            onClick={() => navigate("/add_post")}
            sx={{
              bgcolor: 'success.main', 
              '&:hover': { bgcolor: 'success.dark' },
              borderRadius: 3,
              textTransform: 'none'
            }}
          >
            Create Post
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default MyProfile;
