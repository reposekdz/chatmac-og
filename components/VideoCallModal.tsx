import React, { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { User } from '../types';
import { XIcon, MicrophoneIcon, VideoCameraIcon, PhoneIcon } from './icons';
import { loggedInUser } from '../App';

interface VideoCallModalProps {
    onClose: () => void;
    user: User;
    socket: Socket;
    isReceiving?: boolean;
    offer?: any;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({ onClose, user, socket, isReceiving, offer }) => {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    useEffect(() => {
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });
        peerConnectionRef.current = pc;

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice-candidate', { recipientId: user.id, candidate: event.candidate });
            }
        };

        pc.ontrack = (event) => {
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
                stream.getTracks().forEach(track => {
                    pc.addTrack(track, stream);
                });

                if (isReceiving && offer) {
                    pc.setRemoteDescription(new RTCSessionDescription(offer))
                        .then(() => pc.createAnswer())
                        .then(answer => pc.setLocalDescription(answer))
                        .then(() => {
                            socket.emit('video-answer', { recipientId: user.id, answer: pc.localDescription });
                        });
                } else {
                    pc.createOffer()
                        .then(offer => pc.setLocalDescription(offer))
                        .then(() => {
                            socket.emit('video-offer', { recipientId: user.id, senderId: loggedInUser.id, offer: pc.localDescription });
                        });
                }
            });
            
        socket.on('video-answer', ({ answer }) => {
            pc.setRemoteDescription(new RTCSessionDescription(answer));
        });

        socket.on('ice-candidate', ({ candidate }) => {
            pc.addIceCandidate(new RTCIceCandidate(candidate));
        });
        
        socket.on('call-ended', handleClose);


        return () => {
           handleClose();
        };
    }, [isReceiving, offer, socket, user.id]);

    const handleClose = () => {
        socket.emit('end-call', { recipientId: user.id });
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
        }
        if (localVideoRef.current && localVideoRef.current.srcObject) {
            (localVideoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
        }
        socket.off('video-answer');
        socket.off('ice-candidate');
        socket.off('call-ended');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center animate-modal-fade-in">
            <div className="bg-gray-900 text-white rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] m-4 flex flex-col overflow-hidden animate-modal-content-in" onClick={e => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center">
                    <p className="font-semibold">Video Call with {user.name}</p>
                    <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-800"><XIcon className="w-5 h-5"/></button>
                </div>

                <div className="flex-grow bg-black rounded-lg relative m-2">
                    {/* Remote Video */}
                    <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover rounded-lg"></video>
                    <p className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 text-sm rounded">{user.name}</p>
                    
                    {/* Local Video */}
                    <div className="bg-black rounded-lg absolute bottom-4 right-4 w-1/4 h-1/4 border-2 border-white/50 overflow-hidden">
                         <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-full object-cover"/>
                         <p className="absolute bottom-1 left-1 bg-black/50 px-1 text-xs rounded">You</p>
                    </div>
                </div>

                <div className="bg-gray-800/50 p-4 flex justify-center items-center space-x-6">
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><MicrophoneIcon className="w-6 h-6"/></button>
                    <button className="p-3 bg-gray-700 rounded-full hover:bg-gray-600"><VideoCameraIcon className="w-6 h-6"/></button>
                    <button onClick={handleClose} className="p-4 bg-red-600 rounded-full hover:bg-red-700"><PhoneIcon className="w-7 h-7"/></button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;
