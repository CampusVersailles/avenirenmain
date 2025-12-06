"use client"
import { useRef, useEffect, useMemo } from "react"
import MapLibre, { MapRef, NavigationControl, Source, Layer } from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import mapLib, { MapLayerMouseEvent } from "maplibre-gl"
import styles from "./FormationsMap.module.css"
import { Coordinates, Formation, getFormationByDocumentId } from "@/strapi/formations"
import { CityResult } from "../Filter/CityAutocomplete"

const FormationsMap = ({
  formations,
  coordinates,
  selectedFormation,
  onSelectFormation,
  city,
  onAddFormation,
}: {
  formations: Formation[]
  coordinates: Coordinates[]
  selectedFormation: Formation | null
  onSelectFormation: (formation: Formation) => void
  onAddFormation: (formation: Formation) => void
  city: CityResult | null
}) => {
  const mapRef = useRef<MapRef>(null)

  const geojson = useMemo(() => {
    const groups: { [key: string]: Coordinates[] } = {}
    coordinates.forEach((coord) => {
      const key = `${coord.longitude},${coord.latitude}`
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(coord)
    })

    const features = []

    for (const key in groups) {
      const group = groups[key]

      if (group.length === 1) {
        features.push({
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: [group[0].longitude, group[0].latitude] },
          properties: { formationId: group[0].documentId },
        })
      } else {
        const [baseLon, baseLat] = [group[0].longitude, group[0].latitude]
        const radius = 0.0002

        group.forEach((coord, index) => {
          const angle = (index / group.length) * 2 * Math.PI
          const offsetLon = radius * Math.cos(angle)
          const offsetLat = radius * Math.sin(angle)

          features.push({
            type: "Feature" as const,
            geometry: {
              type: "Point" as const,
              coordinates: [baseLon + offsetLon, baseLat + offsetLat],
            },
            properties: { formationId: coord.documentId },
          })
        })
      }
    }

    return {
      type: "FeatureCollection" as const,
      features,
    }
  }, [coordinates])

  useEffect(() => {
    if (mapRef.current && selectedFormation) {
      mapRef.current.easeTo({
        center: [selectedFormation.adresse.longitude, selectedFormation.adresse.latitude],
        zoom: 16,
        duration: 1000,
      })
    }
  }, [selectedFormation])

  useEffect(() => {
    if (mapRef.current && city) {
      mapRef.current.easeTo({
        center: [city.geometry.coordinates[0], city.geometry.coordinates[1]],
        zoom: 11,
        duration: 1000,
      })
    }
  }, [city])

  const handleMouseMove = (evt: MapLayerMouseEvent) => {
    if (!mapRef.current) {
      return
    }
    const map = mapRef.current.getMap()
    const features = map.queryRenderedFeatures(evt.point, {
      layers: ["clusters", "unclustered-point"],
    })
    map.getCanvas().style.cursor = features.length > 0 ? "pointer" : ""
  }

  const handleMapClick = (evt: MapLayerMouseEvent) => {
    const map = mapRef.current
    if (!map) {
      return
    }

    const features = map.queryRenderedFeatures(evt.point, {
      layers: ["clusters", "unclustered-point"],
    })

    if (!features.length) {
      return
    }

    const feature = features[0]
    if (feature.properties?.cluster) {
      const clusterId = feature.properties.cluster_id
      const source = map.getSource("formations")
      if (source && "getClusterExpansionZoom" in source && typeof source.getClusterExpansionZoom === "function") {
        source.getClusterExpansionZoom(clusterId).then((zoom: number) => {
          if (feature.geometry.type === "Point") {
            map.easeTo({
              center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]],
              zoom: zoom,
              duration: 1000,
            })
          }
        })
      }
    } else {
      const formationId = feature.properties?.formationId
      if (formationId) {
        const formation = formations.find((f) => f.documentId === formationId)
        if (formation) {
          onSelectFormation(formation)
        } else {
          getFormationByDocumentId(formationId).then((fetchedFormation) => {
            if (fetchedFormation) {
              onAddFormation(fetchedFormation)
              onSelectFormation(fetchedFormation)
            }
          })
        }
      }
    }
  }

  return (
    <div className={styles.map}>
      <MapLibre
        ref={mapRef}
        mapLib={mapLib}
        initialViewState={{
          longitude: 3,
          latitude: 47,
          zoom: 5,
        }}
        maxZoom={17}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        mapStyle='https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json'
        attributionControl={{ compact: true }}>
        <NavigationControl position='top-right' showCompass={false} />

        <Source id='formations' type='geojson' data={geojson} cluster={true} clusterMaxZoom={15} clusterRadius={75}>
          <Layer
            id='clusters'
            type='circle'
            filter={["has", "point_count"]}
            paint={{
              "circle-color": "#cc4d2b",
              "circle-radius": 16,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#fff",
            }}
          />
          <Layer
            id='cluster-count'
            type='symbol'
            filter={["has", "point_count"]}
            layout={{
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
              "text-size": 14,
            }}
            paint={{
              "text-color": "#fff",
            }}
          />
          <Layer
            id='unclustered-point'
            type='circle'
            filter={["!", ["has", "point_count"]]}
            paint={{
              "circle-color": "#cc4d2b",
              "circle-radius": 8,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            }}
          />
          <Layer
            id='selected-point'
            type='circle'
            filter={
              selectedFormation
                ? ["all", ["!", ["has", "point_count"]], ["==", ["get", "formationId"], selectedFormation.documentId]]
                : ["==", "formationId", ""]
            }
            paint={{
              "circle-color": "#f5d7ce",
              "circle-radius": 12,
              "circle-stroke-width": 3,
              "circle-stroke-color": "#cc4d2b",
            }}
          />
        </Source>
      </MapLibre>
    </div>
  )
}

export default FormationsMap
