import React from 'react'
import GoogleMapReact from 'google-map-react';

import { Post, Tag } from '../../rest/data/posts';

import * as CommonUtils from '../../utils/common.utils';
import { REST } from 'nk-rest-js-library';
import { Bar } from 'react-chartjs-2';

import * as NkReactLibrary from 'nk-react-library';

enum TimeSeriesTypes {
    Date = 'D', Month = 'M', Year = 'Y'
}

class TimeSeries {

    static monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    timestamps: Date[];

    labelCount: { [key: string]: { labels: string[], values: number[] } };

    constructor(timestamps: Date[]) {
        this.timestamps = timestamps;
        this.labelCount = {};
    }

    static dateLabel(date: Date) {
        return `${date.getDate()} ${TimeSeries.monthLabel(date)}`
    }

    static monthLabel(date: Date) {
        return `${TimeSeries.monthLabels[date.getMonth()]} ${TimeSeries.yearLabel(date)}`
    }

    static yearLabel(date: Date) {
        return `${date.getFullYear()}`
    }

    groupBy(type: TimeSeriesTypes) {

        console.log(this.labelCount);

        if (this.labelCount[type])
            return this.labelCount[type];

        this.labelCount = {};

        this.labelCount[type] = {
            labels: [],
            values: []
        };

        const labelMaker = (type === TimeSeriesTypes.Date ?
            TimeSeries.dateLabel :
            (
                type === TimeSeriesTypes.Month ?
                    TimeSeries.monthLabel :
                    TimeSeries.yearLabel
            )
        );

        const labelCount = {};

        this.timestamps.forEach((t) => {
            const label = labelMaker(t);
            if (!labelCount[label])
                labelCount[label] = 1
            else
                labelCount[label] += 1
        })

        const labels = Object.keys(labelCount);
        const values = labels.map(l => labelCount[l]);

        this.labelCount[type] = { labels, values };

        return this.labelCount[type];
    }

}

export default function ReadTag({ tagId }: { tagId: string }) {

    const [tag] = React.useState(new Tag());
    const [analyticsTab, setAnalyticsTab] = React.useState({ value: 'heatmap', label: 'Heat Map' });
    const [timeSeriesTab, setTimeSeriesTab] = React.useState<{ value: TimeSeriesTypes, label: string }>({ value: TimeSeriesTypes.Date, label: 'Date' });
    const [searchRestObject] = React.useState(new REST.SearchRESTObject(new Post()));
    const [heatMapData, setHeatMapData] = React.useState<GoogleMapReact.Position[]>([]);
    const [timeSeries, setTimeSeries] = React.useState(new TimeSeries([]));
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        tag.data._id = tagId;
        tag.read().then(() => {
            searchRestObject.request.query = {
                "content.tags": tag.data.tag
            };
            searchRestObject.request.sort = {
                "createdAt": 1
            };
            searchRestObject.request.attributes = ["createdAt", "location"];
            searchRestObject.request.pageSize = -5497;
            searchRestObject.search().then(() => {

                setHeatMapData(searchRestObject.response.result.map((post) => {
                    return { lat: post.data.location.latitude, lng: post.data.location.longitude };
                }));

                setTimeSeries(new TimeSeries(searchRestObject.response.result.map(p => new Date(p.data.createdAt))));

                setLoaded(true);

            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    if (!loaded)
        return <></>

    return (
        <div>
            <h3>{tag.data.tag}</h3>
            <br />
            <NkReactLibrary.Components.NkFormElements.NkButtonGroup
                id='analyticsType'
                type='' defaultValue={analyticsTab}
                valueList={[
                    { value: 'heatmap', label: 'Heat Map' },
                    { value: 'timeseries', label: 'Time Series' }
                ]}
                valueChanged={(id, { label, value }) => {
                    console.log({ id, value, label });
                    if (value)
                        setAnalyticsTab({ value, label });

                }} />
            <hr />
            {
                analyticsTab.value === 'heatmap' ?
                    <div style={{ width: "100%", height: 500 }}>
                        <GoogleMapReact
                            yesIWantToUseGoogleMapApiInternals={true}
                            bootstrapURLKeys={{ key: 'AIzaSyDl4dmvk0tBIX0-BWCaOZy0MjAcTtLHo60' }}
                            defaultCenter={{
                                lat: CommonUtils.getLocation().latitude,
                                lng: CommonUtils.getLocation().longitude
                            }}
                            defaultZoom={0}
                            heatmapLibrary={true}
                            options={{
                                mapTypeId: 'satellite'
                            }}
                            heatmap={{
                                positions: heatMapData,
                                options: {}
                            }}
                        >

                        </GoogleMapReact>
                    </div> :
                    <div>
                        <NkReactLibrary.Components.NkFormElements.NkButtonGroup
                            id='timeSeriesType'
                            type='' defaultValue={timeSeriesTab}
                            valueList={[
                                { value: TimeSeriesTypes.Date, label: 'Date' },
                                { value: TimeSeriesTypes.Month, label: 'Month' },
                                { value: TimeSeriesTypes.Year, label: 'Year' }
                            ]}
                            valueChanged={(id, { label, value }) => {
                                console.log({ id, value, label });
                                if (value)
                                    setTimeSeriesTab({ value, label });

                            }} />
                        <br />
                        <Bar
                            data={{
                                labels: timeSeries.groupBy(timeSeriesTab.value).labels,
                                datasets: [
                                    {
                                        label: 'Time Series',
                                        backgroundColor: 'rgba(255,99,132,0.2)',
                                        borderColor: 'rgba(255,99,132,1)',
                                        borderWidth: 1,
                                        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                        hoverBorderColor: 'rgba(255,99,132,1)',
                                        data: timeSeries.groupBy(timeSeriesTab.value).values
                                    }
                                ]
                            }}
                        />
                    </div>
            }

        </div>
    )
}