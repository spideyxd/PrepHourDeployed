import { Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import React from "react";
import illus from "../DesignAssets/illust.png";
import "../stylesheets/Font.css";
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(1423));
  const nav = useNavigate();
  const BASE_URL=process.env.REACT_APP_BASE_URL;

 

  return (
    <>
      {isMatch ? (
        <>
          <div
            style={{
              marginTop: "16vh",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                fetch(`${BASE_URL}/getinfo`, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                })
                  .then((data) => data.json())
                  .then((data) => {
                    nav("/dashboard");
                  })
                  .catch((err) => {
                    nav("/login");
                  });
              }}
              variant="outlined"
              color="error"
              style={{
                borderRadius: "50px",
                marginTop: "6vh",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Schedule Now
            </Button>

            <Typography
              variant="subtitle1"
              sx={{
                width: "50vw",
                marginTop: "20px",
                color: "white",
                fontFamily: "Barlow",
              }}
            >
              Mock interviews , resume review , personal assistance , career
              guidance, get everything covered by your college seniors under one
              platform.
              <span style={{ fontStyle: "italic", color: "#84EAA0" }}>
                Schedule Now.
              </span>
            </Typography>
            <div>
              <Typography
                sx={{
                  marginTop: "5vh",
                  color: "white",
                  fontFamily: "Barlow",
                  fontSize: "5vw",
                }}
                variant="h2"
              >
                Get Interview Ready with <br />
                <span style={{ fontStyle: "italic" }}>
                  Prep<span style={{ color: "#84EAA0" }}>Hour</span>
                </span>
              </Typography>
            </div>

            <div>
              <img src={illus} style={{ height: "auto", maxWidth: "65vw" }} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              marginTop: "16vh",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <div>
              <Typography
                sx={{ color: "white", fontFamily: "Barlow", fontSize: "5vw" }}
                variant="h2"
              >
                Get Interview Ready with <br />
                <span style={{ fontStyle: "italic" }}>
                  Prep<span style={{ color: "#84EAA0" }}>Hour</span>
                </span>
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  width: "50vw",
                  marginTop: "20px",
                  color: "white",
                  fontFamily: "Barlow",
                }}
              >
                Mock interviews , resume review , personal assistance , career
                guidance, get everything covered by your college seniors under
                one platform.
                <span style={{ fontStyle: "italic", color: "#84EAA0" }}>
                  Schedule Now.
                </span>
              </Typography>

              <Button
                onClick={() => {
                  fetch(`${BASE_URL}/getinfo`, {
                    method: "GET",
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    credentials: "include",
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      nav("/dashboard");
                    })
                    .catch((err) => {
                      nav("/login");
                    });
                }}
                variant="outlined"
                color="error"
                style={{
                  borderRadius: "50px",
                  marginTop: "6vh",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Schedule Now
              </Button>
            </div>
            <div>
              <img src={illus} style={{ height: "50vh" }} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Banner;
