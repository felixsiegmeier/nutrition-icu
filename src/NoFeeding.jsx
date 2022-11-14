import React from 'react'

export default function NoFeeding(props) {
  if( props.kontraindikationErnaehrung && props.kontraindikationEnteral)return (
    <ul>
        <li>Keine Ernährung bis zur Beseitigung von Kontraindikation</li>
        <li>Vorsichtige Kalorienzufuhr mit Glucose 10% erwägen</li>
        <li>Substitution von Mikronährstoffen erwägen</li>
    </ul>
  )
  if (props.kontraindikationErnaehrung && !props.kontraindikationEnteral) return (
    <ul>
        <li>Sondennahrung mit 10 ml/h bis zur Beseitigung von Kontraindikationen</li>
        <li>Vorsichtige Kalorienzufuhr mit Glucose 10% erwägen</li>
        <li>Substitution von Mikronährstoffen erwägen</li>
    </ul>
  )
}
