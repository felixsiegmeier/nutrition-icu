export const demandInfo = (
  <div className="flex flex-col">
    <h2 className="text-md font-semibold">Ermittlung des Gesamtumsatzes</h2>
    <p className="text-sm">
      Der Gesamtenergieumsatz wird anhand des Aktivitätslevels, bekannt als
      Physical Activity Level (PAL), ermittelt. Dieser Wert kann für Personen
      mit kritischen Erkrankungen wie folgt geschätzt werden:
    </p>
    <ul className="list-disc text-sm pl-5">
      <li>Grundumsatz: 1.0</li>
      <li>Bettlägerig: 1.2</li>
      <li>Kleine Operation: 1.1</li>
      <li>Große Operation: 1.2</li>
      <li>Polytrauma: 1.35</li>
      <li>Stumpfes Bauchtrauma: 1.35</li>
      <li>Schweres Schädel-Hirn-Trauma: 1.6</li>
      <li>Milde Infektion: 1.2</li>
      <li>Mäßige Infektion: 1.4</li>
      <li>Sepsis: 1.6</li>
      <li>Schwere Sepsis: 1.2</li>
      <li>Septischer Schock: 1.0</li>
      <li>Verbrennungen: 1.5 - 2.1 (Standardwert: 1.8)</li>
    </ul>
    <br></br>

    <h2 className="text-md font-semibold">
      Berücksichtigung besonderer Umstände
    </h2>
    <p className="text-sm">
      Besondere medizinische Umstände erfordern eine individuelle Anpassung der
      Energie- und Nährstoffzufuhr:
    </p>
    <ul className="list-disc text-sm pl-5">
      <li>
        Leberzirrhose: Hoher Energiebedarf mit 30 - 35 Kilokalorien pro
        Kilogramm
      </li>
      <li>Akutes Leberversagen: Niedrige Energiezufuhr empfohlen</li>
      <li>Hypothermie: Energiebedarf um 30% reduziert</li>
      <li>
        Chronische Niereninsuffizienz ohne Dialyse: Niedriger Eiweißbedarf
        (Standardwert: 0.8 g/kg)
      </li>
      <li>Dialyse: Verlust von 2 Gramm Eiweiß pro Stunde</li>
      <li>
        Kontinuierliche Dialyse: Verlust von 0.2 Gramm pro Liter Filtrat bzw.
        Dialysat (kontinuierliche venovenöse Hämofiltration, CVVH) bzw. 0.6
        Gramm pro Stunde (kontinuierliche venovenöse Hämodialyse, CVVHD)
      </li>
    </ul>
    <br></br>

    <h2 className="text-md font-semibold">Anmerkungen zur Eiweißzufuhr</h2>
    <p className="text-sm">
      Bei der Zufuhr von Eiweiß ist zu berücksichtigen, dass Lösungen mit
      Aminosäuren einen um 17% geringeren Proteingehalt aufweisen als feste
      Proteine. Dies ist herstellerspezifisch. Daher sollte die Zufuhr
      entsprechend angepasst und das 1.2-fache der berechneten Menge verabreicht
      werden.
    </p>
  </div>
);
