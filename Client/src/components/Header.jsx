import { Typography, Box } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box mb="10px">
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
