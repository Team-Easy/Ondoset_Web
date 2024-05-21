import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ReportOOTDCard = ({ imageURL }) => {
  return (
    <>
      <Card key={0} sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="100%"
          width="100%"
          image={
            process.env.REACT_APP_IMAGE_BASE_URL + imageURL
            // "/2.png"
          }
          alt="OOTD Image"
        />
      </Card>
    </>
  );
};

export default ReportOOTDCard;
