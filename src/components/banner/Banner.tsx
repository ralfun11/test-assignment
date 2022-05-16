import React, {useState} from 'react'
import "../../App.css"

export type Position = {
    top: number,
    left: number,
    right: number,
    bottom: number
}
export type BannerProps = {
    position: Position,
    id: number,
    remove: (id: number) => void
}

export const Banner = ({position, id, remove}:BannerProps) => {

    const [value, setValue] = useState<string>("")

    return (
        <div
            className="banner-container"
            style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                bottom: `${position.bottom}%`,
                right: `${position.right}%`,
            }}
            onDoubleClick={() => remove(id)}
        >
        <input
            type="text"
            className="input-field"
            onChange={(e) => setValue(e.currentTarget.value)}
            value={value}
            onClick={() => setValue("")} />
        </div>
    )
}