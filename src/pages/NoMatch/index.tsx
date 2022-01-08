import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div>
      <Typography fontSize="30">Nothing to see here!</Typography>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
};

export default NoMatch;
