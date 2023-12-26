import { createStore } from "tinybase/with-schemas"; // NB the 'with-schemas'
import { createTools } from "tinybase/tools"; // NB the 'with-schemas'
import fs from "node:fs";

const store = createStore()
  .setTablesSchema({
    todos: {
      id: { type: "string", primary: true },
      text: { type: "string" },
      done: { type: "boolean" },
    },
    // layers: {
    //   id: { type: "string", primary: true },
    //   name: { type: "string" },
    //   source: { type: "string" },
    //   style: { type: "string" },
    //   visible: { type: "boolean" },
    //   featureType: { type: "string" }, // poi | object | region:pincode | region:city | grid
    //   geometryType: { type: "string" }, // point | linestring | polygon | none
    //   layerType: { type: "string" }, // geojson | heatmap | geohash
    //   order: { type: "number" },
    //   layerGroupId: { type: "string" },
    // },
    // layerGroups: {
    //   id: { type: "string", primary: true },
    //   name: { type: "string" },
    //   icon: { type: "string" },
    //   order: { type: "number" },
    //   defaultOpen: { type: "boolean" },
    // },
    // layerAttributes: {
    //   name: { type: "string" },
    //   layerId: { type: "string" },
    //   type: { type: "string", default: "string" },
    // },
    // viewState: {
    //   latitude: { type: "number" },
    //   longitude: { type: "number" },
    //   zoom: { type: "number" },
    //   pitch: { type: "number" },
    //   bearing: { type: "number" },
    // },
    // selectedObject: {
    //   layerId: { type: "string" },
    //   itemIndex: { type: "number" },
    //   selected: { type: "string" },
    //   itemType: { type: "string" },
    // },
    // polygonContains: {
    //   layerId: { type: "string" },
    //   itemIndex: { type: "number" },
    //   selected: { type: "string" },
    //   itemType: { type: "string" },
    // },
    // selectedRegion: {
    //   regionId: { type: "string" },
    //   name: { type: "string" },
    // },
    // filter: {
    //   layerId: { type: "string" },
    //   name: { type: "string" },
    //   type: { type: "string", default: "string" },
    //   filterValue: { type: "string" },
    // },
    // aggregations: {
    //   selectedLayerId: { type: "string" },
    //   aggregationLayerId: { type: "string" },
    //   aggregationType: { type: "string" },
    //   categorisedCountAttribute: { type: "string" },
    //   aggregationCategory: { type: "string" },
    //   joinProperty: { type: "string" },
    //   aggregationProperty: { type: "string" },
    //   formula: { type: "string" },
    // },
    // layerAggregation: {
    //   selectedLayerId: { type: "string" },
    //   aggregationType: { type: "string" },
    //   categorisedCountAttribute: { type: "string" },
    //   aggregationCategory: { type: "string" },
    //   aggregationProperty: { type: "string" },
    // },
    // weightage: {
    //   weightageName: { type: "string" },
    //   checkedAttribute: { type: "string" },
    //   selectedLayerId: { type: "string" },
    // },
    // distanceCalculator: {
    //   pointA: { type: "string" },
    //   pointB: { type: "string" },
    //   distance: { type: "string" },
    // },
    // findRegion: {
    //   selectedObjectlayerId: { type: "string" },
    //   selectedLayerId: { type: "string" },
    //   identifierProperty: { type: "string" },
    // },
  })
  .setValuesSchema({
    mode: { type: "string", default: "idle" },
    // projectId: { type: "string" },
    // selectedLayerId: { type: "string" },
    // drawMode: { type: "string" },
    // drawData: { type: "string" },
    // clickedInfo: { type: "string" },
    // baseMapStyle: { type: "string", default: "dark-street" },
    // baseMapProvider: { type: "string", default: "mapbox" },
    // colorMode: { type: "string", default: "dark" },
    // showUI: { type: "boolean", default: true },
    // hideInspectorPanel: { type: "boolean" },
    // selectedDistrict: { type: "string" }, // TODO:REMOVE
    // setSelectedPolyline: { type: "string" },
    // datetime: { type: "string" },
    // datetimeFrom: { type: "string" },
    // datetimeTo: { type: "string" },
    // showTable: { type: "string", default: null },
    // rightClickFilter: { type: "string", default: false },
    // streetView: { type: "string", default: null },
    // editorState: { type: "string", default: "selecting" },
    // drawPointMode: { type: "boolean", default: false },
    // tollActionDestination: { type: "string", default: null },
  });

const tools = createTools(store);
const [prettyDTs, prettyTs, prettyUiReactDTs, prettyUiReactTsx] =
  await tools.getPrettyStoreApi("brain");

fs.writeFileSync("@/brain/brain.d.ts", prettyDTs, "utf-8");
fs.writeFileSync("@/brain/brain.ts", prettyTs, "utf-8");
fs.writeFileSync("@/brain/brain-ui-react.d.ts", prettyUiReactDTs, "utf-8");
fs.writeFileSync("@/brain/ui-react.tsx", prettyUiReactTsx, "utf-8");
console.log("generated brain files");
