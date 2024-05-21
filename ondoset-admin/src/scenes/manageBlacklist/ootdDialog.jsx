import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

const OOTDCard = ({ memberId }) => {
  const [ootdList, setOotdList] = useState([]);

  useEffect(() => {
    fetchOOTDList();
  }, [memberId]);

  const fetchOOTDList = async () => {
    try {
      //   console.log(memberId.memberId);
      const response = await axios.get(
        `/admin/blacklist/reporter-list?memberId=${memberId}&lastPage=-1`
      );
      console.log(response.data.result);
      if (response.data.result.ootdList === undefined) {
        setOotdList([]);
      } else {
        setOotdList(response.data.result.ootdList);
        console.log(response.data.result.ootdList[0]);
      }
    } catch (error) {
      console.error("Error fetching OOTD list:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", overflowX: "auto", padding: 2 }}>
      {ootdList.length > 0 ? (
        ootdList.map((ootd) => (
          // <Typography>{ootd.imageURL}</Typography>
          <Card key={ootd.ootdId} sx={{ minWidth: 300, marginRight: 2 }}>
            <CardMedia
              component="img"
              // height="100%"
              // width="100%"
              image={
                process.env.REACT_APP_IMAGE_BASE_URL + ootd.imageURL
                // "/2.png"
              }
              alt="OOTD Image"
            />
            <CardContent>
              <Typography variant="subtitle1">
                Date:{" "}
                {new Date(ootd.date * 1000).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                |
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Highest Temp: {ootd.highestTemp}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lowest Temp: {ootd.lowestTemp}°C
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Wearing:
                <ul>
                  {ootd.wearing.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Reason: {ootd.reason}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No OOTD found</Typography>
      )}
    </Box>
  );
};

export default OOTDCard;
