import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { Card, CardProps } from 'react-bootstrap'

export default function NkCard({
  isLink,
  to,
  style,
  cardProps,
  children
}: {
  isLink?: boolean
  to?: string
  style?: any
  cardProps?: CardProps
  children: any
}) {
  const extraProps: any = {}
  if (isLink) {
    extraProps.as = Link
    extraProps.style = {
      color: 'initial',
      textDecoration: 'initial',
      display: 'inline-block',
      ...style
    }
    extraProps.onClick = (event: React.SyntheticEvent<any, Event>) => {
      event.stopPropagation()
    }
    extraProps.to = '/'
    if (to) {
      extraProps.to = to
    }
  }

  return (
    <div>
      <Card {...extraProps} {...cardProps}>
        {children}
      </Card>
    </div>
  )
}
