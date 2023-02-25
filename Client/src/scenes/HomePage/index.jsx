import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const HomePage = (props) => {
  return (
    <>
      <h1
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
        }}
      >
        Hi {localStorage.getItem("user")}
      </h1>
      <Typography
        variant="h6"
        component="div"
        style={{
          whiteSpace: "pre-wrap",
          wordWrap: "break-word",
          // textAlign: "center",
        }}
        paddingBottom={5}
      >
        {localStorage.getItem("user")}
      </Typography>
    </>
  );
};

export default HomePage;
