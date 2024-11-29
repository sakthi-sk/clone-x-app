import * as React from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";

function Media(props) {
  

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "95%", md: "95%" },
        minWidth: "300px",
        maxWidth: "700px",
        minHeight: "100px",
        margin:"auto",
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        transition: "all 0.3s ease-in-out",
        marginTop: "30px",
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        action={
          <IconButton aria-label="settings">
           
          </IconButton>
        }
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />

      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />

      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function MediaLoader() {
  return (
    <div>
      <Media  />
      <Media />
    </div>
  );
}
