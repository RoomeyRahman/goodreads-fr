"use client"

export default function ReduxLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            {children}
        </>
    );
};
