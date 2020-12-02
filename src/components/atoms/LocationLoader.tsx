import React from 'react'

import { GeolocatedProps, geolocated } from "react-geolocated";
 
interface IDemoProps {
    label: string;
}
 
class LocationLoader extends React.Component<IDemoProps & GeolocatedProps> {
    render(): JSX.Element {
        return <></>;
    }
}
 
export default geolocated()(LocationLoader);