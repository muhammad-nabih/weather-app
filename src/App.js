import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// Material Ui Component
import {
  Container,
  Button,
  Box,
  Divider,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
// Icons Material UI Component
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";
//React
import { useEffect, useState } from "react";

//External Libraries

import moment from "moment/moment";
import "moment/locale/ar";
import { useTranslation } from "react-i18next";
// IMPORT REDUX HOOKS
import { useDispatch, useSelector } from "react-redux";
// import { changeResult } from "./features/weather-api/weatherApiSlice";
import { fetchWeather } from "./features/weather-api/weatherApiSlice";

// REDUX IMPORT

// Time Preview
moment.locale("ar");

function App() {
  // REDUX CODE STATE AND DISPATCH
  const dispatch = useDispatch();
  // USE STATE SECTION
  const [dateAndTime, setDateAndTime] = useState("");
  const temp = useSelector((state) => {
    return state.weather.weather;
  });


  const { number, description, max, min, nameCountry, icon } = temp;
  const { t, i18n } = useTranslation();
  const [locale, setLocale] = useState("ar");

  // API REQUEST AND USE EFFECT
  useEffect(() => {
    dispatch(fetchWeather());
    return () => {
      // cancelAxios();
    };
  }, [dispatch]);

  // ===== END API REQUEST AND USE EFFECT =====

  //  DATE AND TIME
  useEffect(() => {
    // عند بدأ الموقع يقوم بتحويل كل شئ الي العربية
    i18n.changeLanguage(locale);
    // Date And Time From MomentJS
    setDateAndTime(moment().format("MMM Do YYYY"));
  }, [i18n, locale]);

  // APP THEMES AND FONTS
  const theme = createTheme({
    typography: {
      fontFamily: "IBM",
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="sm"
          dir={locale === "ar" ? "rtl" : "ltr"}
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {/* Main Card  */}
          <Card
            sx={{
              minWidth: "100%",
              padding: "5px 7px",
              backgroundColor: "#0a3f9e",
              color: "white",
            }}
          >
            <CardContent>
              {/* Header Card Country Name And Date  */}
              <Box
                marginBottom={2}
                display={"flex"}
                alignItems={"end"}
                gap={2}
                justifyContent={"start"}
              >
                <Typography variant="h2" fontWeight={"500"}>
                  {t(nameCountry)}
                </Typography>
                <Typography variant="h6">{dateAndTime} </Typography>
              </Box>
              {/* == Header Card Country Name And Date == */}
              <Divider style={{ background: "white" }} />
              <Grid container spacing={2} marginTop={2}>
                <Grid xs={6}>
                  {/* Column 1 => Degree , State , Kobra&Soghra */}
                  <Box>
                    {/* Degree And State Image */}
                    <Box display={"flex"} alignItems={"center"}>
                      <Typography variant="h1">
                        {useSelector((state) => {
                          return state.weather.isLoading ? (
                            <CircularProgress style={{ color: "white" }} />
                          ) : (
                            t(number)
                          );
                        })}
                      </Typography>

                      <img
                        className="cloud"
                        style={{ minWidth: "30%" }}
                        src={`https://openweathermap.org/img/wn/${icon}.png`}
                        alt={description}
                      />
                      {/* ==Degree And State Image== */}
                    </Box>

                    {/* Cloud State and Soghra , Kopra */}
                    <Box>
                      <Typography variant="h5">{t(description)}</Typography>
                      <Box
                        padding={"9px 0"}
                        display={"flex"}
                        alignItems="center"
                        gap={2}
                      >
                        <Typography variant="p">
                          {" "}
                          {t("min") + ": " + t(min)}
                        </Typography>
                        <Typography variant="p">
                          {" "}
                          {t("max") + ": " + t(max)}
                        </Typography>
                      </Box>
                    </Box>
                    {/*== Cloud State and Soghra , Kopra ==*/}
                  </Box>
                  {/* ==Column 1 => Degree , State , Kobra&Soghra ==*/}
                </Grid>

                {/* Image Cloud  */}
                <Grid xs={6}>
                  <CloudIcon
                    className="cloudIcon"
                    style={{ fontSize: "200" }}
                  />
                  {/*== Image Cloud==*/}
                </Grid>
              </Grid>
            </CardContent>
            {/* == Main Card ==  */}
          </Card>
          <CardActions
            dir={locale === "ar" ? "rtl" : "ltr"}
            style={{ width: "100%" }}
          >
            <Button
              style={{ color: "white" }}
              variant="text"
              onClick={() => {
                if (locale === "ar") {
                  setLocale("en");
                  i18n.changeLanguage("en");
                  moment.locale("en");
                } else {
                  setLocale("ar");
                  i18n.changeLanguage("ar");
                  moment.locale("ar");
                }
                // الهدف من السطر الي تحت دا انه يعملك ادراج تاني للتاريخ لانه هيفضل بالعربي
                // هتقولي ليه هيفضل بالعربي هقولك لانه اتعمله طباعة بنائا علي الحالة الاولية
                setDateAndTime(moment().format("MMM Do YYYY"));
              }}
            >
              {locale === "ar" ? "إنجليزي" : "Arabic"}
            </Button>
          </CardActions>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
