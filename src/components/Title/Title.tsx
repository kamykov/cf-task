import React from 'react'

type Props = {
    children: string
}

export default function Title({ children }: Props) {
    return <h2>{children}</h2>
}