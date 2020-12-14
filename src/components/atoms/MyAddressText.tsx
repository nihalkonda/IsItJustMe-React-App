import React, { Component } from 'react'
import { ILocation } from '../../rest/data/posts/schemas'

export default function MyAddressText({ location }: { location: ILocation }) {
    let city = 'Unknown';
    let state = 'Unknown';
    let country = 'Unknown';

    try {
        city = location.raw.city || 'Unknown';
    } catch (error) {

    }

    try {
        state = location.raw.region || location.raw.administrativeLevels.level1short || 'Unknown';
    } catch (error) {

    }

    try {
        country = location.raw.country || 'Unknown';
    } catch (error) {

    }

    const address = [city, state, country].filter(v => v !== 'Unknown').join(', ');

    return (
        <span>{address}</span>
    )
}