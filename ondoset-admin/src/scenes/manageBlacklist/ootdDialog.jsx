import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

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
      console.log(response);
      setOotdList([
        response.data.result.ootdList[0],
        response.data.result.ootdList[0],
        response.data.result.ootdList[0],
      ]);
    } catch (error) {
      console.error("Error fetching OOTD list:", error);
    }
  };

  return (
    <>
      {ootdList.length > 0 ? (
        ootdList.map((ootd) => (
          <Card key={ootd.ootdId} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={process.env.REACT_APP_IMAGE_BASE_URL + ootd.imageURL}
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
                | Lowest Temp: {ootd.lowestTemp}°C
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
    </>
  );
};

export default OOTDCard;
