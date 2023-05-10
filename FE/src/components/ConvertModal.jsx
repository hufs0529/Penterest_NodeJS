import { useState } from 'react'
import * as React from 'react';
import { Box, Button, Card, CardMedia, Container, Modal, Typography } from '@mui/material';

export default function ConvertModal(props) {


    // 모달창 모듈
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '99%',
        maxWidth: '500px',
        height: '70vh',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,

    };

    const CardStyle = {
        // cover를 넣으니까 중앙정렬이 됨: 이유는 모르겠다
        display: 'cover',
        width: '100%',
        height: '60vh',
        bgcolor: '#ddd',
        border: '2px dashed #000',
        mt: 2
    };

    const MediaStyle = {
        margin: 'auto'
    };



    return (
        <>
            <Button
                onClick={() => { handleOpen(); props.PhandClose(); }}
                style={{
                    flex: '0 0 auto'
                }}
            >
                미리보기
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                Text in a modal
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                            </Typography> */}

                    <Card sx={[CardStyle, { mr: 0 }]}>
                        <CardMedia
                            sx={MediaStyle}
                            component='video'
                            autoPlay
                            muted
                            loop
                            src={props.file.url}

                        >
                            {/* <video muted autoPlay loop id="video"></video> */}
                            {/* {file.video && <video muted autoPlay loop src={file.url} />} */}
                        </CardMedia>
                    </Card>

                    <Box>
                        <Button onClick={handleClose}>
                            닫기
                        </Button>
                    </Box>

                </Box>
            </Modal>
        </>
    )
}