import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";

const QRGenerator = (props) => {
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState(`http://localhost:3000/profile/${user.data.username}`);
    const [qrSize, setQRSize] = useState(64);
    const qrContainerRef = useRef(null);

    useEffect(() => {
    if (qrContainerRef.current) {
        const containerWidth = qrContainerRef.current.offsetWidth;
        const containerHeight = qrContainerRef.current.offsetHeight;
        const minDimension = Math.min(containerWidth, containerHeight);
        setQRSize(minDimension);
    }
    console.log(qrContainerRef.current)
    }, []);
    console.log(qrSize)
    return (
    <div ref={qrContainerRef} className={props.className}>
        <QRCode value={data} size={qrSize} />
    </div>
    );
};

export default QRGenerator;
