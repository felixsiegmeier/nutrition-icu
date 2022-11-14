import "./App.css";
import Popover from "@mui/material/Popover";
import { Switch } from "@mui/material";
import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import nahrungen from "./nahrung.json";
import InfoBox from "./InfoBox";
import NoFeeding from "./NoFeeding";
import NormalSummary from "./NormalSummary";

function App() {
  const [kontraindikationErnaehrung, setKontraindikationErnaehrung] =
    React.useState(false);
  const [kontraindikationEnteral, setKontraindikationEnteral] =
    React.useState(false);
  const [groeße, setGroeße] = React.useState(180);
  const [gewicht, setGewicht] = React.useState(80);
  const [gewichtForCalc, setGewichtForCalc] = React.useState(null);
  const [glucose, setGlucose] = React.useState("");
  const [glucoseFactor, setGlucoseFactor] = React.useState(1);
  const [bmi, setBmi] = React.useState(0);
  const [insulin, setInsulin] = React.useState(0);
  const [insulinVorbedarf, setInsulinVorbedarf] = React.useState(0);
  const [kcal, setKcal] = React.useState(25);
  const [kohlenhydrate, setKohlenhydrate] = React.useState(3.0);
  const [eiweiß, setEiweiß] = React.useState(1.5);
  const [fette, setFette] = React.useState(1.2);
  const [nahrung, setNahrung] = React.useState("");
  const [nahrungKcal, setNahrungKcal] = React.useState(0);
  const [nahrungKohlenhydrate, setNahrungKohlenhydrate] = React.useState(0);
  const [nahrungEiweiß, setNahrungEiweiß] = React.useState(0);
  const [nahrungFette, setNahrungFette] = React.useState(0);
  const [dauer, setDauer] = React.useState(24);
  const [laufrate, setLaufrate] = React.useState(20);
  const [gedecktKcal, setGedecktKcal] = React.useState(0);
  const [gedecktKohlenhydrate, setGedecktKohlenhydrate] = React.useState(0);
  const [gedecktEiweiß, setGedecktEiweiß] = React.useState(0);
  const [gedecktFette, setGedecktFette] = React.useState(0);

  const nahrungListe = Object.keys(nahrungen);

  React.useEffect(() => {
    if (!isNaN(groeße) && !isNaN(gewicht)) {
      setBmi(gewicht / ((groeße / 100) * (groeße / 100)));
      if (gewicht / ((groeße / 100) * (groeße / 100)) > 29) {
        setGewichtForCalc(29 * ((groeße / 100) * (groeße / 100)));
      } else {
        setGewichtForCalc(gewicht);
      }
    }
  }, [groeße, gewicht]);

  React.useEffect(() => {
    if (nahrungListe.indexOf(nahrung) > -1) {
      setNahrungKcal(nahrungen[nahrung].kcal);
      setNahrungKohlenhydrate(nahrungen[nahrung].kohlenhydrate);
      setNahrungEiweiß(nahrungen[nahrung].eiweiß);
      setNahrungFette(nahrungen[nahrung].fette);
    }
  }, [nahrung]);

  React.useEffect(() => {
    const menge = laufrate * dauer;
    const bedarfKcal = gewichtForCalc * kcal;
    const bedarfKohlenhydrate = gewichtForCalc * kohlenhydrate;
    const bedarfEiweiß = gewichtForCalc * eiweiß;
    const bedarfFette = gewichtForCalc * fette;

    setGedecktKcal(Math.round(((menge * nahrungKcal) / bedarfKcal) * 100));
    setGedecktEiweiß(Math.round((menge * nahrungEiweiß) / bedarfEiweiß));
    setGedecktKohlenhydrate(
      Math.round((menge * nahrungKohlenhydrate) / bedarfKohlenhydrate)
    );
    setGedecktFette(Math.round((menge * nahrungFette) / bedarfFette));
  }, [
    laufrate,
    dauer,
    bmi,
    nahrung,
    nahrungEiweiß,
    nahrungFette,
    nahrungKcal,
    nahrungKohlenhydrate,
    kohlenhydrate,
    kcal,
    eiweiß,
    fette,
  ]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [popoverContent, setPopoverContent] = React.useState("null");

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="App">
      <InfoBox />
      <div className="contraindications-box">
        <h4 className="segment-label">Kontraindikationen</h4>
        <div className="switch-container">
          <Switch
            checked={kontraindikationErnaehrung}
            onChange={(e) => {
              setKontraindikationErnaehrung(e.target.checked);
            }}
          />
          <span className="switchLabel">Kontraindikation für Ernährung</span>
          <HelpOutlineIcon
            fontSize="small"
            onMouseEnter={(e) => {
              handlePopoverOpen(e);
              setPopoverContent(
                <div className="popover">
                  <p>Schwere Hypoxämie</p>
                  <p>Unkontrollierter Schock</p>
                  <p>Schwere metabolische Azidose</p>
                </div>
              );
            }}
            onMouseLeave={handlePopoverClose}
          />
        </div>

        <div className="switch-container">
          <Switch
            checked={kontraindikationEnteral}
            onChange={(e) => {
              setKontraindikationEnteral(e.target.checked);
            }}
          />
          <span className="switchLabel">
            Kontraindikation für enterale Substratzufuhr
          </span>
          <HelpOutlineIcon
            fontSize="small"
            onMouseEnter={(e) => {
              handlePopoverOpen(e);
              setPopoverContent(
                <div className="popover">
                  <p>Mechanischer Ileus</p>
                  <p>Akute Gastrointestinale Blutung</p>
                  <p>Kurzdarm unter 1 m</p>
                  <p>Akutes Abdomen</p>
                  <p>Darmischämie oder Perforation</p>
                  <p>NIV in der Akutphase (insb. Vigilanzstörung)</p>
                </div>
              );
            }}
            onMouseLeave={handlePopoverClose}
          />
        </div>
      </div>
      <div className="parameters" style={{display: kontraindikationErnaehrung ? "none" : "flex"}}>
        <h4 className="segment-label">Patientenparameter</h4>
        <div className="patient-data-need-box">
          <div className="patient-data-box">
            <h5 className="sub-segment-label">Kenngrößen</h5>
            <div>
              <span className="input-label">Größe: </span>
              <input
                type="text"
                className="input-value"
                value={groeße}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setGroeße(e.target.value);
                  }
                }}
              />
              <input className="input-unit" disabled value="cm" />
            </div>

            <div>
              <span className="input-label">Gewicht: </span>
              <input
                type="tel"
                className="input-value"
                value={gewicht}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setGewicht(e.target.value);
                  }
                }}
              />
              <input className="input-unit" disabled value="kg" />
            </div>

            <div>
              <span className="input-label">BMI: </span>
              <input
                type="text"
                className="input-value"
                value={Math.round(bmi * 10) / 10 + " kg/m²"}
                disabled
                style={{ width: "130px" }}
              />
            </div>

            <div>
              <span className="input-label">Blutzucker: </span>
              <input
                className="input-value"
                style={{ width: "130px" }}
                value={glucose}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setGlucose(e.target.value);
                  }
                }}
              />
              <select
                className="select-unit"
                name="glucose"
                id="glucose"
                onChange={(e) => {
                  if (!isNaN(glucose)) {
                    if (e.target.value === "mmol/l") {
                      setGlucoseFactor(1);
                      setGlucose(Math.round(glucose * 0.0555 * 10) / 10);
                    }
                    if (e.target.value === "mg/dl") {
                      setGlucose(Math.round(glucose * 18.0182 * 10) / 10);
                      setGlucoseFactor(18.0182);
                    }
                  }
                }}
              >
                <option value="mmol/l">mmol/l</option>
                <option value="mg/dl">mg/dl</option>
              </select>
            </div>

            <div>
              <span className="input-label">Insulinbedarf: </span>
              <input
                type="tel"
                className="input-value"
                value={insulin}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setInsulin(e.target.value);
                  }
                }}
              />
              <input className="input-unit" disabled value="IE/h" />
            </div>

            <div>
              <span className="input-label">Vorbedarf: </span>
              <input
                type="tel"
                className="input-value"
                value={insulinVorbedarf}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setInsulinVorbedarf(e.target.value);
                  }
                }}
              />
              <input className="input-unit" disabled value="IE/d" />
              <div style={{ display: "inline-block", width: "15px" }} />
              <HelpOutlineIcon
                fontSize="small"
                onMouseEnter={(e) => {
                  handlePopoverOpen(e);
                  setPopoverContent(
                    <div className="popover">
                      <p>Nur bei Diabetikern</p>
                      <p>Kurzzeitinsulin + Basalinsulin</p>
                      <p>Achtung: Angabe in Einheiten pro Tag</p>
                    </div>
                  );
                }}
                onMouseLeave={handlePopoverClose}
              />
            </div>
          </div>

          <div className="need-box">
            <h5 className="sub-segment-label">Bedarf</h5>
            <div>
              <span className="input-label">Energie: </span>
              <input
                className="input-slider"
                type="range"
                min="0"
                max="40"
                value={kcal}
                onChange={(e) => setKcal(e.target.value)}
              />
              <span className="input-value-display">{kcal} kcal/kg</span>
              <HelpOutlineIcon
                fontSize="small"
                onMouseEnter={(e) => {
                  handlePopoverOpen(e);
                  setPopoverContent(
                    <div className="popover">
                      <p>Frühphase: 20 - 25 kcal/kg</p>
                      <p>Stabilisierungsphase: 30 - 35 kcal/kg</p>
                    </div>
                  );
                }}
                onMouseLeave={handlePopoverClose}
              />
            </div>

            <div>
              <span className="input-label">Kohlenhydrate: </span>
              <input
                className="input-slider"
                type="range"
                min="10"
                max="50"
                value={kohlenhydrate * 10}
                onChange={(e) => setKohlenhydrate(e.target.value / 10)}
              />
              <span className="input-value-display">{kohlenhydrate} g/kg</span>
              <HelpOutlineIcon
                fontSize="small"
                onMouseEnter={(e) => {
                  handlePopoverOpen(e);
                  setPopoverContent(
                    <div className="popover">
                      <p>Standard: 2.5 - 3.5 g/kg</p>
                    </div>
                  );
                }}
                onMouseLeave={handlePopoverClose}
              />
            </div>

            <div>
              <span className="input-label">Eiweiß: </span>
              <input
                className="input-slider"
                type="range"
                min="5"
                max="30"
                value={eiweiß * 10}
                onChange={(e) => setEiweiß(e.target.value / 10)}
              />
              <span className="input-value-display">{eiweiß} g/kg</span>
              <HelpOutlineIcon
                fontSize="small"
                onMouseEnter={(e) => {
                  handlePopoverOpen(e);
                  setPopoverContent(
                    <div className="popover">
                      <p>Standard: 1.2 - 1.5 g/kg</p>
                      <p>Bei BMI über 30: 2.0 g/kg</p>
                      <p>Bei kontinuierlicher Dialyse: 1.7 g/kg</p>
                      <p>
                        Bei hochgradiger chronischer Niereninsuffizienz ohne
                        Dialyse: 1.0 g/kg
                      </p>
                    </div>
                  );
                }}
                onMouseLeave={handlePopoverClose}
              />
            </div>

            <div>
              <span className="input-label">Fette: </span>
              <input
                className="input-slider"
                type="range"
                min="5"
                max="30"
                value={fette * 10}
                onChange={(e) => setFette(e.target.value / 10)}
              />
              <span className="input-value-display">{fette} g/kg</span>
              <HelpOutlineIcon
                fontSize="small"
                onMouseEnter={(e) => {
                  handlePopoverOpen(e);
                  setPopoverContent(
                    <div className="popover">
                      <p>Standard: 1.0 - 1.5 g/kg</p>
                    </div>
                  );
                }}
                onMouseLeave={handlePopoverClose}
              />
            </div>
          </div>
        </div>

        <h4 className="segment-label">Nahrungsparameter</h4>
        <div className="nutrition-box">
          <div className="nutritions-params-box">
            <h5 className="sub-segment-label sub-segment-label-special">
              Präparat wählen
            </h5>

            <div>
              <span className="input-label">Nahrung: </span>
              <select
                className="select-unit"
                name="nahrung"
                id="nahrung"
                size={1}
                onChange={(e) => {
                  setNahrung(e.target.value);
                }}
              >
                <option value="" />
                {nahrungListe.map((nahrung) => {
                  return <option value={nahrung}>{nahrung}</option>;
                })}
              </select>
            </div>
            <h5 className="sub-segment-label sub-segment-label-special">
              Oder Nahrung manuell konfigurieren
            </h5>
            <div>
              <span className="input-label">Energie: </span>
              <input
                type="tel"
                className="input-value"
                value={nahrungKcal}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setNahrungKcal(e.target.value);
                  }
                }}
              />
              <input
                className="input-unit input-unit-large"
                disabled
                value="kcal/ml"
              />
            </div>

            <div>
              <span className="input-label">Kohlenhydrate: </span>
              <input
                type="tel"
                className="input-value"
                value={nahrungKohlenhydrate}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setNahrungKohlenhydrate(e.target.value);
                  }
                }}
              />
              <input
                className="input-unit input-unit-large"
                disabled
                value="g/100ml"
              />
            </div>

            <div>
              <span className="input-label">Eiweiß: </span>
              <input
                type="tel"
                className="input-value"
                value={nahrungEiweiß}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setNahrungEiweiß(e.target.value);
                  }
                }}
              />
              <input
                className="input-unit input-unit-large"
                disabled
                value="g/100ml"
              />
            </div>

            <div>
              <span className="input-label">Fette: </span>
              <input
                type="tel"
                className="input-value"
                value={nahrungFette}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setNahrungFette(e.target.value);
                  }
                }}
              />
              <input
                className="input-unit input-unit-large"
                disabled
                value="g/100ml"
              />
            </div>

            <h5 className="sub-segment-label sub-segment-label-special">
              Verabreichung
            </h5>

            <div>
              <span className="input-label">Gabe über: </span>
              <input
                className="input-slider"
                type="range"
                min="0"
                max="24"
                value={dauer}
                onChange={(e) => setDauer(e.target.value)}
              />
              <span className="input-value-display">{dauer} h</span>
            </div>

            <div>
              <span className="input-label">Laufrate: </span>
              <input
                type="tel"
                className="input-value"
                value={laufrate}
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    setLaufrate(e.target.value);
                  }
                }}
              />
              <input className="input-unit" disabled value="ml/h" />
              <div className="input-value-display-bedarf">
                ({laufrate * dauer} ml/d)
              </div>
            </div>
          </div>

          <div className="nutrition-box-calcs">
            <h5 className="sub-segment-label">Bedarfsdeckung</h5>
            <div>
              <span className="input-label">Energie: </span>
              <input
                type="text"
                className="input-value"
                value={gedecktKcal + " %"}
                disabled
                style={{ width: "130px" }}
              />
              <div className="input-value-display-bedarf">
                ({Math.round(laufrate * dauer * nahrungKcal)}/
                {Math.round(gewichtForCalc * kcal)} kcal)
              </div>
            </div>

            <div>
              <span className="input-label">Kohlenhydrate: </span>
              <input
                type="text"
                className="input-value"
                value={gedecktKohlenhydrate + " %"}
                disabled
                style={{ width: "130px" }}
              />
              <div className="input-value-display-bedarf">
                ({Math.round((laufrate * dauer * nahrungKohlenhydrate) / 100)}/
                {Math.round(gewichtForCalc * kohlenhydrate)} g)
              </div>
            </div>

            <div>
              <span className="input-label">Eiweiß: </span>
              <input
                type="text"
                className="input-value"
                value={gedecktEiweiß + " %"}
                disabled
                style={{ width: "130px" }}
              />
              <div className="input-value-display-bedarf">
                ({Math.round((laufrate * dauer * nahrungEiweiß) / 100)}/
                {Math.round(gewichtForCalc * eiweiß)} g)
              </div>
            </div>

            <div>
              <span className="input-label">Fette: </span>
              <input
                type="text"
                className="input-value"
                value={gedecktFette + " %"}
                disabled
                style={{ width: "130px" }}
              />
              <div className="input-value-display-bedarf">
                ({Math.round((laufrate * dauer * nahrungFette) / 100)}/
                {Math.round(gewichtForCalc * fette)} g)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="summary-box">
        <h4 className="segment-label">Empfehlung</h4>
        <NormalSummary
          kontraindikationEnteral={kontraindikationEnteral}
          kontraindikationErnaehrung={kontraindikationErnaehrung}
          insulin={insulin}
          insulinVorbedarf={insulinVorbedarf}
          glucose={glucose / glucoseFactor}
          dauer={dauer}
          mlBedarf={Math.round((kcal * gewichtForCalc) / nahrungKcal)}
        />
        <NoFeeding
          kontraindikationEnteral={kontraindikationEnteral}
          kontraindikationErnaehrung={kontraindikationErnaehrung}
        />
      </div>
      <div className="disclaimer">
        Die hier gegebenen Empfehlungen dürfen nicht zur Behandlung realer
        Patienten eingesetzt werden. Sie ersetzen nicht die genauste ärztliche
        Prüfung und Therapiesteuerung. Alle Angaben beruhen auf persönlichen
        Erkenntnissen des Autors und spiegeln eventuell nicht die aktuellen
        Leitlinen wieder. Die Haftung beim Einsatz in der Patientenversorgung
        ist ausgeschlossen.
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverContent}
      </Popover>
    </div>
  );
}

export default App;
