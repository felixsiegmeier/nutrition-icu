import React from 'react'

export default function NormalSummary(props) {
  if (!props.kontraindikationErnaehrung) return (
    <ul>
    {(props.mlBedarf < Infinity) && !props.kontraindikationErnaehrung && <li>Mit der gewählten Nahrung sind zur Deckung des Kalorienbedarfs täglich {props.mlBedarf} ml erforderlich (entspricht {Math.round(props.mlBedarf/props.dauer)} ml/h bei einer Laufzeit von {props.dauer} Stunden)</li>}
    {props.kontraindikationEnteral && <li>Ernährung ausschließlich parenteral</li>}
    {((props.insulin - props.insulinVorbedarf/24) < 5) && (props.glucose > 10) && <li>Insulinzufuhr bei erhöhtem Blutzuckerwert steigern</li>}
        {((props.insulin - props.insulinVorbedarf/24) > 5) && (props.glucose < 10) && <li>Insulinzufuhr bei erhöhter Zufuhr und normalem Blutzucker evtl. reduzieren</li>}
        {((props.insulin - props.insulinVorbedarf/24) >= 5) && (props.glucose > 10) && <li>Nahrungszufuhr bei erhöhtem Blutzucker und erhöhtem Insulinbedarf reduzieren (10 - 20 ml/h)</li>}
        {((props.insulin - props.insulinVorbedarf/24) === 5) && (props.glucose === 10) && <li>Nahrungszufuhr nicht weiter steigern, Grenzwerte für Blutzucker und Insulinbedarf erreicht</li>}
        {((props.insulin - props.insulinVorbedarf/24) < 5) && (props.glucose < 10) && <li>Laufrate alle 6 - 8 Stunden um 10-20 ml/h steigern bis zum Erreichen der Zielwertes</li>}
        {props.kontraindikationEnteral && <li>Mikronährstoffe sind in parenteralen Nährlösungen i.d.R. nicht enthalten und müssen zusätzlich gegeben werden (ggf. Herstellerangaben beachten)</li>}
        <li>Regelmäßige Kontrollen des Blutzuckers</li>
        {!props.kontraindikationEnteral && <li>Mikronährstoffe müssen i.d.R. bei weniger als 1500 ml Sondennahrung pro Tag zusätzlich gegeben werden (ggf. Herstellerangaben beachten)</li>}
        {!props.kontraindikationEnteral && <li>Parenterale Nährlösungen enthalten i.d.R. keine Mikronährstoffe (ggf. Herstellerangaben beachten)</li>}
    </ul>
  )
}
