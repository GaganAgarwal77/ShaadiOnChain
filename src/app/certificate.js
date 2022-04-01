import React, { useRef, useEffect, useState } from 'react';
import Canvas from 'react-responsive-canvas';
import '../assets/styles/_fonts.scss'
var canvasRef;

const getLines = (text, limit=20) => {
	var words = text.split(' ');
	var lines=[];
	var line = "";
	for(var w=0;w<words.length;w++){
		if(limit <= words[w].length){
			lines.push(line);
			limit = 20;
			line = "";
		}
		line += `${words[w]} `;
		limit -= words[w].length;
	}
	lines.push(line);
	return lines;
}

const Certificate = (props) => {
    canvasRef = useRef(null);
    let canvas, ctx, certificate;
    const drawCertificate = () => {
        ctx.drawImage(certificate, 0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.font = '27px Alex Brush, cursive'
        ctx.fillStyle = '#000'
        ctx.fillText(`${props.groom_name} & ${props.bride_name}`, 200, 230);
        
        ctx.font = 'italic 20px Poppins, serif'
        
        var groomText = props.groom_vows;
        var groomLines = getLines(groomText, 20);
        for(var i=0;i<groomLines.length;i++)
            ctx.fillText(groomLines[i], 80, 320+(i*20));
        
        if(props.is_proposal == 'false'){
            var brideText = props.bride_vows;
            var brideLines = getLines(brideText, 20);
            for(var i=0;i<brideLines.length;i++)
                ctx.fillText(brideLines[i], 400, 320+(i*20));
        }
    };
    
    useEffect(() => {
        canvas = canvasRef.current;
        ctx = canvas.getContext('2d');
        certificate = new Image();

        certificate.src = '/assets/images/certificate.jpeg';
        certificate.onload = () => {
            drawCertificate();
        };
    }, [props.groom_vows, props.bride_vows]);

    return <canvas ref={canvasRef} {...props}/>;
};

const download = () => {
    var link = document.createElement('a');
    link.download = 'ShaadiOnChain-Certificate.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
};

const certificateImage = () => {
    return canvasRef.current.toDataURL();
}

export {
    Certificate,
    download, 
    certificateImage
}