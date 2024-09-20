import React from 'react'

type IProps = {
    title: string;
    className?: string;
}

const CardTitle: React.FC<IProps> = ({ title, className }) => {
    return (
        <>
            <h4 className={`text-sm font-bold ${className}`}>{title}</h4>
        </>
    )
}

export default CardTitle